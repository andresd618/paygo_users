<?php

namespace App\Services\Users;

use App\Repositories\Users\UsersInterface;
use \Symfony\Component\HttpFoundation\File\UploadedFile;
use \Illuminate\Support\Facades\Log;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UsersService
 *
 * @author andreshernandez
 */
class UsersService {
    
    //put your code here
    
    protected $usersRepo;
    
    
    
    public function __construct(UsersInterface $usersRepo) {
        $this->usersRepo = $usersRepo;
    }
    
    
    
    
    
    
    /**
     * Se crean los usuarios que contiene el archivo CSV que llega como parametro
     * 
     * @param \App\Services\Users\UploadedFile $file : Archivo CSV que contiene los usuarios a crear
     */
    public function usersFromCSV(UploadedFile $file){
                
        $response = (object)['status' => false,'msg' => 'Error al procesar el archivo CSV'];
        
        $usersProcessed = false; 
        $codeHTTP = 500;
        $success = true;
                
        $responseObj = (object) ['status' => false,'msg' => 'Error al procesar el archivo CSV']; 
                     
        if(!is_null($file) && $file->isValid()){                        
            
            try{
                ///Se abre el archivo CSV en modo lectura
                if (($handle = fopen ( $file->getRealPath(), 'r' )) !== FALSE) {

                    ///Se recorre cada fila del archivo para obtener la informacion de cada usuario
                    while ( ($data = fgetcsv ( $handle, 1000, ',' )) !== FALSE ) {
                        
                        if(!empty($data)){

                            $usersProcessed = true;  
                            
                            $infoUser=[
                                'id' => $data[0],
                                'name' => $data[1],
                                'lastname' => $data[2],
                            ];

                            ///Se crea cada usuario
                            $created = $this->userRepo->store($infoUser);      

                            if(!$created){
                                $success = false;
                                break;
                            }
                        }
                    }  

                    fclose ($handle);                    
                }
            }catch(\Exception $ex){ 
                $success = false;
                Log::critical("Error al crear los usuarios desde el archivo CSV {$e->getCode()}; {$e->getLine()},{$e->getMessage()}" );
            }            
        }       
          
        //Si se procesaron todos los usuarios, se retorna true                
        if($usersProcessed && $success ){
            
            $response->status = true;
            $response->msg = 'Se procesaron correctamente todos los usuarios del archivo CSV.';                        
            $codeHTTP = 200;
        }
        
        return response()->json($response,$codeHTTP);
    }
    
    
    /**
     * Elimina todos los registros de la tabla usuarios
     * 
     * @return boolean : True si se eliminan todos los usuarios, de lo contrario false
     */
    public function truncate(){
        
        $statusHTTP = 200;
        $responseObj = (object) ['status' => false,'msg' => 'Se eliminaron correctamente todos los usuarios.'];        
        
        $truncated = $this->usersService->truncate();
        
        if(!$truncated){
            $statusHTTP = 500;
            $responseObj = (object) ['status' => false,'msg' => 'No se eliminaron los usuarios.'];
        }
        
        return response()->json($responseObj,$statusHTTP);
    }
    
}

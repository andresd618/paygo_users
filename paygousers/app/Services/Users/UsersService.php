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
     * Obtiene el listado de usuarios paginados y ordenados 
     *      
     * @param type $num : Indica la cantidad de usarios a retornar
     * @param type $typeOrd : Indica el tipo de ordenamiento A: Ascendente, D: Descendente
     * @param type $col : Indica la columna por la cual se realiza el ordenamiento
     * @param type $page : Pagina de resultados que se va a obtener
     * @return type
     */
    public function listUsers( $num, $typeOrd, $col, $page){
        
        $codeHttp = 500;
        $response = (object)['status' => false, 'result' => null,'msg' => 'Error al obtener el listado de usuarios'];
        $users = null;
        
        if(!empty($num) && !empty($typeOrd) && !empty($col) && !empty($page)){
        
            $users =  $this->usersRepo->findUsersPag($num, $typeOrd, $col, $page);
            
            if(!empty($users)){
                $codeHttp = 200;
                $response->status = true;
                $response->result = $users;
                $response->msg = "Se obtuvieron los usuarios correctamente";
            }
        }
        
        return response()->json($response, $codeHttp);
    }
    
    
    
    /**
     * Crea un usuario nuevo a partir de la informacion del array de entrada
     * 
     * @param array $data : Contiene id, nombre y apellido del usuario a crear
     */
    private function storeUser(array $data){
        
        $created = false;
            
        if(!empty($data)){

            try{
                $usersProcessed = true;  

                $infoUser=(object)[
                    'id' => $data[0],
                    'name' => $data[1],
                    'lastname' => $data[2],
                ];

                ///Se crea el usuario
                $created = $this->usersRepo->store($infoUser);                 
                
            }catch(Exception $ex){
                Log::critical("Error al crear el usuario {$infoUser->id}; Linea: {$ex->getLine()},{$ex->getMessage()}" );
            }
        }
        
        return $created;
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
                     
        if(!is_null($file) && $file->isValid()){                        
            
            try{
                ///Se abre el archivo CSV en modo lectura
                if (($handle = fopen ( $file->getRealPath(), 'r' )) !== FALSE) {

                    fgetcsv ( $handle, 1000, ',' );
                    
                    $inserts = [];
                    
                    ///Se recorre cada fila del archivo para obtener la informacion de cada usuario
                    while ( ($data = fgetcsv ( $handle, 1000, ',' )) !== FALSE ) {
                        
                        if(!empty($data)){

                            $usersProcessed = true;  
                                                       
                            ///Se crea cada usuario
                            $created = $this->storeUser($data);      

                            if(!$created){
                                $success = false;
                                $response->msg = "No se crearon todos los usuarios, algunos datos del archivo estan vacios y/o duplicados, verifique.";
                                continue;
                            }
                        }
                    }  
                    
                    fclose ($handle);                    
                }
            }catch(\Exception $ex){ 
                $success = false;
                Log::critical("Error al crear los usuarios desde el archivo CSV {$ex->getCode()}; Linea: {$ex->getLine()},{$ex->getMessage()}" );
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
     * Se obtiene la informacion de un usuario por su id
     * 
     * @param type $id : id del usuario a consultar
     * @return type
     */
    public function show($id){
                        
        $codeHTTP = 500;
        $response = (object)['status' => false,'result' => null,  'msg' => 'El usuario no existe u ocurrió un error al obtenerlo.'];
        
        if($id > 0){
            
            $user = $this->usersRepo->getById($id);
            
            $codeHTTP = 200;
            $response->status = true;
            
            ///Si se obtiene el usuario
            if(!is_null($user)){
                                
                $response->result = $user;
                $response->msg = null;
            }
        }
        
        return response()->json($response,$codeHTTP);
    }
    
    
    
    /**
     * Permite eliminar un listado de usuarios de la bd
     * 
     * @param type $userIds : Lista de ids de usuarios que se eliminaran
     * @return type
     */
    public function destroy($userIds){                
           
        $codeHTTP = 500;
        $response = (object)["status" => false, "msg" => "El listado de usuarios a eliminar no es valido."];
        
        if(is_array($userIds) || is_int($userIds) ){

            //Si es array se verifica que contenga solo numeros
            $arrValidate = is_array($userIds) ? array_filter($userIds, 'is_int') : true; 

            if($arrValidate){
                $result = $this->usersRepo->destroy($userIds);
                
                if($result){
                    $codeHTTP = 200;
                    $response->status = true;
                    $response->msg = "Se eliminaron los usuarios correctamente.";
                }else{
                    $response->msg = "No se eliminaron los usuarios por favor verifiquen si existen.";
                }
            }                
        }  
        
        return response()->json($response, $codeHTTP);
    }
    
    
    /**
     * Se actualiza los datos de un usuario
     * 
     * @param type $data : Objeto que contiene la informacion que se va a asignar al usuario
     * @return type
     */
    public function update($data){
                
        $codeHTTP = 200;
        $response = (object)["status" => true, "msg" => "Se guardaron correctamente los cambios realizados."];                            
            
        $update = $this->usersRepo->update($data);

        if(!$update){
            $codeHTTP = 500;
            $response->msg = "Error al guardar los cambios realizados del usuario {$data->id}. Verifique si existe.";
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
        
        $truncated = $this->usersRepo->truncate();
        
        if(!$truncated){
            $statusHTTP = 500;
            $responseObj = (object) ['status' => false,'msg' => 'No se eliminaron los usuarios.'];
        }
        
        return response()->json($responseObj,$statusHTTP);
    }
    
}

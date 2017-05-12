<?php

namespace App\Http\Controllers;

use Input;
use Validator;
use Illuminate\Http\Request;
use App\Services\Users\UsersService;

class UsersController extends Controller
{
    
    protected $usersService;
    
    
    public function __construct(UsersService $usersService) {
        $this->usersService = $usersService;
    }
    
    
     
   /**
    * Retorna un listado de usuarios paginados y ordenados segun los parametros
    * 
    * @param type $num : Indica la cantidad de usarios a retornar
    * @param type $typeOrd : Indica el tipo de ordenamiento A: Ascendente, D: Descendente
    * @param type $col : Indica la columna por la cual se realiza el ordenamiento
    * @param type $page : Pagina de resultados que se va a obtener
    * @return type
    */
    public function index( $num, $typeOrd, $col, $page)
    {
        return $this->usersService->listUsers( $num, $typeOrd, $col, $page);
    }

   

    /**
     * Almacena los usuarios que contiene el archivo CSV que llega como parametro
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {     
        $response = null;               
        
        //Se valida el archivo
        $validator = Validator::make($request->all(),[
            'file' => 'required|file|mimes:csv,txt',
        ]);                
        
        //Si el archivo es valido se cargan los usuarios
        if(!$validator->fails() && $request->hasFile('file') && $request->file('file')->isValid()){
                        
            $response = $this->usersService->usersFromCSV($request->file('file'));         
        }else{
            $response = response()->json(['status' => false,'msg' => 'El archivo CSV no es valido'],500);
            Log::critical("El archivo CSV no es valido " );            
        }
        
        return $response;
    }

    
    /**
     * Permite obtener la informacion de un usuario por su id
     * 
     * @param type $id : Id del usuario a consultar
     * @return type
     */
    public function show($id){                        
        
        return $this->usersService->show($id);
    }
    


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        
    }

    /**
     * Permite eliminar un listado de usuarios de la bd
     * 
     * @param type $userIds : Lista de ids de usuarios que se eliminaran
     * @return type
     */
    public function destroy(Request $request)
    {                
        $response = null;
        
        //Se valida el parametro que sea json o numero
        $validator = Validator::make($request->all(),[
            'ids' => 'required|json',
        ]);  
        
        if(!$validator->fails() ){            
            
            $userIds = json_decode($request->input("ids"));
            $response = $this->usersService->destroy($userIds);
                                     
        }else{
            $response = response()->json(["status" => false, "msg" => "El listado de usuarios a eliminar no es valido."],500);
        }
        
        return $response;
    }
    
    
    public function truncate(){                
        
        return $this->usersService->truncate();
    }
}

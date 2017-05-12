<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Repositories\Users;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use \Illuminate\Support\Facades\Log;
use \Illuminate\Database\QueryException;
use \Illuminate\Pagination\Paginator;
use \Illuminate\Support\Facades\DB;

/**
 * Description of UsersImplement
 *
 * @author andreshernandez
 */
class UsersRepo implements UsersInterface{
    //put your code here
    
    
    protected $userModel;
    
    public function __construct(Model $userModel){
        $this->userModel = $userModel;       
    }
    
    
    /**
     * Obtiene un listado de usuarios segun la paginacion y el ordenamiento de entrada
     *           
     * @param type $num : Indica la cantidad de usarios a retornar
     * @param type $typeOrd : Indica el tipo de ordenamiento A: Ascendente, D: Descendente
     * @param type $col : Indica la columna por la cual se realiza el ordenamiento
     * @param type $page : Pagina de resultados que se va a obtener
     * @return type
     */
    public function findUsersPag( $num, $typeOrd, $col, $page){
        
        $users = null;
        
        if(!empty($num ) && !empty($typeOrd) && !empty($col)  && !empty($page)){
            
            try{                                
                Paginator::currentPageResolver(function() use ($page) {return $page;});
                $users = $this->userModel->orderBy($col,$typeOrd)->paginate($num);        
            }catch(Exception $ex){
                $users = null;
                Log::critical("Error al obtener el listado de usuarios tipoOrden:{$typeOrd} num:{$num} col:{$col}; {$ex->getCode()}; Linea: {$ex->getLine()},{$ex->getMessage()}" );
            }
        }
        
        return $users;
    }
    
    
    /**
     * Valida los datos requeridos del usuario  
     * 
     * @param array $data : Objeto con los datos id, name, lastname del usuario
     * @return boolean : True si son validos, false de lo contrario
     */
    public function validateDataUser($data){
        
        $validate = false;
        
        if(!empty($data) && !empty(trim($data->name)) && !empty(trim($data->lastname))){
            $validate = true;            
        }
        
        return $validate;
    }
    
    /**
     * Crea un usuario en la base de datos
     * 
     * @param array $data : Datos del usuario a crear
     * @return boolean : True si se crea el usuario, false de lo contrario
     */
    public function store($data){
                
        if($this->validateDataUser($data)){
            try{
                $user = $this->userModel->find($data->id);

                if(is_null($user)){

                    $newUser = new User();

                    $newUser->id = $data->id;
                    $newUser->name = $data->name;
                    $newUser->lastname = $data->lastname;

                    return $newUser->save();
                } 
            }catch(QueryException $qex){                
                Log::critical("Error al crear el usuario {$data['name']} {$data['lastname']}; {$qex->getCode()}; Linea: {$qex->getLine()},{$qex->getMessage()}" );
            }catch(\Exception $ex){
                Log::critical("Error al crear el usuario {$data['name']} {$data['lastname']}; {$ex->getCode()}; Linea: {$ex->getLine()},{$ex->getMessage()}" );
            }
        }
                
        return false;
    }
    
    
   /**
     * Realiza un insert multiple a la tabla usuarios
     * 
     * @param array $data : Array con cada uno de los valores del insert
     * @return boolean : True si se crea los usuarios, false de lo contrario
     */
    public function storeBulk(array $data){
        
        $inserted = false;
        
        if(!empty($data)){
            
            try{
            
                $this->userModel->insert($data); 
                $inserted = true;
                
            }catch(QueryException $qex){
                $inserted = false;
                Log::critical("Error al realizar los inserts de los usuarios  {$qex->getCode()}; Linea: {$qex->getLine()},{$qex->getMessage()}" );
            }catch(\Exception $ex){
                $inserted = false;
                Log::critical("Error al realizar los inserts de los usuarios  {$ex->getCode()}; Linea: {$ex->getLine()},{$ex->getMessage()}" );
            }
        }
        
        return $inserted;
    }
    
    
    /**
     * Retorna un usuario por su id
     * 
     * @param type $id : Id del usuario a retornar
     * @return type
     */
    public function getById($id){
        
        $user = null;
        
        try{
            if($id > 0){
                $user = $this->userModel->find($id);
            }
        } catch (Exception $ex) {     
            $user = null;
            Log::critical("Error al obtener el usuario con id {$id};  {$ex->getCode()}; Linea: {$ex->getLine()},{$ex->getMessage()}" );
        }
        
        return  $user;
    }
    
    
    
    /**
     * Permite eliminar un listado de usuarios de la bd
     * 
     * @param type $userIds : Lista de ids de usuarios que se eliminaran
     * @return type
     */
    public function destroy($userIds){
        
        $deleted = false;
        
        if(!empty($userIds)){
            try{                

                $deleted = $this->userModel->destroy($userIds);
                
            }catch(Exception $ex){
                Log::critical("Error al eliminar el listado de usuarios {$userIds};  {$ex->getCode()}; Linea: {$ex->getLine()},{$ex->getMessage()}" );
            }
        }
        
        return $deleted; 
    }
    
    
    
    public function update(array $data){
        
        $user = $this->userModel->findOrFail($id);   
        
        if(!is_null($user)){
            
            $user->name = $data['name'];
            $user->lastname = $data['lastname'];
            
            return $user->save();
        }
        
        return false;
    }
    
    
    /**
     * Elimina todos los registros de la tabla usuarios
     * 
     * @return boolean : True si se eliminan todos los usuarios, de lo contrario false
     */
    public function truncate(){
        
        $truncated = false;
        
        try{
            DB::table('users')->truncate();
            $truncated = true;
            
        }catch(\Exception $ex){
            Log::critical("Error al eliminar los registros de la tabla usuarios; {$ex->getCode()}; Linea: {$ex->getLine()},{$ex->getMessage()}" );
        }
        
        return $truncated;
    }
}

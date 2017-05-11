<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Repositories\Users;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

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
    
    public function findUsersPag($col, $type, $num){
        $users = User::orderBy($col,$type)->paginate($num);
    }
    
    
    /**
     * Valida los datos requeridos del usuario  
     * 
     * @param array $data : Array con los datos id, name, lastname del usuario
     * @return boolean : True si son validos, false de lo contrario
     */
    private function validateDataUser(array $data){
        
        $validate = false;
        
        if(!empty($data) && !empty($data['id']) && !empty($data['name']) && !empty($data['lastname'])){
            if(!empty(trim($data['name'])) && !empty(trim($data['lastname']))){
                $validate = true;
            }
        }
        
        return $validate;
    }
    
    /**
     * Crea un usuario en la base de datos
     * 
     * @param array $data : Datos del usuario a crear
     * @return boolean : True si se crea el usuario, false de lo contrario
     */
    public function store(array $data){
        
        if($this->validateDataUser($data)){
            
            $user = $this->userModel->find($data['id']);
            
            if($user != null){
                $newUser = new User();

                $newUser->id = $data['id'];
                $newUser->name = $data['name'];
                $newUser->lastname = $data['lastname'];
                
                return $newUser->save();
            }                        
        }
        
        return false;
    }
    
    
   
    
    
    
    public function getById($id){
        
        return $this->userModel->find($id);   
    }
    
    
    
    public function delete($id){
        
        $user = $this->userModel->findOrFail($id); 
        
        if(!is_null($user)){
            $user->delete();
        }
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
            Log::critical("Error al eliminar los registros de la tabla usuarios {$e->getCode()}; {$e->getLine()},{$e->getMessage()}" );
        }
        
        return $truncated;
    }
}

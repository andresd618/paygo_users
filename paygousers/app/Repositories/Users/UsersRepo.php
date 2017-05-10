<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Repositories\Users;

use Illuminate\Database\Eloquent\Model;

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
    
    public function findAll(){
        
    }
    
    public function create(){
        
    }
    
    public function show(){
        
    }
    
    public function delete(){
        
    }
    
    public function update(){
        
    }
}

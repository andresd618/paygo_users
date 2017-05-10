<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Repositories\Users;

/**
 *
 * @author andreshernandez
 */
interface UsersInterface {
    //put your code here
    
    
    public function findAll();
    
    public function create();
    
    public function show();
    
    public function delete();
    
    public function update();
    
}

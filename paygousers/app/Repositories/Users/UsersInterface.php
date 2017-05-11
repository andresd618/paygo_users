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
    
    
    //Obtiene los usuarios paginados y ordenados
    public function findUsersPag($col, $type, $num);
    
    ///Guarda un nuevo usuario
    public function store(array $data);
    
    private function validateDataUser(array $data);
    
    ///Obtiene la informacion de un usuario
    public function getById($id);
    
    //Elimina un usuario
    public function delete($id );
    
    ///Actualiza la informacion de un usuario
    public function update(array $data);
 
    public function truncate();
}

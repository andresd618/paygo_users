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
    public function findUsersPag( $num, $typeOrd, $col, $page);
    
    ///Guarda un nuevo usuario
    public function store($data);
    
    ///Realiza insert multiple de usuarios
    public function storeBulk(array $data);
    
    ///Valida la informacion para crear/actualizar un usuario
    public function validateDataUser($data);
    
    ///Obtiene la informacion de un usuario
    public function getById($id);
    
    //Elimina un usuario
    public function destroy($userIds );
    
    ///Actualiza la informacion de un usuario
    public function update($data);
 
    public function truncate();
}

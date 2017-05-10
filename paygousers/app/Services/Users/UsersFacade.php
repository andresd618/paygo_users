<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Services\Users;

/**
 * Description of UsersFacade
 *
 * @author andreshernandez
 */
class UsersFacade extends Facade {
    //put your code here
    
    protected static function getFacadeAccessor(){return 'UsersService';}
}

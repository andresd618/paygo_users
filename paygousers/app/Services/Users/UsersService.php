<?php

namespace App\Services\Users;

use App\Repositories\Users\UsersInterface;

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
    
}

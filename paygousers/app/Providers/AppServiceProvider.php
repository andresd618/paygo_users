<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Users\UsersRepo;
use App\Services\Users\UsersService;
use App\Models\User;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //Se agrega el repositorio de usuarios
        $this->app->singleton('App\Repositories\Users\UsersInterface', function($app){
            return new UsersRepo(new User());
        });
        
        
        //Se agrega el servicio de usuarios
        $this->app->singleton('UsersService', function($app){
            return new UsersService(new UsersRepo());
        });
        
        
    }
}

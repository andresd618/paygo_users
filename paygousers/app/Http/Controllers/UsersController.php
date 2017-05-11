<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Users\UsersService;

class UsersController extends Controller
{
    
    protected $usersService;
    
    
    public function __construct(UsersService $usersService) {
        $this->usersService = $usersService;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return "Este es el index";
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
        $validator = $this->validate($request,[
            'file' => 'required|file|mimes:csv,txt',
        ]);                
        
        //Si el archivo es valido se cargan los usuarios
        if(!$validator->fails() && Input::hasFile('file') && Input::file('file')->isValid()){
                        
            $response = $this->usersService->usersFromCSV(Input::file('file'));
         
        }else{
            $response = response()->json(['status' => false,'msg' => 'El archivo CSV no es valido'],500);
            Log::critical("El archivo CSV no es valido {$e->getCode()}; {$e->getLine()},{$e->getMessage()}" );            
        }
        
        return response()->json($responseObj,$statusHTTP);
    }

    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserFormRequest $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    
    
    public function trunctate(){                
        
        return $this->usersService->truncate();
    }
}

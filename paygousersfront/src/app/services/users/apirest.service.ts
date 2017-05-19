import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import {IUser} from 'app/interfaces/iuser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';


@Injectable()
export class ApirestService {

  apiURL: string = "http://127.0.0.1:8000/api/users";

  
  /**
   * Constructor
   */
  constructor(private _http : Http) { 

  }


  /**
   * Obtiene los usuarios segun la cantidad de registros a visualizar, el tipo y el campo de ordenamiento
   */
    public getUsers(num : number, campoOrden : string, tipoOrden : string, page : number): Observable<any>{

        let headers = new Headers();
        headers.append('Content-Type', 'x-www-form-urlencoded');
        headers.append('X-Requested-Width', 'XMLHttpRequest');

        return this._http
                .get(this.apiURL + "/index/" + num + "/" + tipoOrden  + "/" + campoOrden + "/" + page)
                .map((res: Response) => res.json());
  }     



  /**
   * Retorna un observable que crea en bd los usuarios que contiene el archivo csv 
   */
  public uploadUsers(file : File) : Observable<any>
    {        
        let uploadHeaders : Headers = new Headers;        
        uploadHeaders.append('Accept', 'application/json');                

        let formData : FormData = new FormData();
        formData.append("file", file, file.name);

        return this._http
                    .post(this.apiURL, formData, {headers: uploadHeaders})
                    .map((res: Response) => res.json());            
    }


    /**
     * Retorna un observable que actualiza la informacion de un usuario
     */
    public updateUser(user : IUser) : Observable<any>
    {
        let headers = new Headers();
        headers.append('Content-Type', 'x-www-form-urlencoded');
        headers.append('X-Requested-Width', 'XMLHttpRequest');

        return this._http
                    .put(this.apiURL + "/" + user.id, JSON.stringify(user), {headers: headers})
                    .map((res: Response) => res.json());                    
    }



    /**
     * Retorna un observable que elimina de la bd todos los usuarios incluidos en el array ids
     */
    public deleteUsers(ids : number[])
    {
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-Requested-Width', 'XMLHttpRequest');

        let opts = new RequestOptions({
            headers : headers,
            body: 'ids=' + JSON.stringify(ids)
        })

        return this._http
                .delete(this.apiURL,  opts)
                .map((res: Response) => res.json());                                       
    }


    /**
     * Retorna un observable que elimina todos los usuarios registrados en la bd
     */
    public deleteAllUsers()
    {
        let headers = new Headers();
        headers.append('Content-Type', 'x-www-form-urlencoded');
        headers.append('X-Requested-Width', 'XMLHttpRequest');

        return this._http
                .delete(this.apiURL + "/truncate",  {headers: headers})
                .map((res: Response) => res.json());  ;                
    }
}

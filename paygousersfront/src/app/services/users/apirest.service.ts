import {Http, Headers, Response} from '@angular/http';
import { Injectable } from '@angular/core';
import {IUser} from '../../interfaces/IUser';
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
    public getUsers(num : number, campoOrden : string, tipoOrden : string): Observable<any>{

        let headers = new Headers();
        headers.append('Content-Type', 'x-www-form-urlencoded');
        headers.append('X-Requested-Width', 'XMLHttpRequest');

        return this._http
                .get(this.apiURL + "/index/" + num + "/" + tipoOrden  + "/" + campoOrden + "/2")
                .map((res: Response) => res.json());
  }     


  /**
   * Obtiene la informacion de un usuario
   */
  public getUser(id : number){

    return new Promise(

      (resolve, reject) => {

        this._http.get(this.apiURL + "/" + id)
          .map((res: Response) => res.json())
          .subscribe(
            (res) => {
              resolve(res);
            },
            (error) => {
              reject(error);
            }
          )
      }
    );
  }



  /**
   * Crea en bd los usuarios que contiene el archivo csv 
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
     * Actualiza la informacion de un usuario
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
     * Elimina todos los usuarios incluidos en el array ids
     */
    public deleteUsers(ids : number[])
    {
        this._http.delete(this.apiURL,  {

            body : {"ids" : ids},
            //headers: this.headers

        }).subscribe(response => {

            /*this._dataStore.users.forEach((t, i) => {

                ///Si el id esta en el array de eliminados, se elimina del dataStore
                if (ids.indexOf(t.id) > -1) { this._dataStore.users.splice(i, 1); }
            });

            this._usersObserver.next(this._dataStore.users);*/
            
        }, error => console.log('Error al eliminar los usuarios'));
    }


    /**
     * Elimina todos los usuarios registrados en la bd
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

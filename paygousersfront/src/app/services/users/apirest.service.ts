import {Http, Headers, Response} from '@angular/http';
import { Injectable } from '@angular/core';
import {IUser} from '../../interfaces/IUser';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';


@Injectable()
export class ApirestService {

  apiURL: string = "http://127.0.0.1:8000/api/users";
  headers : Headers = new Headers;
  users$ : Observable<IUser[]>;

  private _usersObserver: Observer<IUser[]>;
  private _dataStore: {
    users : IUser[]
  };


  /**
   * Constructor
   */
  constructor(private _http : Http) { 

    this.headers.append('Content-Type', 'x-www-form-urlencoded');
    this.headers.append('X-Requested-Width', 'XMLHttpRequest');
    this.headers.append('Access-Control-Allow-Headers','content-type');

    this.users$ = new Observable( observer => this._usersObserver = observer).share();
    this._dataStore = { users: []};
  }


  /**
   * Obtiene los usuarios segun la cantidad de registros a visualizar, el tipo y el campo de ordenamiento
   */
  public getUsers(num : number, campoOrden : string, tipoOrden : string){

    this._http
          .get(this.apiURL)
          .map(response => response.json())
          .subscribe(
            data => {
              this._dataStore.users = data.items;
              this._usersObserver.next(this._dataStore.users);
            }, 
            error => console.log('Error al obtener los usuarios')
          );
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
   * Crea los usuarios que incluye el archivo csv 
   */
  public uploadUsers(file : File)
    {
        let formData : FormData = new FormData();
        formData.append("file", file, file.name);

        return new Promise((resolve, reject) => {
            this._http.post(this.apiURL, formData, {
                headers: this.headers
            })
            .map((res: Response) => res.json())
            .subscribe(
                (res) => {
                    resolve(res);
                },
                (error) => {
                    reject(error);
                }
            );
        })
    }


    /**
     * Actualiza la informacion de un usuario
     */
    public updateUser(user : IUser, id : number)
    {
        return new Promise((resolve, reject) => {
            this._http.put(this.apiURL + "/" + id, user, {
                headers: this.headers
            })
            .map((res: Response) => res.json())
            .subscribe(
                (res) => {
                    resolve(res);
                },
                (error) => {
                    reject(error);
                }
            );
        })
    }



    /**
     * Elimina todos los usuarios incluidos en el array ids
     */
    public deleteUsers(ids : number[])
    {
        this._http.delete(this.apiURL,  {

            body : {"ids" : ids},
            headers: this.headers

        }).subscribe(response => {

            this._dataStore.users.forEach((t, i) => {

                ///Si el id esta en el array de eliminados, se elimina del dataStore
                if (ids.indexOf(t.id) > -1) { this._dataStore.users.splice(i, 1); }
            });

            this._usersObserver.next(this._dataStore.users);
            
        }, error => console.log('Error al eliminar los usuarios'));
    }

}

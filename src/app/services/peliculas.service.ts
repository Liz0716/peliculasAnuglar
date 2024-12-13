import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class peliculasService {
  private url = 'http://127.0.0.1:8000/api'

  constructor(private http:HttpClient) {

  }

  // Metodo get
  Service_Get(Modelo: string,Dato: string | number = ''){
    return this.http.get(`${this.url}/${Modelo}/${Dato}`);
  }

  // Metodo post
  Service_Post(Modelo: string,Dato: string | number = '', Parametro: any){
    return this.http.post(`${this.url}/${Modelo}/${Dato}`, Parametro);
  }

  // Metodo patch
  Service_Patch(Modelo: string,Dato: string | number = '', Parametro: any){
    return this.http.patch(`${this.url}/${Modelo}/${Dato}`, Parametro);
  }

  // Metodo delete
  Service_Delete(Modelo: string,Dato: string | number = ''){
    return this.http.delete(`${this.url}/${Modelo}/${Dato}`);
  }

}

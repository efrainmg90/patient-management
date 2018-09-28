import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Examen } from './../_model/examen';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  examenCambio = new Subject<Examen[]>();
  mensaje = new Subject<string>();
  url: string = `${HOST}/examenes`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Examen[]>(this.url);
  }

  listarExamenPorId(id: number){
    return this.http.get<Examen>(`${this.url}/${id}`);
  }

  registrar(especialidad: Examen){
    return this.http.post(this.url, especialidad);
  }

  modificar(especialidad: Examen){
    return this.http.put(this.url, especialidad);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`,{responseType: 'text' });
  }
}

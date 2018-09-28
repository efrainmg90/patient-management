import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Subject } from 'rxjs';
import { Especialidad } from './../_model/especialidad';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidadCambio = new Subject<Especialidad[]>();
  mensaje = new Subject<string>();
  url: string = `${HOST}/especialidades`;
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Especialidad[]>(this.url);
  }

  listarEspecialidadPorId(id: number){
    return this.http.get<Especialidad>(`${this.url}/${id}`);
  }

  registrar(especialidad: Especialidad){
    return this.http.post(this.url, especialidad);
  }

  modificar(especialidad: Especialidad){
    return this.http.put(this.url, especialidad);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`,{responseType: 'text' });
  }
}

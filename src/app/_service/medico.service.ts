import { HttpClient } from '@angular/common/http';
import { Medico } from './../_model/medico';
import { Subject } from 'rxjs';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url: string = `${HOST}/medicos`;
  medicosCambio = new Subject<Medico[]>();
  mensaje = new Subject<string>(); 

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Medico[]>(this.url);
  }

  listarMedicoPorId(id: number){
    return this.http.get<Medico>(`${this.url}/${id}`);
  }

  registrar(medico: Medico){
    return this.http.post(this.url, medico);
  }

  modificar(medico: Medico){
    return this.http.put(this.url, medico);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`,{responseType: 'text' });
  }
}

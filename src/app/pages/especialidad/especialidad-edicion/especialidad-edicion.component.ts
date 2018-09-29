import { ActivatedRoute, Router, Params } from '@angular/router';
import { EspecialidadService } from './../../../_service/especialidad.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  constructor(private especialidadService: EspecialidadService, private route: ActivatedRoute, private router: Router) { 
    this.form = new FormGroup({
      'idEspecialidad': new FormControl(0),
      'nombre': new FormControl('')
    });
  }
  

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm(){
    if (this.edicion) {
      this.especialidadService.listarEspecialidadPorId(this.id).subscribe(data => {
        let id = data.idEspecialidad;
        let nombre = data.nombre;
        this.form = new FormGroup({
          'idEspecialidad': new FormControl(id),
          'nombre': new FormControl(nombre)
        });
      });
    }
  }

  operar() {

    if (this.edicion) {
      this.especialidadService.modificar(this.form.value).subscribe(data => {
        this.especialidadService.listar().subscribe(especialidad => {
          this.especialidadService.especialidadCambio.next(especialidad);
          this.especialidadService.mensaje.next("Se modificó");
        });
      });
    } else {
      this.especialidadService.registrar(this.form.value).subscribe(data => {
        console.log(data);
        this.especialidadService.listar().subscribe(especialidad => {
          this.especialidadService.especialidadCambio.next(especialidad);
          this.especialidadService.mensaje.next("Se registró");
        });
      });
    }

    this.router.navigate(['especialidad']);
  }

}

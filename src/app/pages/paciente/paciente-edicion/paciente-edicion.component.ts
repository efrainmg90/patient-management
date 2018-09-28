import { PacienteService } from './../../../_service/paciente.service';
import { Paciente } from './../../../_model/paciente';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private pacienteService: PacienteService) {
    this.form = new FormGroup({
      'idPaciente' : new FormControl(0),
      'nombres' : new FormControl(''),
      'apellidos' : new FormControl(''),
      'dni' : new FormControl(''),
      'direccion' : new FormControl(''),
      'telefono' : new FormControl('')
    });

   }

  ngOnInit() {
    this.route.params.subscribe( (params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm(){
    if(this.edicion){
      //cargar la data del servicio en el form
      this.pacienteService.listarPacientePorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idPaciente' : new FormControl(data.idPaciente),
          'nombres' : new FormControl(data.nombres),
          'apellidos' : new FormControl(data.apellidos),
          'dni' : new FormControl(data.dni),
          'direccion' : new FormControl(data.direccion),
          'telefono' : new FormControl(data.telefono)
        });
      });
    }
  }//end init form

  operar(){
    if(this.edicion){
      //actualizar
      this.pacienteService.modificar(this.form.value).subscribe(data => {
        this.pacienteService.listar().subscribe(pacientes => {
          this.pacienteService.pacienteCambio.next(pacientes);
          this.pacienteService.mensajeCambio.next('Se modificó');
        });
      });
    }else{
      //registrar
      this.pacienteService.registrar(this.form.value).subscribe(data => {
        this.pacienteService.listar().subscribe(pacientes => {
          this.pacienteService.pacienteCambio.next(pacientes);
          this.pacienteService.mensajeCambio.next('Se registró');
        });
      });
    }
    this.router.navigate(['paciente']);
  }

}

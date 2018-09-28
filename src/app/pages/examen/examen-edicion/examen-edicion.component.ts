import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExamenService } from '../../../_service/examen.service';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {

  id: number;
 // examen: Examen;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private examenService: ExamenService, private route: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      'idExamen': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl(''),
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
      this.examenService.listarExamenPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idExamen': new FormControl(data.idExamen),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        });
      });
    }
  }

  operar() {

    if (this.edicion) {
      this.examenService.modificar(this.form.value).subscribe(data => {
        this.examenService.listar().subscribe(especialidad => {
          this.examenService.examenCambio.next(especialidad);
          this.examenService.mensaje.next("Se modifico");
        });
      });
    } else {
      this.examenService.registrar(this.form.value).subscribe(data => {
        this.examenService.listar().subscribe(especialidad => {
          this.examenService.examenCambio.next(especialidad);
          this.examenService.mensaje.next("Se registro");
        });
      });
    }

    this.router.navigate(['examen']);
  }
}

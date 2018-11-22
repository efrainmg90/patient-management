import { ConsultaService } from './../../_service/consulta.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  chart: any;
  tipo: string;
  pdfSrc: string = '';

  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile:string;
  imagenEstado:boolean = false;
  imagenData:any;
  
  constructor(private consultaService:ConsultaService,private sanitizacion:DomSanitizer) { }

  ngOnInit() {
    this.tipo = 'line';
    this.dibujar();
    this.loadImage();
  }
  cambiar(tipo: string){
    if(this.chart)
      this.chart.destroy();

    this.tipo = tipo;
    this.dibujar();
  }

  dibujar(){
    this.consultaService.listarResumen().subscribe(data=>{
      let cantidad = data.map(res=> res.cantidad);
      let fechas = data.map(res=>res.fecha);

      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Cantidad',
              data: cantidad,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });//end chart
    });//end subscribe
  }

  generarReporte(){
    this.consultaService.generarReporte().subscribe(data=>{
      let reader = new FileReader();
      reader.onload = (e:any)=>{
        this.pdfSrc = e.target.result;
      }
      reader.readAsArrayBuffer(data);
      //reader.readAsBinaryString(data);
    });
  }

  descargarReporte(){
    this.consultaService.generarReporte().subscribe(data=>{
      const a = document.createElement('a');
      a.setAttribute('style','dispaly:none;');
      document.body.appendChild(a);
      a.href = window.URL.createObjectURL(data);
      a.download = 'reporte.pdf';
      a.click();
    });
  }

  selectFile(e){
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
  }

  upload(){
    this.currentFileUpload = this.selectedFiles.item(0);
    this.consultaService.guardarArchivo(this.currentFileUpload).subscribe(data=>{
      console.log(data);
      this.selectedFiles = undefined;
    });
  }

  loadImage(){
    this.consultaService.leerArchivo().subscribe(data=>{
      this.convertir(data);
    });
  }

  accionImagen(accion:string){
    if(accion==="M")
    this.imagenEstado = true;
    else
    this.imagenEstado = false;
  }

  convertir(data:any){
    var reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = ()=>{
     // this.imagenData = reader.result;
     this.imagenData = this.sanitizacion.bypassSecurityTrustResourceUrl(reader.result.toString());
    }
  }
}

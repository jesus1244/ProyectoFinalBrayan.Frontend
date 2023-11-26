import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response_obtener_prediccion } from '../Interfaces/user.interface';
import { PagesServiceService } from '../pages-service/pages.service.service';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.css'],
  standalone: true,
  imports: [ FormsModule, CommonModule ]
})
export class FinalPageComponent implements OnInit {

  transaction = "";

  token = localStorage.getItem('token') || "";

  admin = false;

  response: response_obtener_prediccion = {
    other_info: "",
    probability: 0,
    transaction_id: ""
  };

  ngOnInit(): void {
    this.transaction = localStorage.getItem('prediction') || "";
    if (this.transaction == "") {
      this.router.navigate(['/home']);
    }
    switch (this.token) {
      case null:
        this.router.navigate(['/login']);
        break;
      case "":
        this.router.navigate(['/login']);
        break;
      default:
        const decode = this.pagesService.decodeToken(this.token);

        if (decode.rol == "Admin") {
          this.admin = true;
        }
        console.log(decode);
        break;
    }

    this.pagesService.obtener_prediccion(this.transaction).subscribe(
      (response: response_obtener_prediccion) => {
        this.response = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );



  }

  constructor( private router: Router, private pagesService: PagesServiceService ) { }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('prediction');
    window.location.reload();
  }

  exportToPDF() {
    // Crear una nueva instancia de jsPDF
    const pdf = new jsPDF();

    // Agregar el contenido del componente al PDF
    pdf.text('Results', 20, 20);
    pdf.text('Other info: ' + this.response.other_info, 20, 30);
    pdf.text('Probability: ' + this.response.probability, 20, 40);
    pdf.text('Transaction Id: ' + this.response.transaction_id, 20, 50);

    // Guardar el PDF con un nombre específico (por ejemplo, 'results.pdf')
    pdf.save('results.pdf');
  }
}

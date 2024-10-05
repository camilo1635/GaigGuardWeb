import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ods-detail',
  templateUrl: './ods-detail.component.html',
  styleUrls: ['./ods-detail.component.css']
})
export class OdsDetailComponent implements OnInit {
  odsId!: number;  // El operador "!" indica que será asignada más tarde

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtenemos el parámetro "id" de la ruta
    this.odsId = +this.route.snapshot.paramMap.get('id')!;
  }
}

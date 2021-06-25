import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [ OfertasService ]
})
export class RestaurantesComponent implements OnInit {

  constructor(private ofertaService: OfertasService) { }

  ngOnInit(): void {
    this.ofertaService.getOfertasPorCategoria('restaurante')
      .then((ofertas: Oferta[]) => { console.log(ofertas)})
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Snapshot
    // console.log("ID recuperado da rota: ", this.route.snapshot.params['id']);
    // caso quisesse passar mais parametros na rota, só fazer o mesmo processo
    this.route.params.subscribe((parametro: any) => {
      console.log(parametro.id);
    })
  }

}

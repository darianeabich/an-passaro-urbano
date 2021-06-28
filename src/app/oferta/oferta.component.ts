import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta!: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit(): void {
    // Snapshot
    // caso quisesse passar mais parametros na rota, só fazer o mesmo processo
    this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
      .then((oferta: Oferta) => {
        this.oferta = oferta;
      });

    // this.route.params.subscribe(
    //   (parametro: any) => { console.log(parametro)},
    //   (erro: any) => console.log(erro),
    //   () => console.log('processamento foi classificado como concluído')
    // );

    // let tempo = interval(500);
    // tempo.subscribe((resposta:number) => console.log(resposta));

    //observable (observável)
    let meuObservableTeste = new Observable((observer: Observer<number>) => {
      observer.next(1);
      observer.next(3);
      //observer.error('ocorreu um erro que fechou a aplicação');
      observer.complete();
      observer.next(3);
    });

    //observable (observador)
    meuObservableTeste.subscribe(
      (resultado: number) => console.log(resultado + 10),
      (erro: string) => console.log(erro),
      () => console.log('Stream de eventos foi finalizada')
    );
  }

}

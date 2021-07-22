import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas!: Observable<Oferta[]>;
  public ofertas2!: Oferta[];
  public subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa //retorno Ofertas[] //executa a ação do switchMap após 1s
      .pipe(
        debounceTime(1000), //executa a ação do switchMap após 1s
        distinctUntilChanged(), //fazer pesquisas distintas
        switchMap((termo: string) => {

        if (termo.trim() === '') {
          //retornar um observable de Ofertas[] vazio quando não tiver nada digitado na pesquisa
          return of<Oferta[]>([]);
        }
        return this.ofertasService.pesquisaOfertas(termo);
        }),
        catchError((err: any) => {
          return of<Oferta[]>([]);
        })
      );
  }

  /**
   * pesquisa
event: Event : void  */
  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca); //sempre que houver um termo de busca, este será enviado ao subject
  }

}

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
  public subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa //retorno Ofertas[] //executa a ação do switchMap após 1s
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((termo: string) => {
        console.log('requisiçãi http para api ');

        if (termo.trim() === '') {
          //retornar um observable de Ofertas[] vazio quando não tiver nada digitado na pesquisa
          return of<Oferta[]>([]);
        }
        return this.ofertasService.pesquisaOfertas(termo);
        }),
        catchError((err: any) => {
          console.log(err);
          return of<Oferta[]>([]);
        })
      );

    this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas))
  }

  /**
   * pesquisa
event: Event : void  */
  public pesquisa(termoDaBusca: string): void {
    console.log('keyup caracter: ', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca); //sempre que houver um termo de busca, este será enviado ao subject
  }

}

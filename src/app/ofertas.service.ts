import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { Oferta } from './shared/oferta.model';
import { URL_API } from './app.api';

@Injectable()
export class OfertasService {

  constructor(private http: HttpClient) {}

  //private url_api = 'http://localhost:3000/ofertas';

  public getOfertas(): Promise<Oferta[]> {
    // efetuar uma requisição http
    // retornar uma promise Oferta[]
    return this.http.get(`${URL_API}/ofertas?destaque=true`)
      .toPromise()
      .then((resposta: any) => resposta);
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
    return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
      .toPromise()
      .then((resposta: any) => resposta);
  }

  public getOfertaPorId(id: number): Promise<Oferta> {
    return this.http.get(`${URL_API}/ofertas?id=${id}`)
      .toPromise()
      .then((resposta: any) => {
        return resposta[0];
      });
  }

  public getComoUsuarOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/como-usar?id=${id}`)
      .toPromise()
      .then((resposta: any) => {
        return resposta[0].descricao;
      })
  }

  public getOndeFicaOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/onde-fica?id=${id}`)
      .toPromise()
      .then((resposta: any) => {
        return resposta[0].descricao;
      })
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
    .pipe(
      map((resposta: any) => {
        return resposta;
      }),
      retry(10)
    )
  }
  // public getOfertas2(): Promise<Oferta[]> {
  //   return new Promise((resolve, reject) => {
  //     // algum tipo de processamento, que ao finalzar, chama da função resolve ou a reject
  //     // resolve() = passa a informação para o then
  //     //console.log('será que passou por aqui?');
  //     let deuCerto = true;
  //     if (deuCerto) {
  //       // 1º param é uma função que tem o retorno do resolve (objetivo)
  //       setTimeout(() => resolve(this.ofertas), 3000);

  //     } else {
  //       reject({codigoErro: 404, mensagemErro: 'Servidor não encontrado XYZ'});
  //     }
  //   })
  //   .then((ofertas: any) => {
  //     //fazer alguma tratativa
  //     console.log('primeiro then');
  //     return ofertas;
  //   })
  //   .then((ofertas: any) => {
  //     //fazer alguma tratativa
  //     console.log('segundo then');
  //     return new Promise((resolve2, reject2) => {
  //       setTimeout(() => { resolve2(ofertas)}, 3000);
  //     });
  //   })
  //   .then((ofertas: any) => {
  //     console.log('terceiro then executado após 3 segundos porque estava aguardando uma promise ser resolvida');
  //     return ofertas;
  //   })
  // }
}

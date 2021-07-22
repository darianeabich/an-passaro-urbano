import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {

  transform(texto: string, truncarEm: number): string {
    if(texto.length > truncarEm) {
      return texto.substr(0, truncarEm) + '...';
      //o valor inicial também pode ser deixado dinâmico e informado como 2º parâmetro no template
    }

    return texto;
  }

}

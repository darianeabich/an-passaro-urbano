import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * pesquisa
event: Event : void  */
  public pesquisa(event: Event): void {
    console.log((<HTMLInputElement>event.target).value);
  }

}

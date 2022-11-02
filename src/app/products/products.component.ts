import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }
  //variabili subito dopo il costruttore
  stringaBooleano: Boolean = true;

  ngOnInit(): void {
  }

  //da padre a figlio
  @Input()
  stringaTestRicevutaDalPadre!: string;

  //da figlio a padre
  //name: string = 'elemento zero';
  /* @Output() passaggioDaFiglioAPadre = new EventEmitter();
  daFiglioAPadre(elementoDaPassare: string){
    this.passaggioDaFiglioAPadre.emit(elementoDaPassare);
  }
 */

}

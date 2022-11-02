import { Component, OnInit } from '@angular/core';
//import { ModalDirective } from 'angular-bootstrap-md';
import {
  NgbModalConfig,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Dipendente } from './dipendente';
import { DipendenteServiceService } from './dipendente-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbActiveModal],
})
export class AppComponent implements OnInit {
  /* title = 'crudFrontEnd';

  ngOnInit(): void{
    this.testMetodo(); //this elemento all'interno di questo file
  }

  testMetodo(){
  console.log("Miao");
  }

  //passaggio stringa a componente figlio
  stringaTest: string = "Passaggio da componente padre a componente figlio!";

  //da figlio a padre
  elementi = ['primo elemento'];
  daFiglioAPadre(name: string){
    this.elementi.push(name);
  } */

  public dipendenti!: Dipendente[];
  public editDipendente!: Dipendente;
  public deleteDipendente!: Dipendente;

  constructor(
    private dipendenteService: DipendenteServiceService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.getDipendenti();
  }

  //apro i modali
  openAddModal(addModal: any){
    this.modalService.open(addModal, { size: 'lg', centered: true });
  }
  openUpdateModal(updateModal: any, dipendente: Dipendente){
    this.editDipendente = dipendente;
    this.modalService.open(updateModal);
  }
  openDeleteModal(deleteModal: any, dipendente: Dipendente){
    this.deleteDipendente = dipendente;
    this.modalService.open(deleteModal);
  }

  //chiudo i modali
  closeAddModal(){
    //id bottone
    (document.getElementById('add-dipendente-form') as HTMLElement).click();
  }
  closeUpdateModal(){
    //id bottone
    (document.getElementById('update-dipendente-form') as HTMLElement).click();
  }
  closeDeleteModal(){
    //id bottone
    (document.getElementById('delete-dipendente-form') as HTMLElement).click();
  }


  public getDipendenti(): void {
    //con subscribe gestisco il comportamento di un observable - è un metodo
    this.dipendenteService.getDipendenti().subscribe({
      //finché ho un oggetto di tipo dipendente fai questa operazione
      next: (dipendente) => {
        this.dipendenti = dipendente;
        console.log(this.dipendenti);
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  public addDipendente(addForm: NgForm): void {
    console.log("Sono dentro addDipendente"); //debug
    this.closeAddModal();
    this.dipendenteService.addDipendente(addForm.value).subscribe({
      next: () => {
        //this.dipendenteService.addDipendente(addForm.value); //passo contenuto del form
        addForm.reset();
        this.getDipendenti();
        alert('Dipendente aggiunto con successo!');
      },
      error: (err) => {
        console.log("Errore");
        alert("Errore nell'aggiunta del dipendente");
        console.log('Errore', err);
        addForm.reset();
      },
    });
  }

  public updateDipendente(dipendente: Dipendente): void {
    this.dipendenteService.updateDipendente(dipendente).subscribe({
      next: () => {
        this.closeUpdateModal();
        this.getDipendenti();
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }

  public removeDipendente(dipendenteId: number): void{
    this.dipendenteService.deleteDipendente(dipendenteId).subscribe({
      next: (res) => {
        console.log(res);
        this.closeDeleteModal();
        this.getDipendenti();
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }

  public searchDipendenti(key: string): void{
    const results: Dipendente[] = [];
    for(const dipendente of this.dipendenti){
      if(dipendente.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || dipendente.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || dipendente.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || dipendente.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(dipendente);
      }
    }
    this.dipendenti = results;
    if(results.length == 0 || !key){
      this.getDipendenti();
    }
  }
}
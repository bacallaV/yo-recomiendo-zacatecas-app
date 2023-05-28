import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { dataCardCategoria } from 'src/app/interfaces/data-card-categoria.interface';

@Component({
  selector: 'card-categoria',
  templateUrl: './card-categoria.component.html',
  styleUrls: ['./card-categoria.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardCategoriaComponent implements OnInit{
  @Input('small') small: boolean = true;
  @Input('data') data: dataCardCategoria = {
    id: 0,
    name: 'Sin definir',
    src : ''
  }; 

  constructor(
      private router: Router,
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.small);
  }

  selectCategoria() {
    
    if(this.data.id) {
        console.log(this.data.id);

        // this.router.navigate(['/home/' + this.data.id]);
    }
  }

}

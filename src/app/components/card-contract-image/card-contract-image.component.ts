import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'card-contract-image',
  templateUrl: './card-contract-image.component.html',
  styleUrls: ['./card-contract-image.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardContractImageComponent implements OnInit {

  @Input('data') data: any;
  @Input('src') src: any;

    constructor(
        private router: Router,
    ) {}

    ngOnInit(): void {}

  startContract() {
    if(this.data.id) {
        console.log(this.data.id);

        // this.router.navigate(['/home/' + this.data.id]);
    }
  }

}

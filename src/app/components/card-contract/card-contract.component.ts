import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'card-contract',
  templateUrl: './card-contract.component.html',
  styleUrls: ['./card-contract.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardContractComponent implements OnInit {

  @Input('data') data: any;

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

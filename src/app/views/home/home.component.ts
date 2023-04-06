import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';
import { ContractService } from 'src/app/services/contract/contract.service';
import { IllustrationService } from 'src/app/services/illustration/illustration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public loader: AnimationOptions = {
    path: '/assets/images/PAC-Hero.json',
    autoplay: true,
    loop: true,
  }
    public list_contract: any[] = [];
    public list_illustration: any[] = [];

  constructor(
    private contract: ContractService,
    private illustrationService: IllustrationService
  ){}

  ngOnInit(): void {
    this.getList();
    this.getIllustrations();
  }

  async getList(page?: number) {
    let obj = {
        page: page ? page : 1,
        per_page: 12,
        all: false,
        status: 2,
        category: null,
        type:  null,
        word:  null,
        orderBy: 1,
        arrayInclude: ['category', 'type'],
    };


    await this.contract.index(obj).toPromise()
    .then((res: any) => {
        this.list_contract = res.data.records;
        
        
    })
    .catch(err => console.log('Error contract: ', err));
  }

  getIllustrations(){
    this.illustrationService.list().toPromise()
    .then((res: any) => {
        this.list_illustration = res.data.records;
        
    })
    .catch(err => console.log('Error contract: ', err));
  }

  getIllustration( idIlustracion : any): string{    
    let src : string = '';
    let illustrations : any = this.list_illustration.filter(function (i) {
      return i.id == 1;
    })    
    return illustrations[0].asset;
  }

  redirectRegistro(){}

  animationLoader(animationItem: AnimationItem): void {}

}

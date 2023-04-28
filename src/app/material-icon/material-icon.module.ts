import { NgModule } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';


@NgModule({})


export class MaterialIconModule {
    private path: string = 'assets/icons';


    constructor(
        private domSanitizer: DomSanitizer,
        public matIconRegistry: MatIconRegistry
    ) {
        this.matIconRegistry
            .addSvgIcon('icon-add', this.setPath(`${this.path}/icon-add.svg`))
            .addSvgIcon('clients', this.setPath(`${ this.path }/Clientes.svg`))
            .addSvgIcon('clients-alternative', this.setPath(`${ this.path }/Clientes Alternative.svg`))
            .addSvgIcon('collaborators', this.setPath(`${ this.path }/Colaboradores.svg`))
            .addSvgIcon('download-file', this.setPath(`${ this.path }/Download.svg`))
            .addSvgIcon('excel-file', this.setPath(`${ this.path }/Excel.svg`))
            .addSvgIcon('finanzas', this.setPath(`${ this.path }/Finanzas.svg`))
            .addSvgIcon('home', this.setPath(`${ this.path }/Home.svg`))
            .addSvgIcon('inversiones', this.setPath(`${ this.path }/Inversiones.svg`))
            .addSvgIcon('mail', this.setPath(`${ this.path }/Mail.svg`))
            .addSvgIcon('pdf-file', this.setPath(`${ this.path }/PDF.svg`))
            .addSvgIcon('profile', this.setPath(`${ this.path }/Perfil.svg`))
            .addSvgIcon('upload', this.setPath(`${ this.path }/Upload.svg`))
            .addSvgIcon('arrowDown', this.setPath(`${ this.path }/arrowDown.svg`))
            .addSvgIcon('close', this.setPath(`${ this.path }/Close.svg`));

        // this.matIconRegistry
        //   .addSvgIconSet(this.setPath(`${this.path}/sprite.svg`));
    }


    private setPath(url: string): SafeResourceUrl {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

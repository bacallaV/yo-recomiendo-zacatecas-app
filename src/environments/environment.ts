// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'yo-recomiendo-zac',
    appId: '1:59338816991:web:749fccfc9f1f6f66db186a',
    storageBucket: 'yo-recomiendo-zac.appspot.com',
    apiKey: 'AIzaSyA8E4K0XG7YNNAkXkTX7sgt9t8fExG_nh8',
    authDomain: 'yo-recomiendo-zac.firebaseapp.com',
    messagingSenderId: '59338816991',
    measurementId: 'G-Y2CDG4JJCQ',
  },
  production: false,
  urlApi: 'http://localhost:3000/api/v1',
  urlPHP: 'http://localhost/api-hydra',

  // Social media
  URL_FACEBOOK:  'https://www.facebook.com/YoRecomiendoZacatecas',
  URL_INSTAGRAM: 'https://www.instagram.com/yorecomiendozacatecas',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

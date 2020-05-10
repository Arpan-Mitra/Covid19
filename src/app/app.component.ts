import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Covid19Tracker';
  signature : string = 'Creator:- @Arpan Mitra';
  constructor(){
    //navigator.onLine ? console.log('Online') : router.navigateByUrl('/error');
      }
}

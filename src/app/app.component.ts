import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { $ } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Covid19Tracker';
  signature : string = 'Creator:- @Arpan Mitra';
  constructor(private router :Router){
    //navigator.onLine ? console.log('Online') : router.navigateByUrl('/error');
      }
      ngOnInit(){
        // $('.navbar-collapse li a').click(function(){
        //   (<any>$(".navbar-collapse")).collapse('hide');
        // }
}
}

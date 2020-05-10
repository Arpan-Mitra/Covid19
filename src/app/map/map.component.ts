import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../dashboard/getdata.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  data;
  total : Array<{name : string, confirmed:number, active:number, recovered:number, deceased:number,
    deltaConfirmed:number, deltaDeaths: number, deltaRecovered : number, lastUpdated : string ,stateCode : string}> = [];

  constructor(private service : GetdataService) { 
    this.getAllData1();
  }

  ngOnInit() {
  }

  getAllData1(){
    this.service.getAllData().then(res=>{
      this.data  = res;
      //console.log("confirmed cases "+ this.tempData['statewise'][0].active);
      this.total = [];
      
      this.total.push({
        name:this.data['statewise'][0].state,
        confirmed:this.data['statewise'][0].confirmed,
       active:this.data['statewise'][0].active,
       recovered:this.data['statewise'][0].recovered,
         deceased:this.data['statewise'][0].deaths,
        deltaConfirmed:this.data['statewise'][0].deltaconfirmed,
         deltaDeaths: this.data['statewise'][0].deltadeaths,
          deltaRecovered : this.data['statewise'][0].deltarecovered,
           lastUpdated : this.data['statewise'][0].lastupdatedtime,
          stateCode :this.data['statewise'][0].statecode});
    }).catch();
  
  }

  changeValue(stateparam){
    this.total = [];
    this.data['statewise'].forEach(state => {
      if((state.statecode == stateparam)){
          this.total.push({
            name:state.state,
            confirmed:state.confirmed, active:state.active,
            recovered:state.recovered, deceased:state.deaths, deltaConfirmed:state.deltaconfirmed,
            deltaDeaths: state.deltadeaths, deltaRecovered : state.deltarecovered,
             lastUpdated : state.lastupdatedtime,
             stateCode : state.statecode
          });
      }
      
    });

  }

}

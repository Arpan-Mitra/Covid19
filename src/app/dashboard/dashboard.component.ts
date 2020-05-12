import { Component, OnInit } from '@angular/core';
import { GetdataService } from './getdata.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  country: string ="INDIA";
  mydate : Date= new Date();
  stateno : number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  arrow : string[] = [">",">",">",">",">",">",">",">",">",">",">",">",">",">",">",">",">",">",
                      ">",">",">",">",">",">",">",">",">",">",">",">",">",">",">",">",">",">",">"];
  data ;
  statedata;
  zonewisedata;
  stateName : String;
  updatedConfirm : number = 0;
  stateDistrictData : Array<{name :string, confirmed:number, active:number, recover:number, deceased:number}> = [];
  // statewise : Array<{name :string, confirmed:number, active:number, recover:number, deceased:number}> = [];
   confirmed : number;
   active : number;
   recovered : number;
   deceased : number;
   total : Array<{confirmed:number, active:number, recovered:number, deceased:number,
    deltaConfirmed:number, deltaDeaths: number, deltaRecovered : number, lastUpdated : string}> = [];
   stateTemp;
   statewiseTemp : Array<{name :string, confirmed:number, active:number, recover:number, deceased:number,
    deltaConfirmed:number, deltaDeaths: number, deltaRecovered : number, lastUpdated : string, statenotes: string,statecode:string}> = [];
   districtDataTemp : Array<{name:string, confirmed:number, active:number, recovered:number, deceased:number,
      deltaConfirmed:number, deltaDeaths: number, deltaRecovered : number,statecode : string,zone :string}> = []; 
    zonewiseTemp: Array<{district: string,state: string, statecode:string,zone : string}>=[];
  constructor(private service : GetdataService) { 
    this.getAllData();
    this.getStateWiseData();
    this.getZonewiseData();
  }

  ngOnInit() {
  }
  getAllData(){
    this.service.getAllData().then(res=>{
      this.data  = res;
      //console.log("confirmed cases "+ this.tempData['statewise'][0].active);
      this.total = [];
      this.total.push({confirmed:this.data['statewise'][0].confirmed,
       active:this.data['statewise'][0].active,
       recovered:this.data['statewise'][0].recovered,
         deceased:this.data['statewise'][0].deaths,
        deltaConfirmed:this.data['statewise'][0].deltaconfirmed,
         deltaDeaths: this.data['statewise'][0].deltadeaths,
          deltaRecovered : this.data['statewise'][0].deltarecovered,
           lastUpdated : this.data['statewise'][0].lastupdatedtime});
      
      this.statewiseTemp =[];
      this.data['statewise'].forEach(state => {
        if((state.state != "Total")){
            this.statewiseTemp.push({
              name :state.state, confirmed:state.confirmed, active:state.active,
             recover:state.recovered, deceased:state.deaths, deltaConfirmed:state.deltaconfirmed,
              deltaDeaths: state.deltadeaths, deltaRecovered : state.deltarecovered,
               lastUpdated : state.lastupdatedtime,
               statenotes : state.statenotes,
               statecode : state.statecode
            });
        }
        
      });

    }).catch();
  }

  getStateWiseData(){
    this.service.getStatewiseData()
    .then(res =>{
      this.statedata = res;
           
    } ).catch();
  }
  getZonewiseData(){
    this.service.getZonewiseData()
    .then(res =>{
      this.zonewisedata = res;
           
    } ).catch();
  }
  getStateDetails(name,count,statecode){


    for (var i=0;i<this.zonewisedata.zones.length;i++){
        this.zonewiseTemp.push({
          district:this.zonewisedata.zones[i].district ,
          state : this.zonewisedata.zones[i].state, 
          statecode :this.zonewisedata.zones[i].statecode,
          zone:this.zonewisedata.zones[i].zone
        });
  
    }

    var flag :Boolean =false;
      for(var t=0;t<this.districtDataTemp.length;t++){
        if(this.districtDataTemp[t].statecode == statecode){
          flag=true;
          break;
        }
      }
    for(var district in this.statedata[name].districtData){
      if(flag==false){
        this.districtDataTemp.push({
          name: district,confirmed:this.statedata[name].districtData[district].confirmed,
          active:this.statedata[name].districtData[district].active,
          recovered:this.statedata[name].districtData[district].recovered,
          deceased:this.statedata[name].districtData[district].deceased,
          deltaConfirmed:this.statedata[name].districtData[district].delta.confirmed,
          deltaDeaths: this.statedata[name].districtData[district].delta.deceased,
          deltaRecovered : this.statedata[name].districtData[district].delta.recovered,
          statecode :this.statedata[name].statecode,
          zone : ""
          });
      }
    }

    for (var i=0;i<this.zonewisedata.zones.length;i++){
      for(var j=0;j< this.districtDataTemp.length;j++){
        if(this.zonewisedata.zones[i].district == this.districtDataTemp[j].name ){
          this.districtDataTemp[j].zone =this.zonewisedata.zones[i].zone;
        }
      }
    }
    console.log(this.districtDataTemp);


    for (var j=0;j<37;j++){
      if(j==count){
        if(this.arrow[j]==">"){
          this.arrow[j]="v";
        }else{
          this.arrow[j]=">";
        }
      }
    }
    for (var i=0;i<37;i++){
      if(i==count){
        if(this.stateno[i]==0){
          this.stateno[i]=1;
        }else{
          this.stateno[i]=0;
        }
      }
    }
  }

}

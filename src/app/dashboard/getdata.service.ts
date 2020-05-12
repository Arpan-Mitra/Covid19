import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private http: HttpClient) { }

  getAllData() :Promise<any>{
    return this.http.get('https://api.covid19india.org/data.json')
    .toPromise()
    .then((response)=>{
      return response;
    })
    .catch(this.errorHandler);
  }
  getStatewiseData() :Promise<any>{
    return this.http.get('https://api.covid19india.org/state_district_wise.json')
    .toPromise()
    .then((response)=>{
      return response;
    })
    .catch(this.errorHandler);
  }
  getZonewiseData() :Promise<any>{
    return this.http.get('https://api.covid19india.org/zones.json')
    .toPromise()
    .then((response)=>{
      return response;
    })
    .catch(this.errorHandler);
  }

 private errorHandler(error:any):Promise<any> {
  console.error("Error occured",error);    
  return Promise.reject(error.json() || error);
  }
}

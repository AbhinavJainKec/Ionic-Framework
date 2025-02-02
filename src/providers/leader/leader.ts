import { Injectable } from '@angular/core';
import { Leader } from '../../shared/leader';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: Http,
    private processHTTPMsgService: ProcessHttpmsgProvider) { 
      console.log('Hello LeaderProvider Provider');
    }

  getLeaders(): Observable<Leader[]> {
  return this.http.get(baseURL + 'leaders')
            .map(res => { return this.processHTTPMsgService.extractData(res); })
            .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getLeader(id: number): Observable<Leader> {
  return  this.http.get(baseURL + 'leaders/'+ id)
            .map(res => { return this.processHTTPMsgService.extractData(res); })
            .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedLeader(): Observable<Leader> {
  return this.http.get(baseURL + 'leaders?featured=true')
            .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
            .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

}

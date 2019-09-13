import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../../environments/environment.prod'; 
import { BehaviorSubject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Notify } from '../../../shared/notification/notification/notification.component';
import { PageQuery } from '../../../shared/adif-data-table/data-table/data-table.component';

export interface CierresContables {
  id?: number;
  periodo: string;
  fecha_cierre: string;
  tstamp?: number;
}

export interface ContablesContent {
  content: CierresContables[];
  numberOfElements: number;
  totalElements: number;
}

export interface SearchContable {
  date: string;
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class CierresContablesServiceService {
  private readonly allActionsUri = environment.const_serverUrl + '/adif/contables';
  private readonly searchUri = environment.const_serverUrl + '/adif/contables/search';
  userSelection: CierresContables;
  constructor(
    private http: HttpClient
  ) { }

  userSelectedRow(row) {
    this.userSelection = row;
  }

  getUserSelection() {
    return this.userSelection;
  }

  findAll(pageQuery: PageQuery): Observable<ContablesContent> {
    return this.http.get<ContablesContent>(this.allActionsUri + '/' + pageQuery.pageIndex + '/' + pageQuery.pageSize);
  }

  update(data: CierresContables): Observable<CierresContables> {
    return this.http.put<CierresContables>(this.allActionsUri, {
      periodo: data.periodo,
      fecha_cierre: data.fecha_cierre
    });
  }

  add(data: CierresContables): Observable<CierresContables> {
    return this.http.post<CierresContables>(this.allActionsUri, {
      periodo: data.periodo,
      fecha_cierre: data.fecha_cierre
    });
  }

  delete(data: CierresContables): Observable<any> {
    return this.http.delete(this.allActionsUri + '/' + data.tstamp);
  }

  searchWithDate(data: SearchContable): Observable<ContablesContent> {
    return this.http.post<ContablesContent>(this.searchUri, data);
  }

}

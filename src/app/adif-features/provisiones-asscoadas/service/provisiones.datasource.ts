import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { CierresContables } from '../../cierres-contables/cierres-contables-services/cierres-contables-service.service';
import { ProvisionesContent, ProvisionesAsscodas, ResponseProvisionesAsscodas } from './provisiones-asscoadas.service';

export class ProvisionesDatasource implements DataSource<any> {
    private provisionesSubject = new BehaviorSubject<ResponseProvisionesAsscodas[]>([]);

    loadProvisionesData(data: ResponseProvisionesAsscodas[]) {
      this.provisionesSubject.next(data);
    }

    searchProvisionesData(data) {
        this.provisionesSubject.next(data);
    }

    getProvisionesData(): Observable<ResponseProvisionesAsscodas[]> {
        return this.provisionesSubject.asObservable();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.provisionesSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.provisionesSubject.complete();
    }
}

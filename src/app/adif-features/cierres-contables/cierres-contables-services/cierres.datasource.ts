import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { CierresContables } from './cierres-contables-service.service';

export class CierresDatasource implements DataSource<any> {
    private cirresSubject = new BehaviorSubject<CierresContables[]>([]);
    loadCirresData(data: CierresContables[]) {
        this.cirresSubject.next(data);
    }

    searchCirresData(data) {
        this.cirresSubject.next(data);
    }

    getCirresData(): Observable<CierresContables[]> {
        return this.cirresSubject.asObservable();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.cirresSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.cirresSubject.complete();
    }
}

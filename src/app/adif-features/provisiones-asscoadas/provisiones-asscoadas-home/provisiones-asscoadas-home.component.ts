import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, distinctUntilChanged, debounceTime, tap, switchMap } from 'rxjs/internal/operators';
import { ProvisionesDatasource } from '../service/provisiones.datasource';
import { ProvisionesAsscoadasService,
        SearchProvisiones,
        ProvisionesContent,
        ProvisionesAsscodas,
        ResponseProvisionesAsscodas,
        SearchProvisionesContent} from '../service/provisiones-asscoadas.service';
import { DataTableComponent, PageQuery } from '../../../shared/adif-data-table/data-table/data-table.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../shared/notification/notification.service';
import { TranslationES } from '../../../shared/translation/translate_es';
import { CierresContablesServiceService,
        CierresContables } from '../../cierres-contables/cierres-contables-services/cierres-contables-service.service';
import * as grpcWeb from 'grpc-web';

@Component({
  selector: 'adif-provisiones-asscoadas-home',
  templateUrl: './provisiones-asscoadas-home.component.html',
  styleUrls: ['./provisiones-asscoadas-home.component.scss']
})
export class ProvisionesAsscoadasHomeComponent implements OnInit {
  private readonly debounceTimeInMillis = 300;
  dataSourceSelected = false;
  private periodo: Params;
  private initialPage: PageQuery = {
    pageIndex: 0, pageSize: 5
  };
  private unsubscribe = new Subject();
  datalength: number;
  provisionesSearch;
  provisionesSearchForm: FormGroup;
  @ViewChild(DataTableComponent) dataTab: DataTableComponent;
  dataTableSource: Observable<ResponseProvisionesAsscodas[]>;
  dataSource: ProvisionesDatasource;
  loading = false;
  columnsToDisplay = ['radio', 'codigo', 'cod_sociedad'];
  columnsParams = {codigo: 'Codigo Sap Expediente', cod_sociedad: 'Cod Sociedad'};
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private provisionesAsscoadasService: ProvisionesAsscoadasService,
    private notificationService: NotificationService,
    private cierresContablesServiceService: CierresContablesServiceService
  ) {
    this.route.queryParams.subscribe(queryParams => this.periodo = queryParams);
    this.provisionesSearchForm = formBuilder.group({
      provisionesSearch: ''
    });
    this.provisionesSearch = this.provisionesSearchForm.get('provisionesSearch');
    this.provisionesSearch.valueChanges
    .pipe(
        takeUntil(this.unsubscribe),
        debounceTime(this.debounceTimeInMillis),
        distinctUntilChanged(),
        switchMap(searchValue => {
          this.loading = true;
          return this.search({
            codigo: searchValue.toString(),
            page: this.dataTab.paginator.pageIndex,
            size: this.dataTab.paginator.pageSize,
            timestamp: this.periodo['periodo']
          });
        })
      )
      .subscribe((data: SearchProvisionesContent) => {
        this.dataTab.paginator.firstPage();
        this.dataSource.loadProvisionesData(data.content);
        this.datalength = data.totalElements;
        this.loading = false;
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.notificationService.setNotification(TranslationES.provisiones_contable.sorryForIncovinience);
      });
  }

  ngOnInit() {
    this.dataSource = new ProvisionesDatasource();
    this.loading = true;
    this.addAllDataToSource(this.initialPage, false);
  }

  addAllDataToSource(page: PageQuery, startsWithFirst: boolean) {
    this.provisionesAsscoadasService.listAll(this.periodo['periodo'], page)
    .subscribe((data: ProvisionesContent) => {
      if (data) {
        if (startsWithFirst) {
          this.dataTab.paginator.firstPage();
        }
        this.dataSource.loadProvisionesData(data.provision);
        this.datalength = data.totalElements;
        this.loading = false;
      }
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.notificationService.setNotification(TranslationES.provisiones_contable.sorryForIncovinience);
    });
    this.dataTableSource = this.dataSource.getProvisionesData();
  }

  requestPage(pageQuery: PageQuery) {
    this.loading = true;
    if (!this.provisionesSearch.value) {
      this.provisionesAsscoadasService.listAll(this.periodo['periodo'], pageQuery)
      .subscribe((data: ProvisionesContent) => {
        this.dataSource.loadProvisionesData(data.provision);
        this.loading = false;
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.notificationService.setNotification(TranslationES.provisiones_contable.sorryForIncovinience);
      });
    } else {
      this.provisionesAsscoadasService.searchWithDate({
        codigo: this.provisionesSearch.value,
        page: pageQuery.pageIndex,
        size: pageQuery.pageSize,
        timestamp: this.periodo['periodo']
      })
      .subscribe((data: SearchProvisionesContent) => {
        this.dataSource.loadProvisionesData(data.content);
        this.loading = false;
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.notificationService.setNotification(TranslationES.provisiones_contable.sorryForIncovinience);
      });
    }
  }

  private search(search: SearchProvisiones): Observable<SearchProvisionesContent> {
    return this.provisionesAsscoadasService.searchWithDate(search);
  }

  eventCaptured(event: boolean) {
    if (event) {
      this.dataSourceSelected = true;
    }
  }

  private pagable() {
    return {
      pageIndex: this.dataTab.paginator.pageIndex,
      pageSize: this.dataTab.paginator.pageSize
    };
  }

  nuevo() {
    this.router.navigate(['provisiones-asscoadas-actions'], {
      relativeTo: this.route, queryParams: { periodo: this.periodo['periodo'] },  queryParamsHandling: 'merge'
    });
  }

  delete() {
    if (this.dataTab) {
      this.loading = true;
      const selectRow: ResponseProvisionesAsscodas = this.dataTab.selectedRow;
      this.provisionesAsscoadasService.delete(selectRow)
      .subscribe(done => {
        this.addAllDataToSource(this.pagable(), false);
        this.notificationService.setNotification(TranslationES.provisiones_contable.delete);
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.notificationService.setNotification(TranslationES.provisiones_contable.sorryForIncovinience);
      }, () => this.dataSourceSelected = false);
    }
  }

  @HostListener('body:click', ['$event'])
  onclick(event) {
    const ele: HTMLElement = <HTMLElement> event.target;
    const eleClass = ele.parentElement.parentElement;
    if (eleClass && !eleClass.classList.contains('notificationMsg')) {
      this.notificationService.setNotification(null);
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.notificationService.setNotification(null);
  }
}

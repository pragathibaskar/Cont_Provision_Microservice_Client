import { Component, OnInit, ViewChild, OnDestroy, HostListener} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription, fromEvent } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, distinctUntilChanged, debounceTime, tap, map, switchMap } from 'rxjs/internal/operators';
import { CierresContablesServiceService,
        CierresContables,
        ContablesContent,
        SearchContable} from '../cierres-contables-services/cierres-contables-service.service';
import {CierresDatasource} from '../cierres-contables-services/cierres.datasource';
import { DataTableComponent, PageQuery } from '../../../shared/adif-data-table/data-table/data-table.component';
import { NotificationService } from '../../../shared/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslationES } from '../../../shared/translation/translate_es';

@Component({
  selector: 'adif-cierres-contables-home',
  templateUrl: './cierres-contables-home.component.html',
  styleUrls: ['./cierres-contables-home.component.scss']
})
export class CierresContablesHomeComponent implements OnInit, OnDestroy {
  private readonly debounceTimeInMillis = 400;
  private unsubscribe = new Subject();
  private initialPage: PageQuery = {
    pageIndex: 0, pageSize: 5
  };
  notificationMsg: string;
  datalength: number;
  cierresSearch;
  cierresSearchForm: FormGroup;
  @ViewChild(DataTableComponent) dataTab: DataTableComponent;
  dataSourceSelected = false;
  dataTableSource: Observable<CierresContables[]>;
  dataSource: CierresDatasource;
  loading = false;
  columnsToDisplay = ['radio', 'periodo', 'fecha_cierre'];
  columnsParams = {periodo: 'Periodo Certificacion', fecha_cierre: 'Fecha Cierre'};
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contablesServiceService: CierresContablesServiceService,
    private notificationService: NotificationService,
  ) {
    this.cierresSearchForm = formBuilder.group({
      cierresSearch: ''
    });
    this.cierresSearch = this.cierresSearchForm.get('cierresSearch');
    this.cierresSearch.valueChanges
    .pipe(
      takeUntil(this.unsubscribe),
      debounceTime(this.debounceTimeInMillis),
      distinctUntilChanged(),
      switchMap(searchValue => {
        this.loading = true;
        return this.search({
          date: searchValue.toString(),
          page: this.dataTab.paginator.pageIndex,
          size: this.dataTab.paginator.pageSize
        });
      })
    )
    .subscribe((data: ContablesContent) => {
      this.dataTab.paginator.firstPage();
      this.dataSource.loadCirresData(data.content);
      this.datalength = data.totalElements;
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.notificationService.setNotification(TranslationES.cierres_contable.sorryForIncovinience);
    });
  }

  ngOnInit() {
    this.dataSource = new CierresDatasource();
    this.loading = true;
    this.addAllDataToSource(this.initialPage, false);
  }

  resetTabbleGrid() {
    this.loading = true;
    this.addAllDataToSource(this.pagable(), true);
  }

  private search(search: SearchContable): Observable<ContablesContent> {
    return this.contablesServiceService.searchWithDate(search);
  }

  private pagable() {
    return {
      pageIndex: this.dataTab.paginator.pageIndex,
      pageSize: this.dataTab.paginator.pageSize
    };
  }

  addAllDataToSource(page: PageQuery, startsWithFirst: boolean) {
    this.contablesServiceService.findAll(page)
    .subscribe((data: ContablesContent) => {
      if (startsWithFirst) {
        this.dataTab.paginator.firstPage();
      }
      this.dataSource.loadCirresData(data.content);
      this.datalength = data.totalElements;
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.notificationService.setNotification(TranslationES.cierres_contable.error);
    });
    this.dataTableSource = this.dataSource.getCirresData();
  }

  edit() {
    if (this.dataTab) {
      const rowData: CierresContables = this.dataTab.selectedRow;
      this.contablesServiceService.userSelectedRow(rowData);
      this.router.navigate(['cierres-contable-edit', rowData.id], { relativeTo: this.route });
    }
  }

  delete() {
    if (this.dataTab) {
      this.loading = true;
      const rowData: CierresContables = this.dataTab.selectedRow;
      this.contablesServiceService.delete(rowData)
      .subscribe(done => {
        this.addAllDataToSource(this.pagable(), false);
        this.notificationService.setNotification(TranslationES.cierres_contable.delete);
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.notificationService.setNotification(TranslationES.cierres_contable.sorryForIncovinience);
      }, () => this.dataSourceSelected = false);
    }
  }

  provisiones() {
    if (this.dataTab) {
      const rowData: CierresContables = this.dataTab.selectedRow;
      this.contablesServiceService.userSelectedRow(rowData);
      this.router.navigate(['provisiones-asscoadas'],
        { relativeTo: this.route, queryParams: { periodo: rowData.tstamp },  queryParamsHandling: 'merge' }
      );
    }
  }

  eventCaptured(event: boolean) {
    if (event) {
      this.dataSourceSelected = true;
    }
  }

  requestPage(pageQuery: PageQuery) {
    this.loading = true;
    if (!this.cierresSearch.value) {
      this.contablesServiceService.findAll(pageQuery)
      .subscribe((data: ContablesContent) => {
        this.dataSource.loadCirresData(data.content);
        this.loading = false;
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.notificationService.setNotification(TranslationES.cierres_contable.sorryForIncovinience);
      });
    } else {
      this.contablesServiceService.searchWithDate({
        date: this.cierresSearch.value,
        page: pageQuery.pageIndex,
        size: pageQuery.pageSize
      })
      .subscribe((data: ContablesContent) => {
        this.dataSource.loadCirresData(data.content);
        this.loading = false;
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.notificationService.setNotification(TranslationES.cierres_contable.sorryForIncovinience);
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    // this.closeSocket();
  }

  @HostListener('body:click', ['$event'])
  onclick(event) {
    const ele: HTMLElement = <HTMLElement> event.target;
    const eleClass = ele.parentElement.parentElement;
    if (eleClass && !eleClass.classList.contains('notificationMsg')) {
      this.notificationService.setNotification(null);
    }
  }
}

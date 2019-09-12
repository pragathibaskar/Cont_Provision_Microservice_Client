import {tap, map} from 'rxjs/internal/operators';
import {Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs/internal/Observable';

export interface PageQuery {
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'adif-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @Input() datalength = 10;
  @Input() dataTableSource: Observable<any>[];
  @Input() displayedColumns: string[];
  @Input() columnsParams: string[];
  @Output() eventCaptured = new EventEmitter<boolean>();
  @Output() requestPage = new EventEmitter<PageQuery>();
  @Input() comp = '';
  selectedRow: any;
  dataSource: any;
  selection = new SelectionModel<any>(true, []);
  @Input() loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() {}

  ngOnInit() {
    this.dataSource = this.dataTableSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isSelectedRow(event, row, i) {
    this.selectedRow = row;
    Object.assign(this.selectedRow, {
      id: i
    });
    this.eventCaptured.emit(true);
  }

  private loadPage() {
    const newPage: PageQuery = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };
    this.requestPage.emit(newPage);
  }
}

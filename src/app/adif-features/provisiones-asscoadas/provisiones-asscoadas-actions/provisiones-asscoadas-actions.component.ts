import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { tap } from 'rxjs/internal/operators/tap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of } from 'rxjs/internal/observable/of';
import { AdifValidators } from '../../../shared/validation/adif-validators';
import { ProvisionesAsscoadasService, Budget, ProvisionesAsscodas } from '../service/provisiones-asscoadas.service';
import { map } from 'rxjs/internal/operators/map';
import { PageQuery } from '../../../shared/adif-data-table/data-table/data-table.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import { catchError, finalize, filter } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../shared/notification/notification.service';
import { TranslationES } from '../../../shared/translation/translate_es';
import { Location } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface CodigoSapExpediente {
  codigo_sap_expediente: string;
  cod_sociedad: string;
}

function controlValueIsLocationSelected(value: any) {
  return value && typeof value !== 'string';
}

export interface ProvisionesDate {
  date: string;
  value: string;
}

@Component({
  selector: 'adif-provisiones-asscoadas-actions',
  templateUrl: './provisiones-asscoadas-actions.component.html',
  styleUrls: ['./provisiones-asscoadas-actions.component.scss']
})
export class ProvisionesAsscoadasActionsComponent implements OnInit {
  private periodo: Params;
  description: string;
  budgetActionForm: FormGroup;
  codigo_sap_expediente;
  cod_sociedad;
  whileLoading = false;
  private readonly debounceTimeInMillis = 300;
  private readonly maxNumberOfResults = 3;
  matcher = new MyErrorStateMatcher();
  matchingCodigos$: Observable<any[]>;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private provisionesAsscoadasService: ProvisionesAsscoadasService,
    private location: Location
  ) {
    this.route.queryParams.subscribe(queryParams => this.periodo = queryParams);
    this.budgetActionForm = formBuilder.group({
      codigo_sap_expediente: ['', [Validators.required, AdifValidators.forbiddenValue]],
      cod_sociedad: [{value: '', disabled: true}]
    });
    this.codigo_sap_expediente = this.budgetActionForm.get('codigo_sap_expediente');
    this.cod_sociedad = this.budgetActionForm.get('cod_sociedad');
    this.matchingCodigos$ = this.codigo_sap_expediente.valueChanges.pipe(
      debounceTime(this.debounceTimeInMillis),
      distinctUntilChanged(),
      filter(val => val !== ''),
      switchMap((value: any) => controlValueIsLocationSelected(value) ? of([value]) : this.searchFn(value as string))
    );
   }

  ngOnInit() {
    this.description = this.route.snapshot.data['desc'];
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.budgetActionForm.controls[controlName].hasError(errorName);
  }

  budgetActionFormSubmit() {
    if (this.budgetActionForm.valid) {
      this.provisionesAsscoadasService.save({
        codigo_sap_expediente: this.codigo_sap_expediente.value.codigo_sap_expediente,
        cod_sociedad: this.codigo_sap_expediente.value.cod_sociedad,
        timestamp: this.periodo['periodo']
      }).subscribe(d => {
        this.notificationService.setNotification(TranslationES.provisiones_contable.success);
        this.previousState();
      }, (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.notificationService.setNotification(TranslationES.provisiones_contable.error);
          this.previousState();
        } else {
          this.notificationService.setNotification(TranslationES.provisiones_contable.serviceUnAvailable);
          this.previousState();
        }
      });
    }
  }

  searchFn(term: string): Observable<Budget[]> {
      this.whileLoading = true;
      return this.provisionesAsscoadasService.searchCodigo(term)
              .pipe(
                catchError(err => {
                  return throwError(err);
                }),
                map((values: Budget[]) => {
                  return term ? values.filter(val => val.codigo_sap_expediente.toLowerCase().includes(term.toLowerCase())) : null;
                }),
                finalize(() => {
                  this.whileLoading = false;
                })
              );
    }

  displayFn = (budgetDate: Budget) => {
    let budget = '';
    if (budgetDate && budgetDate.codigo_sap_expediente) {
      budget = budgetDate.codigo_sap_expediente;
    }
    return budget;
  }

  codigoFn(budgetData: Budget) {
    this.cod_sociedad.setValue(budgetData.cod_sociedad);
  }

  private getDefaultProvisionesData<T>(provisionesData: T[]): T[] {
    return provisionesData.slice(0, Math.min(provisionesData.length, this.maxNumberOfResults));
  }

  previousState() {
    this.router.navigate(['/provisiones-asscoadas'], {
      relativeTo: this.route, queryParams: { periodo: this.periodo['periodo'] },  queryParamsHandling: 'merge'
    });
  }

}

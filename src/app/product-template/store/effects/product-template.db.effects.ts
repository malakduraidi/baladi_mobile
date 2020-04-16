import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { Observable, from, of } from "rxjs";

import * as ProductTemplateActions from "../actions";

import { map, switchMap, catchError } from "rxjs/operators";
import { IProductTemplate} from "../../models/product-template";
import { ProductTemplateTable } from 'src/providers/db/tables/product-template.table';

@Injectable()
export class ProductTemplateDBEffects {
  constructor(private actions$: Actions, private table:ProductTemplateTable) { }

  @Effect()
  deleteDB$ = this.actions$.pipe(
    ofType(ProductTemplateActions.ProductTemplateDBActionsType.DELETE_DB),
    switchMap((productTemplate:ProductTemplateActions.DeleteDB) => {
    return from(
      this.table.delete(productTemplate.payload)
    ).pipe(
      map((data: IProductTemplate) => {
        return new ProductTemplateActions.DeleteDBSuccess(data);
  }),
    catchError(error =>
      of(new ProductTemplateActions.DeleteDBFail(error))
    )
      );
})
  );




@Effect()
getProductTemplates$ = this.actions$.pipe(
  ofType(ProductTemplateActions.ProductTemplateDBActionsType.LOAD_DB),
  switchMap((productTemplate:ProductTemplateActions.LoadDB) => {
  return this.table.getAll().pipe(
    map((data: IProductTemplate[]) => {
      return new ProductTemplateActions.LoadDBSuccess(data);
}),
  catchError(error => of(new ProductTemplateActions.LoadDBFail(error)))
      );
    })
  );

@Effect()
DropProductTemplateTable$ = this.actions$.pipe(
  ofType(ProductTemplateActions.ProductTemplateDBActionsType.DROP_TABLE),
  switchMap((delete_table:ProductTemplateActions.DropTable) => {
  return from(this.table.drop()).pipe(
    map(delete_table => {
      return new ProductTemplateActions.NewTable();
    }),
    catchError(error =>
      of(new ProductTemplateActions.DropTableFail(error))
    )
  );
})
  );

@Effect()
NewProductTemplateTable$ = this.actions$.pipe(
  ofType(ProductTemplateActions.ProductTemplateDBActionsType.NEW_TABLE),
  switchMap((delete_table:ProductTemplateActions.NewTable) => {
  return from(this.table.create()).pipe(
    map(new_table => {
      return new ProductTemplateActions.NewTableSuccess(new_table);
    }),
    catchError(error =>
      of(new ProductTemplateActions.NewTableFail(error))
    )
  );
})
  );
}

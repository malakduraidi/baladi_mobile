import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { Observable, from, of } from "rxjs";

import * as ProductCategoryActions from "../actions";

import { map, switchMap, catchError } from "rxjs/operators";
import { IProductCategory} from "../../models/product-category";
import { ProductCategoryTable } from 'src/providers/db/tables/product-category.table';

@Injectable()
export class ProductCategoryDBEffects {
  constructor(private actions$: Actions, private table:ProductCategoryTable) { }

  @Effect()
  deleteDB$ = this.actions$.pipe(
    ofType(ProductCategoryActions.ProductCategoryDBActionsType.DELETE_DB),
    switchMap((productCategory:ProductCategoryActions.DeleteDB) => {
    return from(
      this.table.delete(productCategory.payload)
    ).pipe(
      map((data: IProductCategory) => {
        return new ProductCategoryActions.DeleteDBSuccess(data);
  }),
    catchError(error =>
      of(new ProductCategoryActions.DeleteDBFail(error))
    )
      );
})
  );




@Effect()
getProductCategorys$ = this.actions$.pipe(
  ofType(ProductCategoryActions.ProductCategoryDBActionsType.LOAD_DB),
  switchMap((productCategory:ProductCategoryActions.LoadDB) => {
  return this.table.getAll().pipe(
    map((data: IProductCategory[]) => {
 
      return new ProductCategoryActions.LoadDBSuccess(data);
}),
  catchError(error =>
    {
      
    return of(new ProductCategoryActions.LoadDBFail(error))
    }
    
    )
      );
    })
  );

@Effect()
DropProductCategoryTable$ = this.actions$.pipe(
  ofType(ProductCategoryActions.ProductCategoryDBActionsType.DROP_TABLE),
  switchMap((delete_table:ProductCategoryActions.DropTable) => {
  return from(this.table.drop()).pipe(
    map(delete_table => {
      return new ProductCategoryActions.NewTable();
    }),
    catchError(error =>
      of(new ProductCategoryActions.DropTableFail(error))
    )
  );
})
  );

@Effect()
NewProductCategoryTable$ = this.actions$.pipe(
  ofType(ProductCategoryActions.ProductCategoryDBActionsType.NEW_TABLE),
  switchMap((delete_table:ProductCategoryActions.NewTable) => {
  return from(this.table.create()).pipe(
    map(new_table => {
      return new ProductCategoryActions.NewTableSuccess(new_table);
    }),
    catchError(error =>
      of(new ProductCategoryActions.NewTableFail(error))
    )
  );
})
  );
}

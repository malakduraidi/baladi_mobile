import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { Observable, from, of } from "rxjs";

import * as ProductMainSliderActions from "../actions";

import { map, switchMap, catchError } from "rxjs/operators";
import { IProductMainSlider} from "../../models/product-main-slider";
import { ProductMainSliderTable } from 'src/providers/db/tables/product-main-slider.table';

@Injectable()
export class ProductMainSliderDBEffects {
  constructor(private actions$: Actions, private table:ProductMainSliderTable) { }

  @Effect()
  deleteDB$ = this.actions$.pipe(
    ofType(ProductMainSliderActions.ProductMainSliderDBActionsType.DELETE_DB),
    switchMap((productMainSlider:ProductMainSliderActions.DeleteDB) => {
    return from(
      this.table.delete(productMainSlider.payload)
    ).pipe(
      map((data: IProductMainSlider) => {
        return new ProductMainSliderActions.DeleteDBSuccess(data);
  }),
    catchError(error =>
      of(new ProductMainSliderActions.DeleteDBFail(error))
    )
      );
})
  );




@Effect()
getProductMainSliders$ = this.actions$.pipe(
  ofType(ProductMainSliderActions.ProductMainSliderDBActionsType.LOAD_DB),
  switchMap((productMainSlider:ProductMainSliderActions.LoadDB) => {
  return this.table.getAll().pipe(
    map((data: IProductMainSlider[]) => {
      return new ProductMainSliderActions.LoadDBSuccess(data);
}),
  catchError(error => of(new ProductMainSliderActions.LoadDBFail(error)))
      );
    })
  );

@Effect()
DropProductMainSliderTable$ = this.actions$.pipe(
  ofType(ProductMainSliderActions.ProductMainSliderDBActionsType.DROP_TABLE),
  switchMap((delete_table:ProductMainSliderActions.DropTable) => {
  return from(this.table.drop()).pipe(
    map(delete_table => {
      return new ProductMainSliderActions.NewTable();
    }),
    catchError(error =>
      of(new ProductMainSliderActions.DropTableFail(error))
    )
  );
})
  );

@Effect()
NewProductMainSliderTable$ = this.actions$.pipe(
  ofType(ProductMainSliderActions.ProductMainSliderDBActionsType.NEW_TABLE),
  switchMap((delete_table:ProductMainSliderActions.NewTable) => {
  return from(this.table.create()).pipe(
    map(new_table => {
      return new ProductMainSliderActions.NewTableSuccess(new_table);
    }),
    catchError(error =>
      of(new ProductMainSliderActions.NewTableFail(error))
    )
  );
})
  );
}

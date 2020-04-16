import { Action } from '@ngrx/store';
import { IError } from '../../model';

// HTTP CRUD

//  CRUD
export enum ErrorActionsType {
  ADD = '[Error] Add',
  CLEAR_USER_TYPE_ERROR = '[Error] Clear User Type Error'
}

export class ADD implements Action {
  readonly type = ErrorActionsType.ADD;
  constructor(public payload: IError) {}
}
export class ClearUserTypeError implements Action {
  readonly type = ErrorActionsType.CLEAR_USER_TYPE_ERROR;
  constructor() {}
}

export type ErrorActions = ADD | ClearUserTypeError;

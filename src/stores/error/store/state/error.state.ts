import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { EntityAdapter } from '@ngrx/entity/src/models';
import { IError } from '../../model';

export interface ErrorState extends EntityState<IError> {
  loading: boolean;
  uploading: boolean;
  offset: number;
  limit: number;
  dataLength: number;
}

export const errorAdapter: EntityAdapter<IError> = createEntityAdapter<
  IError
>();

export const initialState: ErrorState = errorAdapter.getInitialState({
  uploading: false,
  loading: false,
  offset: 0,
  dataLength: 0,
  limit: 10
});

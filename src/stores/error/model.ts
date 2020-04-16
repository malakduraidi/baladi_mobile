export interface IError {
  id: string;
  message: string;
  // any dumb message from server
  payload: string;
  type: string;
  model: string;
  repeated: number;
}

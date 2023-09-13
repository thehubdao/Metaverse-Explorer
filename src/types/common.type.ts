type ResultSuccessful<T> = {
  success: true;
  value: T
}

type ResultFail = {
  success: false;
  errMessage: string;
}

export type Result<T> = ResultSuccessful<T> | ResultFail;
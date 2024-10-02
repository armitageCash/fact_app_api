export type usecaseResult = {
  status: String | "success" | "error";
  message: String;
  data: any;
};

export type Adapter = {
  fn: void;
  result: usecaseResult;
};

export enum usecaseStatus {
  Success = "success",
  Failed = "failed",
}

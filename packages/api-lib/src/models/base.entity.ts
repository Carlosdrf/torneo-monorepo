export interface BaseModel {
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseData<T> {
  data: T | undefined;
  error?: string;
}

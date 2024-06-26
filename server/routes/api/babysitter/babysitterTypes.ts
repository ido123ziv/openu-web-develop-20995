export type Validation = {
  isValid: boolean;
  message?: string;
};

export type interactionsData = {
  totalCount: number;
  contacted: number;
  workedWith: number;
};

export type babysitterImageResponse = {
  imageUrl: string,
  responseCode: number
}
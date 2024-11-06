export interface TransactionInput {
  type: string;
  description: string;
  amount: number;
  date: string;
}

export interface DeleteTransactionResponse {
  status: string;
  message?: string;
  data: undefined;
}

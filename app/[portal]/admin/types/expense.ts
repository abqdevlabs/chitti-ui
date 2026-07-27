export interface Category {
  id: string;
  name: string;
}

export interface ToList {
  id: string;
  name: string;
}
export interface Expense {
  id: string;
  categoryId: string;
  category: string;
  description: string | null;
  upi: number;
  cash: number;
  createdAt: string | Date;
  to?: string;
  toId?: string;
}

export interface CreateExpense {
  categoryId: string;
  description: string | null;
  upi: number;
  cash: number;
  toId?: string;
  to?: string;
}

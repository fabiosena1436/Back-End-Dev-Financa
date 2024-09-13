import { date } from 'zod';
import { Category } from './category.entity';

export enum TrasactionType {
    INCOME = 'income',
    EXPENSE = 'expensse'
}
type TransactionsProps = {
    _id?: string
    amount: number
    date: Date
    category: Category
    type: TrasactionType
}

export class Trasaction {
    public _id?: string
    public amount: number
    public date: Date
    public category: Category
    public type: TrasactionType

    constructor({_id, type, date, amount, category}:TransactionsProps) {
    this._id = _id
    this.amount = amount
    this.date = date
    this.category = category
    this.type = type
}
}
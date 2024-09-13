

import { Transaction } from '../../entities/trasations.entity';
import { Transactionmodel } from './../schemas/trasactions.schema';


export class TransactionRepository {
  constructor(private model: typeof Transactionmodel) { }

  async create({ title, date, amount, type, category }: Transaction): Promise<Transaction> {
    const createdTransaction = await this.model.create({});

    return createdTransaction.toObject<Transaction>();
  }

  async index(): Promise<Transaction[]> {
    const transactions = await this.model.find()

    const transactionsMap = transactions.map((item) => item.toObject<Transaction>())

    return transactionsMap
  }
}

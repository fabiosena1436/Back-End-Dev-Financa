import { GetDashBoarDTO, indexTransactionsDTO } from './../../dtos/trasactions.dto';

import { Transaction } from '../../entities/trasations.entity';
import { TransactionModel } from './../schemas/trasactions.schema';
import { Balance } from '../../entities/balance.entuty';


export class TransactionRepository {
  constructor(private model: typeof TransactionModel) { }

  async create({ title, date, amount, type, category }: Transaction): Promise<Transaction> {
    const createdTransaction = await this.model.create({});

    return createdTransaction.toObject<Transaction>();
  }

  async index({
    title,
    categoryId,
    beginDate,
    endDate
  }: indexTransactionsDTO): Promise<Transaction[]> {
    const whwreParams: Record<string, unknown> = {
      ...(title && { title: { $regex: title, $options: 'i' } }),
      ...(categoryId && { 'category._id': categoryId })
    }

    if (beginDate || endDate) {
      whwreParams.date = {
        ...(beginDate && { $gte: beginDate }),
        ...(endDate && { $lte: endDate }),
      }
    }

    const transactions = await this.model.find(whwreParams)

    const transactionsMap = transactions.map((item) => item.toObject<Transaction>())

    return transactionsMap
  }

  async getBalance({ beginDate, endDate }: GetDashBoarDTO): Promise<Balance> {
    const [result] = await this.model.aggregate<Balance>().match({
      date: {
        $gte: beginDate,
        $lte: endDate
      }
    }).project({
      _id: 0,
      income: {
        $cond: [
          {
            $eq: ['$type', 'income'],

          },
          '$amount',
          0,
        ],
      },
      expense: {
        $cond: [
          {
            $eq: ['$type', 'expense'],
          },
          '$amount',
          0,
        ],
      },
    }).group({
      _id: null,
      incomes: {
        $sum: '$expense',
      },
    }).addFields({
      balance: {
        $subtract: ['$incomes', 'expense']
      }
    })
    return result
  }
}

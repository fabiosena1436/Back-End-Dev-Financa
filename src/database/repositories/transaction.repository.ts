import { TransactionType } from './../../entities/trasations.entity';
import { Expense } from './../../entities/expense.entiy';
import { GetDashBoarDTO, indexTransactionsDTO, GetFinancialEvolutionDTO } from './../../dtos/trasactions.dto';

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

    const transactions = await this.model.find(whwreParams, undefined, {
      sort: {
        date: -1,
      }
    })

    const transactionsMap = transactions.map((item) =>
      item.toObject<Transaction>()
    )

    return transactionsMap
  }

  async getBalance({ beginDate, endDate }: GetDashBoarDTO): Promise<Balance> {
    const agregate = this.model.aggregate<Balance>()

    if (beginDate || endDate) {
      agregate.match({
        date: {
          ...(beginDate && { $gte: beginDate }),
          ...(endDate && { $lte: endDate }),
        }
      })
    }

    const [result] = await agregate

      .project({
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

  async getExpense({
    beginDate,
    endDate
  }: GetDashBoarDTO): Promise<Expense[]> {
    const aggregate = this.model.aggregate<Expense>()
    const matchParams: Record<string, unknown> = {
      type: TransactionType.EXPENSE,
    }

    if (beginDate || endDate) {

      matchParams.date = {

        ...(beginDate && { $gte: beginDate }),
        ...(endDate && { $lte: endDate }),

      }

    }

    const result = await aggregate.match(matchParams).group({
      _id: '$category._id',
      title: {
        $first: '$category.title'
      },
      color: {
        $first: '$category.color',
      },
      amount: {
        $sum: '$amount',
      }
    })
    return result
  }

  async getFinancialEvolution({ year }: GetFinancialEvolutionDTO): Promise<Balance[]> {
    const agregate = this.model.aggregate<Balance>()


    const result = await agregate
      .match({
        date: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        }
      })
      .project({
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

        year: {
          $year: '$date'
        },
        month: {
          $month: '$date'
        }

      }).group({
        _id: ['$year', '$month'],
        incomes: {
          $sum: '$expense',
        },
      }).addFields({
        balance: {
          $subtract: ['$incomes', 'expense']
        }
      })

      .sort({
        _id: 1,
      })
    return result
  }
}

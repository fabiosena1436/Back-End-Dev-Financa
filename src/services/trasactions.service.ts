import { indexTransactionsDTO, getDashboardS, GetDashBoarDTO } from './../dtos/trasactions.dto';

import { CategoriesRepository } from './../database/repositories/categories.repository';
import { CreateTransactionDTO } from '../dtos/trasactions.dto';
import { TransactionRepository } from './../database/repositories/transaction.repository';

import { Transaction } from './../entities/trasations.entity';
import { AppError } from '../errors/app.errors';
import { StatusCodes } from 'http-status-codes';
import { Balance } from '../entities/balance.entuty';


export class TransactionsService {
    constructor(
        private transactionsRepository: TransactionRepository,
        private categoriesRepository: CategoriesRepository,
    ) { }

    async create({
        title,
        type,
        date,
        categoryId,
        amount,
    }: CreateTransactionDTO): Promise<Transaction> {
        const category = await this.categoriesRepository.findById(categoryId)

        if (!category) {
            throw new AppError('Category does not exists.', StatusCodes.NOT_FOUND)
        }

        const transaction = new Transaction({
            title,
            type,
            date,
            category,
            amount,
        })

        const createdTransaction =
            await this.transactionsRepository.create(transaction)

        return createdTransaction
    }
    async index({ }): Promise<Transaction[]> {
        const transactions = await this.transactionsRepository.index({})

        return transactions
    }

    async getDashboard({ beginDate, endDate }: GetDashBoarDTO) {
        let balance = await this.transactionsRepository.getBalance({
            beginDate,
            endDate,
        })

        if (!balance) {
            balance = new Balance({
                _id: null,
                incomes: 0,
                expenses: 0,
                balance: 0,
            })
        }
    }
}
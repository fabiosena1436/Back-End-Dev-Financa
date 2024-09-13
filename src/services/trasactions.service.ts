import { CategoriesRepository } from './../database/repositories/categories.repository';
import { CreateTransactionDTO } from '../dtos/trasactions.dto';
import { TransactionRepository } from './../database/repositories/transaction.repository';

import { Transaction } from './../entities/trasations.entity';
import { AppError } from '../errors/app.errors';
import { StatusCodes } from 'http-status-codes';


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

        if(!category){
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
}
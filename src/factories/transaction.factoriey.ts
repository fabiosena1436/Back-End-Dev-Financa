import { CategoriesRepository } from './../database/repositories/categories.repository';

import { TransactionModel } from './../database/schemas/trasactions.schema';
import { TransactionRepository } from "../database/repositories/transaction.repository"
import { TransactionsService } from "../services/trasactions.service"
import { CategoryModel } from '../database/schemas/category.schema';




export class TransactionsFactory {
    private static transactionsSevice: TransactionsService

    static getServiceInstance() {
        if (this.transactionsSevice) {
            return this.transactionsSevice
        }

        const repository = new TransactionRepository(TransactionModel)
        const categoryRepository = new CategoriesRepository(CategoryModel)
        const service = new TransactionsService(repository, categoryRepository)

        this.transactionsSevice = service

        return service
    }
}
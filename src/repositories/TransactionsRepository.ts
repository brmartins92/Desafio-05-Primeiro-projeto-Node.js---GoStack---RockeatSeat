import Transaction from '../models/Transaction';


interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionInterface {
  title : string,
  value : number,
  type : 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];
  
  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const {income,outcome,total} = this.transactions.reduce((accumulator: Balance,transaction: Transaction) =>  {
      
      if(transaction.type=="income"){
        accumulator.income += transaction.value;
        accumulator.total += transaction.value;
      }else{
        accumulator.outcome += transaction.value;
        accumulator.total -= transaction.value;
      }
      return accumulator
    },
    {
      income: 0,
      outcome: 0,
      total: 0
    })
   

    return {income,outcome,total};
  }

  public create({title,value,type}: TransactionInterface ) : Transaction {
    const transaction = new Transaction({ title,value,type });
    this.transactions.push(transaction);
    return transaction;

    // TODO
  }
}

export default TransactionsRepository;

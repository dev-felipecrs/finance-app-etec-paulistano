import { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { FiArrowDownCircle, FiArrowUpCircle, FiDollarSign } from 'react-icons/fi'

import { Card } from './components/card'
import { Transaction } from './types/transaction'
import { formatDate, formatPrice } from './lib/utils'
import { NewTransactionDialog } from './components/new-transaction-dialog'

import { Button } from './components/ui/button'
import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from './components/ui/table'
import {
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from './components/ui/dropdown-menu'

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const storagedTransactions = localStorage.getItem('@finance.app:transactions')

    if (!storagedTransactions) return []

    return JSON.parse(storagedTransactions)
  })

  const incomeValue = transactions.reduce((acc, transaction) => {
    return transaction.type === 'income' ? acc + transaction.value : acc
  }, 0)

  const outcomeValue = transactions.reduce((acc, transaction) => {
    return transaction.type === 'outcome' ? acc + transaction.value : acc
  }, 0)

  const balance = incomeValue - outcomeValue

  const handleTransactionCreation = (transaction: Transaction) => {
    const transactionsToSave = [transaction, ...transactions]

    localStorage.setItem(
      '@finance.app:transactions', 
      JSON.stringify(transactionsToSave)
    )
    setTransactions(transactionsToSave)
  }

  return (
    <>
      <header className='bg-[#5429cc]'>
        <div className='max-w-6xl mx-auto pt-8 px-4 pb-48 flex items-center justify-between'>
          <span className='block text-xl font-bold text-white'>finance.app</span>

          <NewTransactionDialog
            onCreateTransaction={handleTransactionCreation}
          />
        </div>
      </header>

      <main className='max-w-6xl mx-auto px-4 py-10'>
        <div className='grid grid-cols-3 gap-8 mt-[-10rem]'>
          <Card
            title='Entradas' 
            icon={<FiArrowUpCircle className='h-5 w-5 text-green-500' />}
            value={formatPrice(incomeValue)}
            variant='basic'
          />

          <Card
            title='Saídas' 
            icon={<FiArrowDownCircle className='h-5 w-5 text-red-500' />}
            value={'- ' + formatPrice(outcomeValue)}
            variant='basic'
          />

          <Card
            title='Saldo' 
            icon={<FiDollarSign className='h-5 w-5 text-white' />}
            value={formatPrice(balance)}
            variant='highlighted'
          />
        </div>

        <div className='mt-16 w-full'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.value}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                        >
                          <DotsHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  )
}

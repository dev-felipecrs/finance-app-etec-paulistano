import { FormEvent, useState } from "react";

import { Transaction, TransactionType } from "@/types/transaction";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "./ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "./ui/dialog";

interface NewTransactionDialogProps {
  onCreateTransaction(transaction: Transaction): void
}

export function NewTransactionDialog({
  onCreateTransaction
}: NewTransactionDialogProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [value, setValue] = useState<number>()
  const [type, setType] = useState<TransactionType>()
  const [category, setCategory] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (title && value && type && category) {
      onCreateTransaction({
        title,
        value,
        type,
        category,
        createdAt: new Date()
      })
    }

    setDialogIsOpen(false)
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger>
        <Button
          className='bg-[#6933ff] w-44 h-12 hover:bg-[#6933ff] hover:brightness-90'
        >
          Nova transação
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar transação</DialogTitle>
          <DialogDescription>
            Adicione uma nova transação para organizar as suas finanças
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Netflix"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Valor</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="49.99"
                  value={value}
                  onChange={e => setValue(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transaction-type">Tipo da transação</Label>
                <Select
                  onValueChange={value => setType(value as TransactionType)}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Tipo da transação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='income'>
                      Entrada
                    </SelectItem>

                    <SelectItem value='outcome'>
                      Saída
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  placeholder="Entretenimento"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogIsOpen(false)}
            >
              Cancelar
            </Button>

            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
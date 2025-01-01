import { getUsers } from '@/api/users'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns, Payment } from '../customers/columns'
import { DataTable } from '@/components/data-table/DataTable'

type Props = {}

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}



export default async function UsersPage({ }: Props) {

  const response = await getUsers();

  const data = await getData()

  console.log(response)

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Mon equipe</h2>
        <div>
          <Button asChild variant={'ghost'}>
            <Link href="#">
              <PlusCircle className='w-4 h-4' />
              Ajouter un utilisateur</Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
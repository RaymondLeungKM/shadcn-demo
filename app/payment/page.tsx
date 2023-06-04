import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 101,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 102,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 103,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 104,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 105,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 106,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 107,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 108,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 109,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 110,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 111,
      status: "pending",
      email: "m@example.com",
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

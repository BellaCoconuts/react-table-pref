import React from 'react'
import { v4 } from 'uuid'
import { Table } from './components/table/table'
const text = ['🥥', '💩', '👌']

const item = () => ({
  id: v4(),
  date: new Date(),
  amount: Math.floor(Math.random() * 1000) + 1,
  description: text[Math.floor(Math.random() * text.length)]
})

const createItems = amount => {
  const array = []
  for (let i = 0; i < amount; i++) array.push(item())
  return array
}

const items = [...createItems(6000)]

function App() {
  return (
    <div className="App">
      <Table items={items} />
    </div>
  )
}

export default App

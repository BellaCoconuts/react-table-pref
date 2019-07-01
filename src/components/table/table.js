import React, { useState } from 'react'
import moment from 'moment'
import { Button } from '@material-ui/core'

export const Table = React.memo(({ items }) => {
  const [sortDir, setSortDir] = useState('')
  const [currentSort, setCurrentSort] = useState('')

  const handleClick = id => {
    if (currentSort !== id) {
      setCurrentSort(id)
      setSortDir('desc')
      return
    }
    setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
  }

  const ascendingOrder = (a, b) => (a > b ? 1 : b > a ? -1 : 0)
  const descendingOrder = (a, b) => (a > b ? -1 : b > a ? 1 : 0)

  const sortedItems = () =>
    items.sort((a, b) =>
      sortDir === 'asc'
        ? ascendingOrder(a[currentSort], b[currentSort])
        : descendingOrder(a[currentSort], b[currentSort])
    )

  return (
    <>
      <div style={{ borderBottom: '1px solid #000' }}>
        <TableHeader
          currentSort={currentSort}
          sortDir={sortDir}
          headerText="Date"
          headerId="date"
          onClick={handleClick}
        />
        <TableHeader
          currentSort={currentSort}
          sortDir={sortDir}
          headerText="Amount"
          headerId="amount"
          onClick={handleClick}
        />
        <TableHeader
          currentSort={currentSort}
          sortDir={sortDir}
          headerText="Description"
          headerId="description"
          onClick={handleClick}
        />
        <TableHeader
          currentSort={currentSort}
          sortDir={sortDir}
          headerText="Balance"
          headerId="balance"
          onClick={handleClick}
        />
        <TableHeader
          currentSort={currentSort}
          sortDir={sortDir}
          headerText="Currency"
          headerId="currency"
          onClick={handleClick}
        />
      </div>
      <div>
        {sortedItems().map(item => (
          <Row key={item.id} item={item} />
        ))}
      </div>
    </>
  )
})

const Row = React.memo(({ item }) => (
  <div style={{ display: 'block' }}>
    <DateRow date={item.date} />
    {' - '} <CurrencyRow currency={item.amount} />
    {' - '} <TableRow text={item.description} />
    {' - '} <CurrencyRow currency={item.balance} />
    {' - '} <CurrencyRow currency={item.currency} />
  </div>
))

const TableHeader = React.memo(
  ({ headerId, headerText, currentSort, sortDir, onClick }) => {
    const isCurrentSort = currentSort === headerId

    const sort = !isCurrentSort
      ? ''
      : sortDir === 'asc'
      ? ' ^'
      : sortDir === 'desc'
      ? ' v'
      : ''

    const handleClick = () => onClick(headerId)

    return (
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ fontWeight: 'bolder' }}
      >
        {headerText}
        {sort}
      </Button>
    )
  }
)

const TableRow = React.memo(({ text }) => <span>{text}</span>)

const DateRow = React.memo(({ date }) => (
  <span>{moment(date).format('DD MM YYYY')}</span>
))

const CurrencyRow = React.memo(({ currency }) => (
  <span>£{parseFloat(currency)}</span>
))

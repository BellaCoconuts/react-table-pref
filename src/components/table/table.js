import React, { useState } from 'react'
import moment from 'moment'

export const Table = React.memo(({ items }) => {
  const itemsRef = React.useRef(items)
  const [sortDir, setSortDir] = useState('desc')
  const [currentSort, setCurrentSort] = useState('date')

  const handleClick = id => {
    if (currentSort !== id) {
      setCurrentSort(id)
      setSortDir('desc')
      return
    }
    setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
  }

  React.useEffect(() => {
    const ascending = (a, b) => (a[currentSort] > b[currentSort] ? -1 : 1)
    const descending = (a, b) => (a[currentSort] < b[currentSort] ? -1 : 1)
    const sortedItems = () => {
      return items.sort((a, b) =>
        sortDir === 'asc' ? ascending(a, b) : descending(a, b)
      )
    }
    itemsRef.current = sortedItems()
  }, [currentSort, items, setCurrentSort, sortDir])

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
      </div>
      <div>
        {itemsRef.current.map(item => (
          <div style={{ display: 'block' }} key={item.id}>
            <DateRow date={item.date} />
            {' - '}
            <CurrencyRow currency={item.amount} />
            {' - '} <TableRow text={item.description} />
          </div>
        ))}
      </div>
    </>
  )
})

const TableHeader = React.memo(
  ({ headerId, headerText, currentSort, sortDir, onClick }) => {
    const isCurrentSort = currentSort === headerId

    const sort = !isCurrentSort
      ? ' ||'
      : sortDir === 'asc'
      ? ' ^'
      : sortDir === 'desc'
      ? ' v'
      : ''

    const handleClick = () => onClick(headerId)

    return (
      <div onClick={handleClick} style={{ fontWeight: 'bolder' }}>
        {headerText}
        {sort}
      </div>
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

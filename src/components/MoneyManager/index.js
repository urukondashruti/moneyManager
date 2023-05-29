import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const list1 = [
  {
    id: v4(),
    name: 'Your Balance',
    imgUrl1:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    alt1: 'balance',
    test: 'balanceAmount',
    color1: 'green',
  },
  {
    id: v4(),
    name: 'Your Income',
    imgUrl1:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    alt1: 'income',
    test: 'incomeAmount',
    color1: 'blue',
  },
  {
    id: v4(),
    name: 'Your Expenses',
    imgUrl1:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    alt1: 'expenses',
    test: 'expensesAmount',
    color1: 'purple',
  },
]

const Items = props => {
  const {option} = props
  const {optionId, displayText} = option

  return <option value={optionId}>{displayText}</option>
}

class MoneyManager extends Component {
  state = {
    List: [],
    searchInput: '',
    searchAmount: '',
    searchSelect: transactionTypeOptions[0].displayText,
  }

  onChangeText = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({searchAmount: event.target.value})
  }

  onSelect = event => {
    if (event.target.value === 'EXPENSES') {
      this.setState({searchSelect: 'Expenses'})
    } else {
      this.setState({searchSelect: 'Income'})
    }
  }

  onSubmitClick = event => {
    event.preventDefault()

    const {searchInput, searchAmount, searchSelect} = this.state
    console.log(searchSelect)

    const newObject = {
      id: v4(),
      title: searchInput,
      amount: parseInt(searchAmount),
      type: searchSelect,
    }

    this.setState(prevState => ({
      List: [...prevState.List, newObject],
      searchInput: '',
      searchAmount: '',
    }))
  }

  getExpenses = () => {
    const {List} = this.state
    let ExpensesCount = 0
    let IncomeCount = 0

    List.forEach(each => {
      if (each.type === 'Expenses') {
        ExpensesCount += each.amount
      } else {
        IncomeCount += each.amount
      }
    })

    const Balance = IncomeCount - ExpensesCount

    return {ExpensesCount, IncomeCount, Balance}
  }

  onDelete = id => {
    const {List} = this.state

    const value5 = List.filter(each => each.id !== id)

    this.setState({List: value5})
  }

  render() {
    const {List, searchInput, searchAmount, searchSelect} = this.state

    const result = this.getExpenses()
    const {ExpensesCount, IncomeCount, Balance} = result

    return (
      <div className="background">
        <div className="back">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span className="span">Money Manager</span>
          </p>
        </div>
        <ul className="unList">
          {list1.map(each => (
            <MoneyDetails
              key={each.id}
              Item={each}
              expenses={ExpensesCount}
              income={IncomeCount}
              balance={Balance}
            />
          ))}
        </ul>
        <div className="con5">
          <div className="div3">
            <h1>Add Transaction</h1>
            <form className="div2" onSubmit={this.onSubmitClick}>
              <label htmlFor="input1">TITLE</label>
              <input
                type="text"
                value={searchInput}
                onChange={this.onChangeText}
                className="input"
                id="input1"
              />
              <label htmlFor="input2">AMOUNT</label>
              <input
                type="text"
                value={searchAmount}
                onChange={this.onChangeAmount}
                className="input"
                id="input2"
              />
              <p>TYPE</p>
              <select
                value={searchSelect}
                onChange={this.onSelect}
                className="select1"
              >
                {transactionTypeOptions.map(each => (
                  <Items key={each.optionId} option={each} />
                ))}
              </select>
              <button type="submit" className="but">
                Add
              </button>
            </form>
          </div>
          <div className="con6">
            <h1 className="head">History</h1>
            <ul>
              <li className="paraList">
                <p className="para2">Title</p>
                <p className="para2">Amount</p>
                <p className="para2"> Type</p>
              </li>
              {List.map(each => (
                <TransactionItem
                  key={each.id}
                  trans={each}
                  onDelete={this.onDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

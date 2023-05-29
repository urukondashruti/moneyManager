// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {Item, expenses, income, balance} = props
  const {name, imgUrl1, alt1, test, color1} = Item
  let result1 = null

  if (alt1 === 'expenses') {
    result1 = expenses
  } else if (alt1 === 'income') {
    result1 = income
  } else {
    result1 = balance
  }

  return (
    <li className={`list1 ${color1}`}>
      <div>
        <img src={imgUrl1} className="size" alt={alt1} />
      </div>
      <div className="div">
        <p className="head">{name}</p>
        <p data-testid={test}>Rs: {result1}</p>
      </div>
    </li>
  )
}

export default MoneyDetails

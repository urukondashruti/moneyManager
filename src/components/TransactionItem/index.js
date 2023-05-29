// Write your code here
import './index.css'

const transactionItem = props => {
  const {trans, onDelete} = props
  const {id, title, amount, type} = trans

  const onClickDelete = () => {
    onDelete(id)
  }

  return (
    <li className="list4">
      <p className="para2">{title}</p>
      <p className="para2">{amount}</p>
      <p className="para2">{type}</p>
      <button
        type="button"
        onClick={onClickDelete}
        data-testid="delete"
        className="button1"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="size2"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default transactionItem

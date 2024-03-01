import PropTypes from 'prop-types'

function Table({ expenses }) {
  const formatDate = (dateString) => {
    const options = { month: 'long', day: '2-digit' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="my-7">
    <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map(expense => (
            <tr key={expense?.id}>
              <td>{formatDate(expense?.date) || "-"}</td>
              <td>{expense?.merchant || "-"}</td>
              <td>{formatAmount(expense?.amount) || "-"}</td>
              <td>{expense?.category || "-"}</td>
              <td>{expense?.description || "-"}</td>
              <td>{expense?.status || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  )
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      merchant: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export default Table;
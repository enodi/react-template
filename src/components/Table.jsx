import PropTypes from 'prop-types';

/**
 * Table component renders a table with provided data and columns.
 * 
 * @param {Array} data - Array of objects representing rows of data to be displayed in the table.
 * @param {Array} columns - Array of objects defining columns of the table. Each column object should have 'text' and 'dataKey' properties.
 * @returns {JSX.Element} - Rendered table component.
 */
function Table({ data, columns }) {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${month} ${day}`;
  };

  return (
    <div className="my-7 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border-gray-200 shadow">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider">
                {column.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  {column.dataKey === 'amount' ? formatAmount(row[column.dataKey]) : 
                    column.dataKey === 'date' ? formatDate(row[column.dataKey]) : 
                    row[column.dataKey] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      dataKey: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default Table;

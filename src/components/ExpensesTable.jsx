import { useState, useEffect } from "react"
import Table from "./Table.jsx"
import { columns } from "../utils.js"

function ExpensesTable() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //TODO: Move baseUrl and username to environment variable
      try {
        const response = await fetch("https://expenses-backend-mu.vercel.app/expenses", {
          headers: {
            "Content-Type": "application/json",
            "Username": "Enodi.Audu"
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setExpenses(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (expenses.length === 0) {
    return <div>No expenses found.</div>;
  }

  return (
    <div>
      <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">Expenses</h1>
      <Table data={expenses} columns={columns} />
    </div>
  );
}

export default ExpensesTable;
import React from "react";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const Table = ({ tableData, initialInvestment }) => {
  console.log("initialInvestment", initialInvestment);
  return (
    <div>
      {tableData && (
        <table className="result">
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Savings</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => {
              console.log(row);
              console.log(initialInvestment);
              return (
                <tr>
                  <td>{row.year}</td>
                  <td>{formatter.format(row.savingsEndOfYear)}</td>
                  <td>{formatter.format(row.yearlyInterest)}</td>
                  <td>
                    {formatter.format(
                      row.savingsEndOfYear -
                        initialInvestment -
                        row.yearlyContribution * row.year
                    )}
                  </td>
                  <td>{formatter.format(initialInvestment * row.year)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;

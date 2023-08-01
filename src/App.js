import Form from "./components/Form";
import Header from "./components/Header";
import Table from "./components/Table";
import { useState } from "react";

function App() {
  const [tableData, setTableData] = useState();
  const [initialInvestment, setInitialInvestment] = useState(0);

  const submitHandler = (item) => {
    if (item.length > 0) {
      setTableData(item);
    }
  };

  const getInitialInvestment = (item) => {
    setInitialInvestment(item);
    console.log("initialInvestment", initialInvestment);
  };

  const onReset = () => {
    setTableData();
  };
  console.log("td", tableData);

  return (
    <div>
      <Header />
      <Form
        onSubmit={submitHandler}
        getInitialInvestment={getInitialInvestment}
        onReset={onReset}
      />
      {!tableData ? (
        <div style={{ margin: "auto", textAlign: "center" }}>
          "No calculation is done yet"
        </div>
      ) : (
        <Table tableData={tableData} initialInvestment={initialInvestment} />
      )}
    </div>
  );
}

export default App;

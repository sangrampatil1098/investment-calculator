import React, { useState } from "react";

const INITIAL_STATE = {
  currentSaving: "",
  yearlyContribution: "",
  expectedInterest: "",
  investmentDuration: "",
};

const Form = (props) => {
  const [formInput, setFormInput] = useState(INITIAL_STATE);

  const handleChange = (identifier, e) => {
    if (identifier === "currentSaving") {
      setFormInput({
        ...formInput,
        currentSaving: +e.target.value,
      });
    } else if (identifier === "yearlyContribution") {
      setFormInput({
        ...formInput,
        yearlyContribution: +e.target.value,
      });
    } else if (identifier === "expectedInterest") {
      setFormInput({
        ...formInput,
        expectedInterest: +e.target.value,
      });
    } else {
      setFormInput({
        ...formInput,
        investmentDuration: +e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    props.getInitialInvestment(formInput.currentSaving);
    e.preventDefault();
    console.log(formInput);

    const yearlyData = []; // per-year results

    let currentSavings = +formInput["currentSaving"]; // feel free to change the shape of this input object!
    const yearlyContribution = +formInput["yearlyContribution"]; // as mentioned: feel free to change the shape...
    const expectedReturn = +formInput["expectedInterest"] / 100;
    const duration = +formInput["investmentDuration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: Number(i + 1),
        yearlyInterest: Number(yearlyInterest),
        savingsEndOfYear: Number(currentSavings),
        yearlyContribution: Number(yearlyContribution),
      });
    }
    props.onSubmit(yearlyData);
  };

  const reset = () => {
    setFormInput(INITIAL_STATE);
    props.onReset();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            id="current-savings"
            value={formInput.currentSaving}
            onChange={(e) => handleChange("currentSaving", e)}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            value={formInput.yearlyContribution}
            onChange={(e) => handleChange("yearlyContribution", e)}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            id="expected-return"
            value={formInput.expectedInterest}
            onChange={(e) => handleChange("expectedInterest", e)}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            value={formInput.investmentDuration}
            onChange={(e) => handleChange("investmentDuration", e)}
          />
        </p>
      </div>
      <p className="actions">
        <button type="reset" className="buttonAlt" onClick={reset}>
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
};

export default Form;

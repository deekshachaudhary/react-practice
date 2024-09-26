import { useState } from 'react';
import './MortgageCalculator.css';

// https://www.greatfrontend.com/questions/user-interface/mortgage-calculator/react
// The user should be able to enter: Loan amount ($), Annual interest rate (%), Loan term (in years)
// Result to display: Monthly mortgage payment, Total payment amount, Total interest paid
// M = P(i(1+i)^n)/((1+i)^n - 1)
// M: Monthly mortgage payment, P: Loan amount, i: Monthly interest rate (APR / 12), n: Total number of payments (loan term in years x 12)
const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [apr, setApr] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  const [result, setResult] = useState({
    monthlyMortgage: null,
    loanAmount: null,
    totalInterest: null,
  });

  const [errors, setErrors] = useState({
    loanAmount: '',
    apr: '',
    loanTerm: '',
  });

  const formatNumberWithCommas = number => {
    return new Intl.NumberFormat().format(number);
  }

  const onLoanAmountChange = e => {
    const newValue = e.target.value;
    const cleanedValue = newValue.replaceAll(',', '');
    setLoanAmount(cleanedValue);

    setErrors(prevErrors => ({ ...prevErrors, loanAmount: '' }));

    if (!cleanedValue) {
      setErrors({ ...errors, loanAmount: 'Required' });
    } else if (isNaN(cleanedValue) || cleanedValue <= 0) {
      setErrors({ ...errors, loanAmount: 'Loan amount must be a positive number' });
    }
  }

  const onAprChange = e => {
    const newValue = e.target.value;
    const cleanedValue = newValue.replace('%', '');
    setApr(cleanedValue);

    setErrors(prevErrors => ({ ...prevErrors, apr: '' }));

    if (!cleanedValue) {
      setErrors({ ...errors, apr: 'Required' });
    } else if (isNaN(cleanedValue) || !(0 <= cleanedValue && cleanedValue <= 100)) {
      setErrors({ ...errors, apr: 'APR must be a number between 0 and 100' });
    }
  }

  const onLoanTermChange = e => {
    const newValue = e.target.value;
    setLoanTerm(newValue);

    setErrors(prevErrors => ({ ...prevErrors, loanTerm: '' }));

    if (!newValue) {
      setErrors({ ...errors, loanTerm: 'Required' });
    } else if (isNaN(newValue) || newValue <= 0 || newValue > 100) {
      setErrors({ ...errors, loanTerm: 'Loan term must be a positive number between 1 and 100' });
    }
  }

  const calculateMortgage = () => {
    const monthlyInterestRate = apr / 100 / 12;
    const numPayments = loanTerm * 12;
    const numerator = loanAmount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numPayments) - 1;

    setResult({
      monthlyMortgage: (numerator/denominator).toFixed(2),
      loanAmount,
      totalInterest: ((numerator/denominator * 12 * loanTerm) - loanAmount).toFixed(2),
    });
  }

  return (
    <div className="mortgage-calculator">
      <header className="header">Mortgage Calculator</header>
      <div className="body">
        <div className="field">
          <label htmlFor="loanAmount">Loan Amount</label>
          <div className="input-and-error">
            <input
              name="loanAmount"
              type="text"
              value={loanAmount ? formatNumberWithCommas(loanAmount) : ''}
              onChange={onLoanAmountChange}
            >
            </input>
            {errors.loanAmount && <p className="error">{errors.loanAmount}</p>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="apr">Annual Interest Rate (%)</label>
          <div className="input-and-error">
            <input
              name="apr"
              type="text"
              value={apr ? `${apr}%` : ''}
              onChange={onAprChange}
            >
            </input>
            {errors.apr && <p className="error">{errors.apr}</p>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="loanTerm">Loan Term (in years)</label>
          <div className="input-and-error">
            <input
              name="loanTerm"
              type="text"
              value={loanTerm}
              onChange={onLoanTermChange}
            >
            </input>
            {errors.loanTerm && <p className="error">{errors.loanTerm}</p>}
          </div>
        </div>
      </div>
      <button onClick={calculateMortgage}>Calculate</button>
      {result.monthlyMortgage && (
        <div className="result">
          <p>Monthly Mortgage Payment: {result.monthlyMortgage}</p>
          <p>Loan Amount: {formatNumberWithCommas(result.loanAmount)}</p>
          <p>Total Interest Paid: {result.totalInterest}</p>
          <p>Total Payment Amount: {formatNumberWithCommas(parseInt(result.loanAmount) + parseFloat(result.totalInterest))}</p>
        </div>
      )}
    </div>
  );
}

export default MortgageCalculator;
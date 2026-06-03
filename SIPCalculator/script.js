const form = document.getElementById('sip-form');
const monthlyInvestmentInput = document.getElementById('monthly-investment');
const annualReturnInput = document.getElementById('annual-return');
const investmentDurationInput = document.getElementById('investment-duration');
const resultPanel = document.getElementById('result');
const totalInvestedOutput = document.getElementById('total-invested');
const estimatedReturnsOutput = document.getElementById('estimated-returns');
const maturityValueOutput = document.getElementById('maturity-value');
const resetButton = document.getElementById('reset-btn');
const errorMessage = document.getElementById('error-message');

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  resultPanel.classList.add('hidden');
}

function clearError() {
  errorMessage.textContent = '';
  errorMessage.classList.add('hidden');
}

function resetCalculator() {
  form.reset();
  clearError();
  resultPanel.classList.add('hidden');
}

function calculateSIP(event) {
  event.preventDefault();

  const monthlyInvestment = parseFloat(monthlyInvestmentInput.value);
  const annualReturn = parseFloat(annualReturnInput.value);
  const durationYears = parseFloat(investmentDurationInput.value);

  if (
    Number.isNaN(monthlyInvestment) ||
    Number.isNaN(annualReturn) ||
    Number.isNaN(durationYears) ||
    monthlyInvestment <= 0 ||
    annualReturn < 0 ||
    durationYears <= 0
  ) {
    showError('Please enter valid positive values for all fields.');
    return;
  }

  clearError();

  const monthlyRate = annualReturn / 100 / 12;
  const totalMonths = durationYears * 12;
  let maturityValue;

  if (monthlyRate === 0) {
    maturityValue = monthlyInvestment * totalMonths;
  } else {
    maturityValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate);
  }

  const totalInvested = monthlyInvestment * totalMonths;
  const estimatedReturns = maturityValue - totalInvested;

  totalInvestedOutput.textContent = formatCurrency(totalInvested);
  estimatedReturnsOutput.textContent = formatCurrency(estimatedReturns);
  maturityValueOutput.textContent = formatCurrency(maturityValue);
  resultPanel.classList.remove('hidden');
}

form.addEventListener('submit', calculateSIP);
resetButton.addEventListener('click', resetCalculator);

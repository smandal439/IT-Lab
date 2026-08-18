const form = document.getElementById('sip-form');
const monthlyInvestmentInput = document.getElementById('monthly-investment');
const annualReturnInput = document.getElementById('annual-return');
const investmentDurationInput = document.getElementById('investment-duration');
const resultPanel = document.getElementById('result');
const totalInvestedOutput = document.getElementById('total-invested');
const estimatedReturnsOutput = document.getElementById('estimated-returns');
const maturityValueOutput = document.getElementById('maturity-value');
const chartContainer = document.getElementById('chart');
const resetButton = document.getElementById('reset-btn');
const errorMessage = document.getElementById('error-message');
const themeToggleButton = document.getElementById('theme-toggle');

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
  renderChart(monthlyInvestment, annualReturn, durationYears);
}

function renderChart(monthlyInvestment, annualReturn, durationYears) {
  chartContainer.innerHTML = '';
  const monthlyRate = annualReturn / 100 / 12;
  const totalYears = Math.max(1, Math.round(durationYears));
  const maxDataPoints = Math.min(totalYears, 10);

  const yearData = Array.from({ length: maxDataPoints }, (_, index) => {
    const year = index + 1;
    const months = year * 12;
    const invested = monthlyInvestment * months;
    const maturity = monthlyRate === 0
      ? invested
      : monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return {
      year,
      invested,
      returns: Math.max(0, maturity - invested),
    };
  });

  const maxValue = Math.max(...yearData.map((item) => item.invested + item.returns));
  const chartGrid = document.createElement('div');
  chartGrid.className = 'chart-grid';

  yearData.forEach((item) => {
    const column = document.createElement('div');
    column.className = 'chart-column';

    const yearLabel = document.createElement('div');
    yearLabel.className = 'year-label';
    yearLabel.textContent = `Year ${item.year}`;

    const bars = document.createElement('div');
    bars.className = 'bar-stack';

    const investedBar = document.createElement('div');
    investedBar.className = 'column-bar invested';
    investedBar.style.height = `${(item.invested / maxValue) * 100}%`;
    investedBar.title = `Invested: ₹${Math.round(item.invested).toLocaleString('en-IN')}`;

    const returnsBar = document.createElement('div');
    returnsBar.className = 'column-bar returns';
    returnsBar.style.height = `${(item.returns / maxValue) * 100}%`;
    returnsBar.title = `Returns: ₹${Math.round(item.returns).toLocaleString('en-IN')}`;

    bars.append(investedBar, returnsBar);
    column.append(bars, yearLabel);
    chartGrid.append(column);
  });

  chartContainer.append(chartGrid);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggleButton.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

themeToggleButton.addEventListener('click', toggleTheme);
setTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

form.addEventListener('submit', calculateSIP);
resetButton.addEventListener('click', resetCalculator);

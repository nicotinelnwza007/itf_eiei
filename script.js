// Helper: write to output box
function showOutput(message) {
  let box = document.getElementById("outputBox");
  box.innerHTML += message + "<br>";
  box.scrollTop = box.scrollHeight; // auto scroll down
}

// Currency Converter
function convertCurrency() {
  const rateUSDTHB = 36; 
  const rateTHBUSD = 1 / 36;

  let input = parseFloat(document.getElementById("inputBalance").value);
  let currency = document.getElementById("inputCurrency").value;
  let output = 0;

  if (isNaN(input)) {
    showOutput("Please enter a valid number for conversion");
    return;
  }

  if (currency === "USD") {
    output = input * rateUSDTHB;
    document.getElementById("outputBalance").value = output.toFixed(2) + " THB";
    showOutput("Converted " + input + " USD → " + output.toFixed(2) + " THB");
  } else if (currency === "THB") {
    output = input * rateTHBUSD;
    document.getElementById("outputBalance").value = output.toFixed(2) + " USD";
    showOutput("Converted " + input + " THB → " + output.toFixed(2) + " USD");
  }
}

// Balance Information
function updateBalance() {
  let account = parseFloat(document.getElementById("accountBalance").value);
  let cash = parseFloat(document.getElementById("cashBalance").value);

  if (isNaN(account) || isNaN(cash)) {
    showOutput("❌ Please enter valid balances");
    return;
  }

  showOutput("Balances updated → Account: " + account + " | Cash: " + cash);
}

// Bank Operation
function deposit() {
  let amount = parseFloat(document.getElementById("operationAmount").value);
  let account = parseFloat(document.getElementById("accountBalance").value);

  if (isNaN(amount) || amount <= 0) {
    showOutput("❌ Invalid deposit amount");
    return;
  }

  account += amount;
  document.getElementById("accountBalance").value = account;
  showOutput("📥 Deposited " + amount + " → New account balance: " + account);
}

function withdraw() {
  let amount = parseFloat(document.getElementById("operationAmount").value);
  let account = parseFloat(document.getElementById("accountBalance").value);

  if (isNaN(amount) || amount <= 0) {
    showOutput("Invalid withdraw amount");
    return;
  }

  if (amount > account) {
    showOutput("Not enough balance for withdrawal");
    return;
  }

  account -= amount;
  document.getElementById("accountBalance").value = account;
  showOutput("Withdraw " + amount + " → New account balance: " + account);
}

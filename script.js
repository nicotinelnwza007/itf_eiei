// Helper: write to output box
function showOutput(message) {
  let box = document.getElementById("outputBox");
  box.innerHTML += message + "\n";
  box.scrollTop = box.scrollHeight; // auto scroll down
}




// Bank Operation
function deposit() {
  let amount = parseFloat(document.getElementById("operationAmount").value);
  let account = parseFloat(document.getElementById("accountBalance").value);

  if (isNaN(amount) || amount <= 0) {
    showOutput("Invalid deposit amount");
    return;
  }

  account += amount;
  document.getElementById("accountBalance").value = account;
  showOutput("Deposited " + amount + " → New account balance: " + account);
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

// Choose and perform operation
function performOperation() {
  let type = document.getElementById("operationType").value;

  if (type === "deposit") {
    deposit();
  } else if (type === "withdraw") {
    withdraw();
  } else {
    showOutput("Invalid operation type");
  }
}

// Helper function to print to the output box
function showOutput(message) {
  let box = document.getElementById("outputBox");
  box.innerHTML += message + "\n";
  box.scrollTop = box.scrollHeight;
}

function convertCurrency() {
  const inputBalance = parseFloat(document.getElementById("inputBalance").value);
  const inputCurrency = document.getElementById("inputCurrency").value;
  const outputBalance = document.getElementById("outputBalance");

  if (isNaN(inputBalance) || inputBalance <= 0) {
    showOutput("Please enter a valid number for conversion");
    return;
  }

  fetch("http://localhost:5501/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: inputBalance,
      currency: inputCurrency
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        showOutput("❌ " + data.error);
      } else {
        outputBalance.value = `${data.outputAmount} ${data.outputCurrency}`;
        showOutput(`✅ Converted ${data.inputAmount} ${data.inputCurrency} → ${data.outputAmount} ${data.outputCurrency}`);
      }
    })
    .catch(err => {
      showOutput("❌ Error: " + err.message);
    });
}

// ✅ Still works: Balance update
function updateBalance() {
  let account = parseFloat(document.getElementById("accountBalance").value);
  let cash = parseFloat(document.getElementById("cashBalance").value);

  if (isNaN(account) || isNaN(cash)) {
    showOutput("Please enter valid balances");
    return;
  }

  showOutput("✅ Balances updated → Account: " + account + " | Cash: " + cash);
}

// ✅ Deposit / Withdraw logic
function deposit() {
  let amount = parseFloat(document.getElementById("operationAmount").value);
  let account = parseFloat(document.getElementById("accountBalance").value);

  if (isNaN(amount) || amount <= 0) {
    showOutput("Invalid deposit amount");
    return;
  }

  account += amount;
  document.getElementById("accountBalance").value = account;
  showOutput("✅ Deposited " + amount + " → New account balance: " + account);
}

function withdraw() {
  let amount = parseFloat(document.getElementById("operationAmount").value);
  let account = parseFloat(document.getElementById("accountBalance").value);

  if (isNaN(amount) || amount <= 0) {
    showOutput("Invalid withdraw amount");
    return;
  }

  if (amount > account) {
    showOutput("❌ Not enough balance for withdrawal");
    return;
  }

  account -= amount;
  document.getElementById("accountBalance").value = account;
  showOutput("✅ Withdrawn " + amount + " → New account balance: " + account);
}

function performOperation() {
  let type = document.getElementById("operationType").value;
  if (type === "deposit") {
    deposit();
  } else if (type === "withdraw") {
    withdraw();
  } else {
    showOutput("❌ Invalid operation type");
  }
}


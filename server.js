const express = require('express');
const cors = require('cors');
const app = express();
const port = 5501;

app.use(cors()); // Enable CORS so frontend can call this API
app.use(express.json());

const rateUSDTHB = 32.07;
const rateTHBUSD = 1 / 32.07;

app.post('/convert', (req, res) => {
  const { amount, currency } = req.body;

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Please enter a valid number greater than zero for conversion' });
  }

  let output = 0;
  let convertedCurrency = '';

  if (currency === 'USD') {
    output = amount * rateUSDTHB;
    convertedCurrency = 'THB';
  } else if (currency === 'THB') {
    output = amount * rateTHBUSD;
    convertedCurrency = 'USD';
  } else {
    return res.status(400).json({ error: 'Unsupported currency type. Use "USD" or "THB".' });
  }

  res.json({
    inputAmount: amount,
    inputCurrency: currency,
    outputAmount: output.toFixed(2),
    outputCurrency: convertedCurrency,
  });
});

app.listen(port, () => {
  console.log(`Currency conversion API listening at http://localhost:${port}`);
});

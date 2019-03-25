const value = 353;
const valueStr = Number(value).toLocaleString(undefined, { // $353.00
  currency: 'usd',
  minimumFractionDigits: 2
});
const valueStrArray = valueStr.split(''); // gives ['$', '3', '5',  '3', '.', '0', '0' ];

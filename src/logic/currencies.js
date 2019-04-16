import defaultCurrencies from '../data/currencies';

export const currencyNames = defaultCurrencies.map(cur => `${cur.name} (${cur.code})`);

export const getCurrencyFromName = (val) => {
  let res = defaultCurrencies.filter(cur => `${cur.name} (${cur.code})` === val);
  return res[0];
}

export const getCurrencyFromCode = (code) => {
  let res = defaultCurrencies.filter(cur => cur.code === code);
  return res[0];
}

export const convertCurrency = (amount, baseRate, destRate) => {
  return (amount / baseRate) * destRate;
}
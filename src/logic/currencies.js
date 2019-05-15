import defaultCurrencies from '../data/currencies';

export const currencyNames = defaultCurrencies.map(cur => `${cur.name} (${cur.code})`);

export const isACurrencyName = (name) => {
  let res = false;
  defaultCurrencies.forEach(cur => {
    if(`${cur.name} (${cur.code})` === name){
      res = true;
    }
  });
  return res;
}

export const getCurrencyFromName = (val, currencies = defaultCurrencies) => {
  let res = currencies.filter(cur => `${cur.name} (${cur.code})` === val);
  return res[0];
}

export const getCurrencyFromCode = (code, currencies = defaultCurrencies) => {
  let res = currencies.filter(cur => cur.code === code);
  return res[0];
}

export const convertCurrency = (amount, baseRate, destRate) => {
  return (amount / baseRate) * destRate;
}
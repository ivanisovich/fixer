import React, { useEffect, useState } from 'react';
import './App.css';
import { getLatestCurrencies, getFullCurrenciesName } from './api';
import Currency from './components/Currency/Currency';
import Spinner from './components/Spinner/Spinner';

function App() {
  const [latestCurrencies, setLatestCurrencies] = useState([]);
  const [fullCurrenciesName, setFullCurrenciesName] = useState({});
  const [currentСurrency, setCurrentCurrency] = useState({});
  const [showCurrencies, setShowCurrencies] = useState(false);
  const handleListButtonClick = () => {
    if (showCurrencies === false) {
      setShowCurrencies(true);
    } else {
      setShowCurrencies(false);
    }
  };
  useEffect(() => {
    getFullCurrenciesName().then((data) => {
      setFullCurrenciesName(data.symbols);
    });
  }, [setFullCurrenciesName]);

  useEffect(() => {
    getLatestCurrencies().then((data) => {
      let currencies = [];
      for (let key in data.rates) {
        let newKey = key[0].toLowerCase() + key[1].toLowerCase();
        if (key === 'ANG') {
          newKey = 'nl';
          console.log(newKey);
        }
        let currency = {
          rate: data.rates[key],
          name: fullCurrenciesName[key],
          key: newKey,
        };
        currencies.push(currency);
      }
      setLatestCurrencies(currencies);
    });
  }, [setLatestCurrencies, fullCurrenciesName]);

  return (
    <>
      {latestCurrencies.length !== 0 ? (
        <>
          {currentСurrency.key ? (
            <div className="header">
              <img
                src={
                  'https://flagcdn.com/24x18/' + currentСurrency.key + '.png'
                }
                width="24"
                height="18"
                alt="Countries flags"
              ></img>
              <span>{currentСurrency.name}</span>
              <p>Latest exchange rate </p>
              <p>
                {' '}
                1 {currentСurrency.name} -{' '}
                {Math.round((1 / currentСurrency.rate) * 1000000) / 1000000}{' '}
                EURO
              </p>
              <p>
                {currentСurrency.rate} {currentСurrency.name} - 1 EURO
              </p>
            </div>
          ) : (
            ''
          )}

          <span
            onClick={handleListButtonClick}
            className="currency__list__button"
          >
            Show current exchange rate
          </span>
          {showCurrencies ? (
            <ul className="currency__list">
              {latestCurrencies.map((item, index) => {
                return (
                  <Currency
                    setCurrentСurrency={setCurrentCurrency}
                    key={index}
                    data={item}
                  ></Currency>
                );
              })}
            </ul>
          ) : (
            ''
          )}
        </>
      ) : (
        <Spinner></Spinner>
      )}
    </>
  );
}

export default App;

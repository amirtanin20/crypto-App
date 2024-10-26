import React, { useState } from "react";
import styles from "./Search.module.css";
function Search({ data, setApi, setViewChart, setCoin }) {
  const [rustle, setResult] = useState([]);

  const searchHandler = (e) => {
    const value = e.target.value;

    if (value !== "") {
      const filteredCoins = data.filter(
        (coin) =>
          coin.name.toLowerCase().includes(value.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(value.toLowerCase())
      );
      setResult(filteredCoins);
    } else {
      setResult([]);
    }
  };
  const selectHandler = (e) => {
    const value = e.target.value;
    if (value === "usd") {
      setApi(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&x_cg_demo_api_key=CG-bM2baL656GGHbSAVpgrx5Poz"
      );
    } else if (value === "jpy") {
      setApi(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy&category=layer-1&order=market_cap_desc&x_cg_demo_api_key=CG-bM2baL656GGHbSAVpgrx5Poz"
      );
    } else if (value === "eur") {
      setApi(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&category=layer-1&order=market_cap_desc&x_cg_demo_api_key=CG-bM2baL656GGHbSAVpgrx5Poz"
      );
    }
  };

  const coinBtnHandler = (coin) => {
    setCoin(coin.name.toLowerCase());
    setViewChart(true);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <div>
          <input type="text" onChange={searchHandler} />
          <div className={styles.resultBox}>
            <ul>
              {rustle.map((coin) => {
                return (
                  <li key={coin.id}>
                    <button onClick={() => coinBtnHandler(coin)}>
                      <img src={coin.image} alt={coin.name} width={30} />
                      <span>{coin.symbol}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <select onChange={selectHandler} name="" id="">
          <option value="usd">USD</option>
          <option value="jpy">JPY</option>
          <option value="eur">EUR</option>
        </select>
      </div>
    </>
  );
}

export default Search;

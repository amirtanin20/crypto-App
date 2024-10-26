import React, { useEffect, useState } from "react";
import styles from "./CryptoTable.module.css";
import chartUp from "../assets/chart-up.svg";
import chartDown from "../assets/chart-down.svg";

function CryptoTable({ data, setViewChart, setCoin }) {
  const [coinList, setCoinList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    setCoinList(data);
  }, [data]);

  const coinBtnHandler = (coin) => {
    setCoin(coin.name.toLowerCase());
    setViewChart(true);
  };
  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.headerRow}>
          <span>Coin</span>
          <span>Name</span>
          <span>Price</span>
          <span>24h Change</span>
          <span>Total Volume</span>
        </div>
        <div className={styles.coinList}>
          {currentData.map((coin) => (
            <div className={styles.coinView} key={coin.id}>
              <div className={styles.coin}>
                <button
                  className={styles.coinBtn}
                  onClick={() => coinBtnHandler(coin)}
                >
                  <img src={coin.image} alt={coin.name} width={30} />
                </button>
                <button
                  className={styles.symbolBtn}
                  onClick={() => coinBtnHandler(coin)}
                >
                  {coin.symbol.toUpperCase()}
                </button>
              </div>
              <span>{coin.name}</span>
              <span>{coin.current_price.toLocaleString()}</span>
              {coin.price_change_percentage_24h > 0 ? (
                <span style={{ color: "green" }}>
                  {coin.price_change_percentage_24h}
                </span>
              ) : (
                <span style={{ color: "red" }}>
                  {coin.price_change_percentage_24h}
                </span>
              )}

              <span>{coin.total_volume.toLocaleString()}</span>
              {coin.price_change_percentage_24h > 0 && (
                <img src={chartUp}></img>
              )}
              {coin.price_change_percentage_24h < 0 && (
                <img src={chartDown}></img>
              )}
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {currentPage > 2 && (
            <>
              <button onClick={() => goToPage(1)}>1</button>
              {currentPage > 3 && <span>...</span>}
            </>
          )}

          {Array.from({ length: 4 }, (_, index) => {
            const page = currentPage - 1 + index;
            return (
              page > 1 &&
              page < totalPages && (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  disabled={currentPage === page}
                >
                  {page}
                </button>
              )
            );
          })}

          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && <span>...</span>}
              <button onClick={() => goToPage(totalPages)}>{totalPages}</button>
            </>
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default CryptoTable;

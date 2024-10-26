import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import styles from "./Chart.module.css";

const Chart = ({ coin }) => {
  const [data, setData] = useState([]);
  const [marketCap, setMarketCap] = useState([]);
  const [value, setValue] = useState([]);

  const [realPrice, setRealPrice] = useState("");
  const [realMarketCap, setRealMarketCap] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [minVolumes, setMinVolumes] = useState(0);
  const [maxVolumes, setMaxVolumes] = useState(0);

  const [minMarketCap, setMinMarketCap] = useState(0);
  const [maxMarketCap, setMaxMarketCap] = useState(0);

  const [shiftCart, setShiftChart] = useState([]);
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [showError, setShowError] = useState(undefined);
  const [typeError, setTypeError] = useState(0);
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily&x_cg_demo_api_key=CG-bM2baL656GGHbSAVpgrx5Poz`
        );
        setTypeError(response.status);

        const result = await response.json();
        const prices = result.prices.map((price) => ({
          date: new Date(price[0]),
          value: price[1],
        }));
        const values = result.total_volumes.map((value) => ({
          date: new Date(value[0]),
          value: value[1],
        }));
        const marketCaps = result.market_caps.map((marketCap) => ({
          date: new Date(marketCap[0]),
          value: marketCap[1],
        }));
        const minp = Math.min(...prices.map((p) => p.value));
        const maxp = Math.max(...prices.map((p) => p.value));
        const minv = Math.min(...values.map((p) => p.value));
        const maxv = Math.max(...values.map((p) => p.value));
        const minm = Math.min(...marketCaps.map((p) => p.value));
        const maxm = Math.max(...marketCaps.map((p) => p.value));

        setData(prices);
        setMinPrice(minp);
        setMaxPrice(maxp);
        setMinVolumes(minv);
        setMaxVolumes(maxv);
        setMinMarketCap(minm);
        setMaxMarketCap(maxm);
        setValue(values);
        setMarketCap(marketCaps);
        setShowError(false);
      } catch (error) {
        if (typeError === 404) {
          setShowError(true);
        }
      }
    };

    fetchPrices();
  }, [coin, typeError]);

  useEffect(() => {
    const getPrice = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`
        );
        const result = await res.json();
        result.map((coin) => {
          const RP = coin.current_price;
          const MR = coin.market_cap;
          setRealMarketCap(MR);
          setRealPrice(RP);
          setShowError(false);
        });
      } catch (error) {
        if (typeError === 404) {
          setShowError(true);
        }
      }
    };
    getPrice();
  }, [coin]);

  useEffect(() => {
    if (data.length > 0) {
      shiftHandler1();
    }
  }, [data]);

  const shiftHandler1 = () => {
    setShiftChart(data);
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  };
  const shiftHandler2 = () => {
    setShiftChart(value);
    setMinValue(minVolumes);
    setMaxValue(maxVolumes);
  };
  const shiftHandler3 = () => {
    setShiftChart(marketCap);
    setMinValue(minMarketCap);
    setMaxValue(maxMarketCap);
  };

  const formatNumber = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + "B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K";
    } else {
      return num.toFixed(4);
    }
  };

  if (showError == undefined) {
    return <></>;
  } else if (showError) {
    return (
      <div className={styles.noDataContainer}>
        <h1>The information is not available</h1>
      </div>
    );
  }
  return (
    <>
      <div className={styles.ChartContainer}>
        <h2>
          {coin.charAt(0).toUpperCase() + coin.slice(1)} Historical Prices
        </h2>
        <LineChart width={800} height={500} data={shiftCart}>
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => {
              const date = new Date(tick);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
          />
          <YAxis
            domain={[minValue, maxValue]}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip formatter={(value) => value.toFixed(4)} />
          <CartesianGrid strokeDasharray="1 1" />
          <Line type="monotone" dataKey="value" stroke="#fc0707" />
        </LineChart>
        <div className={styles.chartBtn}>
          <button onClick={shiftHandler1}>prices</button>
          <button onClick={shiftHandler2}>Total volumes</button>
          <button onClick={shiftHandler3}>Market Cap</button>
        </div>
        <p className={styles.chartDetail}>
          <span>Price :{realPrice}</span>
          <span>ATH : {maxPrice} </span>
          <span>Market Cap : {realMarketCap} </span>
        </p>
      </div>
    </>
  );
};

export default Chart;

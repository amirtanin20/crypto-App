import FooterAndHeader from "./Layers/FooterAndHeader.jsx";
import CryptoTable from "./Component/CryptoTable.jsx";
import Search from "./Component/Search.jsx";
import Chart from "./Component/Chart.jsx";
import BlurLayer from "./Component/BlurLayer.jsx";

import { useEffect, useState } from "react";
function App(children) {
  const [viewChart, setViewChart] = useState(false);
  const [data, setData] = useState([]);
  const [coin, setCoin] = useState("");
  const [api, setApi] = useState(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&x_cg_demo_api_key=CG-bM2baL656GGHbSAVpgrx5Poz"
  );
  async function getData() {
    try {
      const response = await fetch(api);
      const resData = await response.json();
      setData(resData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getData();
  }, [api]);
  return (
    <FooterAndHeader>
      <Search
        data={data}
        setApi={setApi}
        setViewChart={setViewChart}
        setCoin={setCoin}
      />
      <CryptoTable data={data} setViewChart={setViewChart} setCoin={setCoin} />
      {viewChart && <BlurLayer setViewChart={setViewChart} />}
      {viewChart && <Chart coin={coin} />}
    </FooterAndHeader>
  );
}

export default App;

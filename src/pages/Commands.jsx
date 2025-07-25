import styled from "styled-components";
import MainLayout from "../layouts/MainLayout";
import { getBalance } from "../services/balance";
import { getStocks } from "../services/analysis";
import { getMyStocks, buyStock } from "../services/stocks";
import { getTip } from "../services/gemini";
import { useEffect, useState } from "react";

export default function Commands() {
  const [loading, setLoading] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [balance, setBalance] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [erro, setErro] = useState(null);
  const [data, setData] = useState({ ticker: '', quantity: '', unit_price: '', total_price: '' });
  const [showBot, setShowBot] = useState(false);
  const [botResponse, setBotResponse] = useState('');
  const [botLoading, setBotLoading] = useState(false);

  useEffect(() => {
    getStocks()
      .then(res => {
        setStocks(res.data);
      })
      .catch(err => {
        console.log(err);
        setErro("Erro ao buscar ações");
      })
      .finally(() => {
        setLoading(false);
      });

    getMyStocks()
      .then(res => {
        setPortfolio(res.data);
      })
      .catch(err => {
        console.log(err);
        setErro("Erro ao buscar ações");
      })
      .finally(() => {
        setLoading(false);
      });

    getBalance()
      .then((res) => setBalance(res.data.value))
      .catch((err) => console.log("Erro ao buscar balance", err));
  }, [data]);

  const handleBuy = async () => {
    try {
      const rawPrice = data.unit_price || '';
      const normalizedPrice = rawPrice.replace(/\./g, '').replace(',', '.');
      const unitPrice = Number(normalizedPrice);
      const qty = Number(data.quantity);

      if (isNaN(unitPrice) || isNaN(qty)) {
        setErro('Preço ou quantidade inválidos');
        return;
      }
      if (!data.ticker || isNaN(unitPrice) || isNaN(qty) || qty <= 0) {
        setErro("Dados inválidos para compra");
        return;
      }

      const total = unitPrice * qty;
      const payload = {
        ticker: data.ticker,
        quantity: qty,
        average_price: total,
      };
      await buyStock(payload);
      setData({ ticker: '', quantity: '', unit_price: '', total_price: '' });
    } catch (error) {
      setErro(`${error.response.data.message}`);
      console.log(error);
    }
  };

  const handleAskTip = async () => {
    setBotLoading(true);
    try {
      const response = await getTip(); 
      setBotResponse(response.data.tip);
    } catch (error) {
      setBotResponse(`Erro ao buscar dica: ${error}`);
    } finally {
      setBotLoading(false);
    }
  }

  return (
    <MainLayout>
      <Styled.Header>
        <Styled.Title>Comandos</Styled.Title>
        {balance !== null && (
          <Styled.SaldoBox>
            <p>Saldo disponível</p>
            <h2>R$ {balance}</h2>
          </Styled.SaldoBox>
        )}
      </Styled.Header>

      <Styled.Form>
        <Styled.FieldWrapper>
          <Styled.Select
            value={data.ticker}
            onChange={(e) => {
              const selectedTicker = e.target.value;
              const selectedStock = stocks.find((s) => s.ticker === selectedTicker);
              const averagePrice = selectedStock ? selectedStock.price : '';

              setData((prev) => ({
                ...prev,
                ticker: selectedTicker,
                unit_price: averagePrice,
              }));
            }}
          >
            <option value="">Ação</option>
            {stocks.map((stock) => (
              <option key={stock.ticker} value={stock.ticker}>
                {stock.ticker} - R$ {stock.price}
              </option>
            ))}
          </Styled.Select>

        </Styled.FieldWrapper>

        <Styled.FieldWrapper>
          <Styled.Input
            type="number"
            value={data.quantity}
            onChange={(e) =>
              setData((prev) => ({ ...prev, quantity: e.target.value }))
            }
            min="0"
          />
        </Styled.FieldWrapper>

        <Styled.Button onClick={handleBuy} disabled={!data}>Comprar</Styled.Button>
      </Styled.Form>

      {erro && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {erro}
        </div>
      )}

      {portfolio.length > 0 && (
        <Styled.Portfolio>
          <h3>Minhas Ações</h3>
          <ul>
            {portfolio.map((item) => (
              <li key={item.ticker}>
                <strong>{item.ticker}</strong>: {item.quantity} unidades | R$ {item.average_price}
              </li>
            ))}
          </ul>
        </Styled.Portfolio>
      )}

      <Styled.BotContainer>
        <img
          src="/bot.png"
          alt="Bot"
          onClick={() => setShowBot((prev) => !prev)}
        />
        {showBot && (
          <Styled.BotDialog>
            <p>{botLoading ? "Pensando..." : botResponse || "Clique em perguntar para uma dica."}</p>
            <button onClick={handleAskTip} disabled={botLoading}>
              Perguntar
            </button>
          </Styled.BotDialog>
        )}
      </Styled.BotContainer>
    </MainLayout>
  );
}

const Styled = {
  FieldWrapper: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 160px;

    label {
      margin-bottom: 4px;
      font-weight: 500;
      color: #1e272e;
    }
  `,

  Portfolio: styled.div`
    margin-top: 40px;

    h3 {
      font-size: 20px;
      margin-bottom: 16px;
      color: #1e272e;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        background: #f1f2f6;
        border: 1px solid #dcdde1;
        border-radius: 6px;
        padding: 10px 14px;
        margin-bottom: 10px;
        font-size: 16px;

        strong {
          color: #1e272e;
        }
      }
    }
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,

  SaldoBox: styled.div`
    background: #1e272e;
    color: #f1f2f6;
    padding: 12px 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    text-align: right;

    p {
      margin: 0;
      font-size: 14px;
      color: #dcdde1;
    }

    h2 {
      margin: 4px 0 0;
      font-size: 22px;
      font-weight: 700;
      color: #00ffab;
    }
  `,

  Title: styled.h6`
    font-size: 24px;
    margin-bottom: 24px;
    font-weight: 700;
    color: #1e272e;
  `,

  Form: styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    max-width: 100%;
    align-items: flex-end;
    flex-wrap: wrap; /* Se quiser que quebre em telas pequenas */
  `,

  Select: styled.select`
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 16px;
  `,

  Input: styled.input`
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 16px;
  `,

  Button: styled.button`
    padding: 12px;
    background-color: ${({ theme }) => theme.colors.primary || "#2ecc71"};
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark || "#27ae60"};
    }

    &:disabled {
      background-color: #95a5a6;
      cursor: not-allowed;
      opacity: 0.6;
    }
  `,

  BotContainer: styled.div`
    position: fixed;
    bottom: 100px;
    right: 20px;
    z-index: 1000;

    img {
      width: 100px;
      height: 100px;
      cursor: pointer;
      border-radius: 50%;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
  `,

  BotDialog: styled.div`
    position: absolute;
    bottom: 100px;
    right: 80px;
    width: 260px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
    font-size: 14px;
    color: #2f3640;

    p {
      margin: 0 0 10px;
    }

    button {
      background-color: #0984e3;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: #74b9ff;
      }

      &:disabled {
        background-color: #b2bec3;
        cursor: not-allowed;
      }
    }
  `,
};
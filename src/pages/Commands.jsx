import styled from "styled-components";
import MainLayout from "../layouts/MainLayout";
import { getSaldo } from "../services/balance";
import { getStocks } from "../services/analysis";
import { useEffect, useState } from "react";

export default function Commands() {
  const [selectedStock, setSelectedStock] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [loading, setLoading] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [saldo, setSaldo] = useState(null);
  const [portfolio, setPortfolio] = useState([]);

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

    getSaldo()
      .then((res) => setSaldo(res.data.value))
      .catch((err) => console.log("Erro ao buscar saldo", err));
  }, []);

  const handleBuy = () => {
    if (!selectedStock || !quantity) return alert("Preencha todos os campos.");

    setPortfolio((prev) => {
      const exists = prev.find((item) => item.stock === selectedStock);
      if (exists) {
        return prev.map((item) =>
          item.stock === selectedStock
            ? { ...item, quantity: item.quantity + parseInt(quantity) }
            : item
        );
      }
      return [...prev, { stock: selectedStock, quantity: parseInt(quantity) }];
    });

    alert(`Compra efetuada:\nAção: ${selectedStock}\nQuantidade: ${quantity}`);
    setQuantity("");
    setSelectedStock("");
  };

  return (
    <MainLayout>
      <Styled.Header>
        <Styled.Title>Comandos</Styled.Title>
        {saldo !== null && (
          <Styled.SaldoBox>
            <p>Saldo disponível</p>
            <h2>R$ {saldo}</h2>
          </Styled.SaldoBox>
        )}
      </Styled.Header>

      <Styled.Form>
        <Styled.FieldWrapper>
          <Styled.Select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
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
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="0"
          />
        </Styled.FieldWrapper>

        <Styled.Button onClick={handleBuy}>Comprar</Styled.Button>
      </Styled.Form>


      {portfolio.length > 0 && (
        <Styled.Portfolio>
          <h3>Minhas Ações</h3>
          <ul>
            {portfolio.map((item) => (
              <li key={item.stock}>
                <strong>{item.stock}</strong>: {item.quantity} unidades
              </li>
            ))}
          </ul>
        </Styled.Portfolio>
      )}
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
  `,
};
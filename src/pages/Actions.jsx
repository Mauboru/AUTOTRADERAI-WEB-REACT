import { useEffect, useState } from "react";
import styled from "styled-components";
import MainLayout from "../layouts/MainLayout";
import { getStocks } from "../services/analysis";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function Actions() {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [expandido, setExpandido] = useState(false);

  const limitarTexto = (texto, limite = 150) => {
    if (!texto) return "";
    if (texto.length <= limite) return texto;
    return texto.slice(0, limite) + "...";
  };

  useEffect(() => {
    getStocks()
      .then(res => {
        setLista(res.data);
      })
      .catch(err => {
        console.log(err);
        setErro("Erro ao buscar ações");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  const toggleExpandir = () => setExpandido(!expandido);

  return (
    <MainLayout>
      <Styled.Title>Ações</Styled.Title>

      {carregando && (
        <Styled.LoadingWrapper>
          <Styled.LoadingBar />
          <Styled.LoadingText>Buscando ações e atualizando mercado...</Styled.LoadingText>
        </Styled.LoadingWrapper>
      )}

      {erro && <p>{erro}</p>}

      <Styled.Grid>
        {lista.map((acao, i) => (
          <Styled.Card key={i} $variation={acao.variation}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <img
                src={`https://logo.clearbit.com/${acao.ticker.replace(".SA", "").toLowerCase()}.com`}
                alt={acao.ticker}
                onError={(e) => { e.currentTarget.src = "/icon.png"; }}
                style={{ width: 32, height: 32, borderRadius: "50%", marginRight: 10 }}
              />
              <Styled.Ticker>{acao.ticker}</Styled.Ticker>
            </div>
            <Styled.Preco>{acao.price}</Styled.Preco>
            <Styled.Variacao $variation={acao.variation}>
              {acao.variation > 0 && <TrendingUp size={16} />}
              {acao.variation < 0 && <TrendingDown size={16} />}
              {acao.variation === 0 && <Minus size={16} />}
              {acao.variation}%
            </Styled.Variacao>
            <Styled.Descricao onClick={toggleExpandir} style={{ cursor: "pointer" }}>
              {expandido ? acao.description : limitarTexto(acao.description)}
            </Styled.Descricao>
          </Styled.Card>
        ))}
      </Styled.Grid>
    </MainLayout>
  );
}

const Styled = {
  Descricao: styled.p`
    font-size: 14px;
    color: #a4b0be;
    margin-bottom: 10px;
  `,

  LoadingWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
  `,

  LoadingBar: styled.div`
    width: 80%;
    height: 8px;
    background: #2f3640;
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 40%;
      background: linear-gradient(90deg, #00ffab, #00b894);
      animation: loading 1.5s infinite;
    }

    @keyframes loading {
      0% {
        left: -40%;
      }
      50% {
        left: 30%;
      }
      100% {
        left: 100%;
      }
    }
  `,

  LoadingText: styled.p`
    margin-top: 12px;
    color: #24262cff;
    font-size: 14px;
    font-style: italic;
  `,

  Title: styled.h6`
    font-size: 24px;
    margin-bottom: 24px;
    font-weight: 700;
    color: #1e272e;
    text-align: center;
  `,
  
  Grid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding-bottom: 80px; /* espaço p/ footer */
  `,

  Card: styled.div`
    background: #1e1e2f;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    transition: all 0.2s ease;
    border-left: 6px solid ${({ $variation }) =>
      $variation > 0 ? "#00c853" : $variation < 0 ? "#d32f2f" : "#9e9e9e"};

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 14px rgba(0,0,0,0.15);
    }
  `,

  Ticker: styled.p`
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 12px;
    letter-spacing: 1px;
  `,

  Preco: styled.p`
    font-size: 18px;
    color: #d1d8e0;
    margin-bottom: 8px;
  `,

  Variacao: styled.p`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 16px;
    color: ${({ $variation }) =>
      $variation > 0 ? "#00e676" : $variation < 0 ? "#ef5350" : "#b0bec5"};
  `,
};

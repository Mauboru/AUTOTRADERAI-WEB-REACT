import { useEffect, useState } from "react";
import styled from "styled-components";
import MainLayout from "../layouts/MainLayout";
import { listarAcoes, getSaldo } from "../services/analise";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function Home() {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [saldo, setSaldo] = useState(null);
  const [cotacao, setCotacao] = useState(null);
  const [expandido, setExpandido] = useState(false);
  
  async function pegarCotacaoDolarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    const dataFormatada = `${dia}-${mes}-${ano}`;
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dataFormatada}'&$format=json`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
    return response.json();
  }

  async function pegarCotacaoDolarHojeOuAnterior() {
    let data = new Date();
    let tentativas = 0;

    while (tentativas < 7) {  
      const diaSemana = data.getDay();
      if (diaSemana !== 0 && diaSemana !== 6) {
        try {
          const dataResponse = await pegarCotacaoDolarData(data);
          if (dataResponse.value && dataResponse.value.length > 0) {
            return dataResponse.value[0];
          }
        } catch (e) {
          console.error('Erro ao buscar cotação:', e);
        }
      }
      data.setDate(data.getDate() - 1);
      tentativas++;
    }

    return null; 
  }

  const limitarTexto = (texto, limite = 150) => {
    if (!texto) return "";
    if (texto.length <= limite) return texto;
    return texto.slice(0, limite) + "...";
  };

  useEffect(() => {
    listarAcoes(10)
      .then(res => {
        console.log(res.data)
        setLista(res.data);
      })
      .catch(err => {
        setErro("Erro ao buscar ações");
      })
      .finally(() => {
        setCarregando(false);
      });
    getSaldo()
      .then(res => {
        setSaldo(res.data.saldo_disponivel);
      })
      .catch(err => console.log("Erro ao buscar saldo", err));
    pegarCotacaoDolarHojeOuAnterior()
      .then(res => {
        setCotacao(res);
      })
      .catch(err => console.log("Erro ao buscar cotação", err));
  }, []);

  const convertFormatDollar = (value) => {
    if (!cotacao || !cotacao.cotacaoVenda) return 'R$ 0,00';
    return `R$ ${(value * cotacao.cotacaoVenda).toFixed(2)}`;
  };

  const toggleExpandir = () => setExpandido(!expandido);

  return (
    <MainLayout>
      <Styled.Header>
        <Styled.Title>Ações</Styled.Title>
        {saldo !== null && (
          <Styled.SaldoBox>
            <p>Saldo disponível</p>
            <h2>R$ {saldo.toFixed(2)}</h2>
          </Styled.SaldoBox>
        )}
      </Styled.Header>

      {carregando && (
        <Styled.LoadingWrapper>
          <Styled.LoadingBar />
          <Styled.LoadingText>Buscando ações e atualizando mercado...</Styled.LoadingText>
        </Styled.LoadingWrapper>
      )}

      {erro && <p>{erro}</p>}

      <Styled.Grid>
        {lista.map((acao, i) => (
          <Styled.Card key={i} $variacao={acao.variacao}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <img
                src={`https://logo.clearbit.com/${acao.ticker.replace(".SA", "").toLowerCase()}.com`}
                alt={acao.ticker}
                onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                style={{ width: 32, height: 32, borderRadius: "50%", marginRight: 10 }}
              />
              <Styled.Ticker>{acao.ticker}</Styled.Ticker>
            </div>
            <Styled.Preco>{convertFormatDollar(acao.preco)}</Styled.Preco>
            <Styled.Variacao $variacao={acao.variacao}>
              {acao.variacao > 0 && <TrendingUp size={16} />}
              {acao.variacao < 0 && <TrendingDown size={16} />}
              {acao.variacao === 0 && <Minus size={16} />}
              {acao.variacao}%
            </Styled.Variacao>
            <Styled.Descricao onClick={toggleExpandir} style={{ cursor: "pointer" }}>
              {expandido ? acao.descricao : limitarTexto(acao.descricao)}
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
    border-left: 6px solid ${({ $variacao }) =>
      $variacao > 0 ? "#00c853" : $variacao < 0 ? "#d32f2f" : "#9e9e9e"};

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
    color: ${({ $variacao }) =>
      $variacao > 0 ? "#00e676" : $variacao < 0 ? "#ef5350" : "#b0bec5"};
  `,
};

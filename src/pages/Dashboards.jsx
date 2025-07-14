import MainLayout from "../layouts/MainLayout";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { analise } from "../services/analise";

export default function Dashboards() {
  const [acao, setAcao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarAcoes = async () => {
      try {
        const resposta = await analise();
        console.log(resposta)
        setAcao(resposta.data);
      } catch (err) {
        setErro("Erro ao buscar dados do backend.");
      } finally {
        setLoading(false);
      }
    };

    buscarAcoes();
  }, []);

  return (
    <MainLayout>
      <Styled.Container>
        <Styled.Title>Resultado da Análise</Styled.Title>

        {loading && <p>Carregando...</p>}
        {erro && <p>{erro}</p>}

        {!loading && !erro && acao && acao.dados && (
          <Styled.Item $tipo={acao.dados.decisao.toLowerCase()}>
            <strong>{acao.dados.decisao.toUpperCase()}</strong> — {acao.dados.acao} — R$ {acao.dados.preco_medio}
            <br />
            Quantidade: {acao.dados.quantidade}
            <br />
            <em>{acao.dados.obs}</em>
          </Styled.Item>
        )}
      </Styled.Container>
    </MainLayout>
  );
}

const Styled = {
  Container: styled.div`
    padding: 2rem;
  `,

  Title: styled.h2`
    margin-bottom: 1rem;
  `,

  Item: styled.div`
    background-color: ${({ $tipo }) =>
      $tipo === "comprar"
        ? "#d4edda"
        : $tipo === "vender"
        ? "#f8d7da"
        : "#e2e3e5"};
    border: 1px solid #ccc;
    border-left: 6px solid
      ${({ $tipo }) =>
        $tipo === "comprar"
          ? "green"
          : $tipo === "vender"
          ? "red"
          : "gray"};
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
  `,
};

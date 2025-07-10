import styled from "styled-components";
import Footer from "../components/layouts/Footer";

export default function MainLayout({ children }) {
    return (
      <Wrapper>
        <Main>
          <Footer/>
          <Content>{children}</Content>
        </Main>
      </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const Content = styled.main`
  flex: 1;
  background-color: #f2f2f2;
  padding: 2rem;
  overflow-y: auto;
  height: 100%;
`;

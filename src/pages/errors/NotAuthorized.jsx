import { Link } from "react-router-dom";

export default function NotAuthorized() {
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#111",
            color: "#fff",
            textAlign: "center",
            padding: "2rem"
        }}>
            <h1 style={{ fontSize: "4rem" }}>401</h1>
            <p style={{ fontSize: "1.5rem" }}>Não Autorizado!</p>
            <Link to="/" style={{
                marginTop: "1rem",
                padding: "0.5rem 1.5rem",
                background: "#007bff",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px"
            }}>
                Voltar para Tela Anterior
            </Link>
        </div>
    );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Actions from "../pages/Actions";
import Commands from "../pages/Commands";
import NotFound from "../pages/errors/NotFound";
import NotAuthorized from "../pages/errors/NotAuthorized";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Login público */}
                <Route path="/" element={<Actions />} />

                {/* Rota de erro */}
                <Route path="/not-authorized" element={<NotAuthorized />} />
                <Route path="*" element={<NotFound />} />

                <Route path="/commands" element={<Commands />} />
            </Routes>
        </Router>
    );
}
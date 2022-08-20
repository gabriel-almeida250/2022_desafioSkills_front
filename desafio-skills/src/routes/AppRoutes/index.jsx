import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import Login from "../../pages/Login";
import Home from "../../pages/Home";
import { useContext } from "react";

import { AuthProvider, AuthContext } from "../../contexts/auth";
import Register from "../../pages/Register";
import Footer from "../../components/Footer";

const AppRoutes = () => {
    const Private = ({children}) => {
        const { authenticated, loading } = useContext(AuthContext);
        
        if (loading) {
            return <div className="loading">Carregando...</div>;
        }

        if (!authenticated) {
            return <Navigate to="/login" />;
        }

        return children;
    }

    return (
        <Router>
            <AuthProvider>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/registro" element={<Register />} />
                <Route exact path="/" element={<Private><Home /></Private>} />
            </Routes>
            <Footer />
        </AuthProvider>
        </Router>
    )
}

export default AppRoutes;
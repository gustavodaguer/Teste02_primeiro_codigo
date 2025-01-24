import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import ClientesPage from "./pages/ClientesPage";
import VendasPage from "./pages/VendasPage";
import EstoquePage from "./pages/EstoquePage";
import ContasReceberPage from "./pages/ContasReceberPage";
import ContasPagarPage from "./pages/ContasPagarPage";
import FornecedoresPage from "./pages/FornecedoresPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute
            path="/clientes"
            component={ClientesPage}
            role="Gerente"
          />
          <PrivateRoute path="/vendas" component={VendasPage} role="Caixa" />
          <PrivateRoute
            path="/estoque"
            component={EstoquePage}
            role="Gerente"
          />
          <PrivateRoute
            path="/contas-a-receber"
            component={ContasReceberPage}
            role="Gerente"
          />
          <PrivateRoute
            path="/contas-a-pagar"
            component={ContasPagarPage}
            role="Gerente"
          />
          <PrivateRoute
            path="/fornecedores"
            component={FornecedoresPage}
            role="Admin"
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

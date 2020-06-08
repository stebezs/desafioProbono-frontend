import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/lawyer.jpg";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    cpf: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { cpf, password } = this.state;
    if (!cpf || !password) {
      this.setState({ error: "Preencha o campo de CPF e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/sessions", { cpf, password });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
        <h1>PROBONO </h1>
          <img src={Logo} alt="layer image" />
          {this.state.error && <p>{this.state.error}</p>}
          <h3>CPF</h3>
          <input
            type="cpf"
            placeholder="CPF"
            onChange={e => this.setState({ cpf: e.target.value })}
          />
          <h3>Senha</h3>
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Form } from "./styles";

import api from "../../services/api";

class AddProperty extends Component {
  state = {
    lawyer: "",
    represented: "",
    progress: "",
   };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { lawyer, represented, progress} = this.state;

      if (!lawyer || !represented || !progress) {
        this.setState({ error: "Preencha todos os campos" });
        return;
      }

      const {
        data: { id }
      } = await api.post("/process", {
        lawyer,
        represented,
        progress,
      });
     
      this.props.history.push("/app");
    } catch (err) {
      this.setState({ error: "Ocorreu algum erro ao adicionar um processo" });
    }
  };

  handleCancel = e => {
    e.preventDefault();

    this.props.history.push("/app");
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Cadastrar um processo</h1>
        <hr />
        {this.state.error && <p>{this.state.error}</p>}
        <input
          type="text"
          placeholder="Advogado Responsável"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Representado"
          onChange={e => this.setState({ address: e.target.value })}
        />
        <input
          type="decimal"
          placeholder="Andamento"
          onChange={e => this.setState({ price: e.target.value })}
        />
        <div className="actions">
          <button type="submit">Adicionar</button>
          <button onClick={this.handleCancel} className="cancel">
            Cancelar
          </button>
        </div>
      </Form>
    );
  }
}

export default withRouter(AddProperty);

import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";

import { Form, Container } from "./styles";

class Profile extends Component {

    state = {
        redirect: false
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect from='/Profile' to="/SignUp" />
        }
    }

    render() {
        return (
            <Container>
                <Form >
                    <h1>Quem é você? </h1>
                    <br/>
                    <button onClick={this.setRedirect} >Sou um advogado</button>
                    <br/>
                    <button type="submit">Sou um cliente</button>
                </Form>
            </Container>
        );
    }
}

export default withRouter(Profile);

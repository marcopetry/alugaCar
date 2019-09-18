import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

export default class Cabecalho extends Component {

    constructor(props) {
        super(props);
        this.state = { TipoUsuario: ''};
        this.definirUsuario = this.definirUsuario.bind(this);
        this.deslogar = this.deslogar.bind(this);
        this.setLogado = this.setLogado.bind(this);
        this.setAdm = this.setAdm.bind(this);
    }

    render() {
        console.log("renderizou")
        return (
            
            <Navbar bg="secondary" expand="lg">
            <Navbar.Brand href="/">Aluguel de carros</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/carro">Carros</Nav.Link>
                    <Nav.Link href="/listar_carros">Reservas</Nav.Link>
                    <Nav.Link href="/cadastro">Cadastrar</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>   
                    <Button as="input" type="button" value="Sair" onClick={this.deslogar} />
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}
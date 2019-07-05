import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'

export default class Cabecalho extends Component {
    render() {
        return (
            <Navbar bg="secondary" expand="lg">
            <Navbar.Brand href="/">Aluguel de carros</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/inserir_carro">Carros</Nav.Link>
                    <Nav.Link href="/listar_carros">Reservas</Nav.Link>
                    <Nav.Link href="/cadastro">Cadastrar</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}
import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

import firebase from '../Firebase/Firebase'

export default class Cabecalho extends Component {

    constructor(props) {
        super(props);
        this.state = { logado: true, adm: true};
        this.setLogado = this.setLogado.bind(this);
        this.setAdm = this.setAdm.bind(this);
    }

    setLogado() {
        this.setState({logado: !this.state.logado});
    }

    setAdm(){
        this.setState({adm: !this.state.adm})        
    }


    deslogar(){
        firebase.auth().signOut();   
        
    }

    teste() {
        if(this.state.logado === true){
            console.log('if');
            return (
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav.Link href="/listar_carros">Reservas</Nav.Link>
                    
                    <Nav.Link href="/cadastro">Cadastrar</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Button as="input" type="button" value="Sair" onClick={this.deslogar} />
                </Navbar.Collapse>
            );

        } else {
            return (
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link href="/cadastro">Cadastrar</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
            </Navbar.Collapse>

            );
        }


    }

    render() {
        return (
            <Navbar bg="secondary" expand="lg">
            <Navbar.Brand href="/">Aluguel de carros</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/inserir_carro">Carros</Nav.Link>
                    {this.teste()}                    
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}
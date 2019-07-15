import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import firebase from '../Firebase/Firebase'

export default class Cabecalho extends Component {

    constructor(props){

        super(props);
        this.state = {Id_Usuario: '', Email: '', TIpo_Usuario: 'desc'};
        this.deslogar = this.deslogar.bind(this);
    }

    componentWillMount(){

        firebase.auth().onAuthStateChanged(function(user) {

            if(user){

                console.log('usuario logado');
            }else{
                sessionStorage.setItem('TipoUsuario', 'desc')
            }
            
     
        });
     
        let tipoUsuario = sessionStorage.getItem('TipoUsuario');
        if(!tipoUsuario){
            tipoUsuario = 'desc';            
        }

        
        this.setState({
            TIpo_Usuario: tipoUsuario
        });
    
        
    }
    
    componentDidMount(){

        firebase.auth().onAuthStateChanged((user) => {

            if(user){

                console.log('usuario logado');
            }else{
                sessionStorage.setItem('TipoUsuario', 'desc')
            }
            
     
        });
     
        let tipoUsuario = sessionStorage.getItem('TipoUsuario');
        if(!tipoUsuario){
            tipoUsuario = 'desc';            
        }

        console.log(tipoUsuario)
        this.setState({
            TIpo_Usuario: tipoUsuario
        });
    }    

    deslogar(){
        firebase.auth().signOut();
        alert('deslogou');
        sessionStorage.setItem('TipoUsuario', 'desc');
        sessionStorage.setItem('Email', '');
        sessionStorage.setItem('idUsuario', '');
        this.setState({
            TIpo_Usuario: 'desc'
        });
        window.location.href = "/";
    }

    render() {

        if(sessionStorage.getItem('TipoUsuario') === 'cliente'){
            return(
                <Navbar bg="secondary" expand="lg">
                <Navbar.Brand href="/">Aluguel de carros</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/carros">Carros</Nav.Link>
                        <Button as="input" type="button" value="Sair" onClick={this.deslogar} />
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            );
        }

        if(sessionStorage.getItem('TipoUsuario') === 'adm'){
            return(
                <Navbar bg="secondary" expand="lg">
                    <Navbar.Brand href="/">Aluguel de carros</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/carros">Carros</Nav.Link>
                            <Nav.Link href="/inserir_carro">Inserir Carro</Nav.Link>   
                            <Button as="input" type="button" value="Sair" onClick={this.deslogar} />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>       
            );
        }

        return (
            
      
                <Navbar bg="secondary" expand="lg">
                <Navbar.Brand href="/">Aluguel de carros</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/cadastrar">Cadastrar</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
      
        );
    }
}

class CabecalhoADM extends Component {

    render(){
        return(
            <Navbar bg="secondary" expand="lg">
                <Navbar.Brand href="/">Aluguel de carros</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/carros">Carros</Nav.Link>
                        <Nav.Link href="/inserir_carro">Inserir Carro</Nav.Link>   
                        <Button as="input" type="button" value="Sair" onClick={this.props.deslogar} />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>       
        );
    }
}

class CabecalhoCliente extends Component{

    render(){
        return(
            <Navbar bg="secondary" expand="lg">
            <Navbar.Brand href="/">Aluguel de carros</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/carros">Carros</Nav.Link>
                    <Button as="input" type="button" value="Sair" onClick={this.props.deslogar} />
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

class CabecalhoNaoIdentificado extends Component{

    render(){
        return(
            <Navbar bg="secondary" expand="lg">
            <Navbar.Brand href="/">Aluguel de carros</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/cadastrar">Cadastrar</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}
import React, { Component } from 'react';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import firebase from '../../Firebase/Firebase';
import { corFundo, styleLogo } from '../Home/const';

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
        return (
        
            <Navbar style={corFundo} expand="lg">
            <Navbar.Brand href="/">
                <Image src="imagens/logoNovo.png" style={styleLogo}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto mr-3">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/cadastrar">Cadastrar</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

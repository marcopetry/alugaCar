import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Banco from '../Firebase/ApiBanco' 
import { Redirect } from 'react-router-dom';
import Carro from '../adm/Carro';
import Cabecalho from '../adm/CabecalhoADM';

export default class FormLogin extends Component {

    
    constructor(props) {
        super(props);
        this.state = {Email: '', Senha: '', logado: false};
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);   
        this.logar = this.logar.bind(this);
    }

    setEmail(e) {
        this.setState({Email: e.target.value});
    }
    
    setSenha(e) {
        this.setState({Senha: e.target.value});
    }

    logar(event){
        event.preventDefault();
        
        let email = this.state.Email.trim();
        let senha = this.state.Senha.trim();

        Banco.login(email, senha);
        this.setState({logado: true})
        
    }


    render () {
        /* if(this.state.logado){            
            return (
                //window.location.href = "/"
                <Redirect to="/"/>
            );
        }
        else { */
            return (
                <div>
                <Form className="col-6 m-auto pt-5" onSubmit={this.logar}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => this.setEmail(e)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" onChange={e => this.setSenha(e)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="dark" type="submit" className="col-6 mt-3">
                        Logar
                    </Button>
                </Form>
                </div>
            );
       // }
    }
}
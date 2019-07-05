import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from '../Firebase/Firebase';

export default class FormCadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Nome: '',
            Email: '',
            CPF: '', 
            Estado: '',
            Cidade: '', 
            Senha: '',
            Adm: false
        };

        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setCPF = this.setCPF.bind(this);
        this.setEstado = this.setEstado.bind(this);
        this.setCidade = this.setCidade.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
    }

    setNome(e) {
        this.setState({Nome: e.target.value});
    }

    setEmail(e) {
        this.setState({Email: e.target.value});
    }

    setCPF(e) {
        this.setState({CPF: e.target.value});
    }

    setEstado(e) {
        this.setState({Estado: e.target.value});
    }

    setCidade(e) {
        this.setState({Cidade: e.target.value});
    }

    setSenha(e) {
        this.setState({Senha: e.target.value});
    }

    cadastrar(event) {
        event.preventDefault();

        let Nome = this.state.Nome.trim();
        let Email = this.state.Email.trim();
        let CPF = this.state.CPF.trim();
        let Estado = this.state.Estado.trim();
        let Cidade = this.state.Cidade.trim();
        let Senha = this.state.Senha.trim();        

        firebase.auth().createUserWithEmailAndPassword(Email, Senha)
            .then(() => {
                alert("Cadastro feito com sucesso!");
                window.location.href = "/login";
            })
            .catch( erro => {
                //tratar erro no login
                alert("Erro ao cadastrar!!");
            });

        firebase.database().ref("Cliente").push(
            {
                Nome: Nome, 
                Email: Email, 
                CPF: CPF,
                Estado: Estado, 
                Cidade: Cidade, 
                Senha: Senha,
                Adm: false                
            }
        ).catch((erro) => console.log(erro));
                
    }


    render () {
        return (
            <Form className="col-8 pt-5 m-auto" onSubmit={this.cadastrar}>
                <Form.Group controlId="nome-cadastro">
                    <Form.Label>Nome completo:</Form.Label>
                    <Form.Control type="text" placeholder="Digite seu nome" onChange={e => this.setNome(e)}/>
                </Form.Group>

                <Form.Group controlId="email-cadastro">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Digite seu email" onChange={e => this.setEmail(e)}/>
                </Form.Group>

                <Form.Group controlId="cpf-cadastro">
                    <Form.Label>CPF:</Form.Label>
                    <Form.Control type="text" placeholder="Digite seu CPF" onChange={e => this.setCPF(e)}/>
                </Form.Group>
                
                <Form.Group controlId="estado-cadastro">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control as="select" onChange={e => this.setEstado(e)}>
                        <option value="Paraná">Paraná</option>
                        <option value="Santa Catarina">Santa Catarina</option>
                        <option value="Rio Grande do Sul">Rio Grande do Sul</option>                    
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="cidade-cadastro">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control as="select" onChange={e => this.setCidade(e)}>
                        <option value="Dois Vizinhos">Dois Vizinhos</option>
                        <option value="Franscisco Beltrão">Franscisco Beltrão</option>
                        <option value="Parobé">Parobé</option>
                        <option value="Florianópolis">Florianópolis</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="senha-cadastro">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Digite uma senha" onChange={e => this.setSenha(e)}/>
                </Form.Group>

                <Button variant="dark" type="submit" className="col-6 mt-3">
                    Cadastrar
                </Button>
                
          </Form>
        );
    }
}
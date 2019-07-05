import React, { Component } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import firebase from '../Firebase/Firebase';

export default class FormCadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Modelo: '',
            Ano: '',
            Placa: '', 
            Cor: '',
            Valor: ''            
        };

        this.setModelo = this.setModelo.bind(this);
        this.setAno = this.setAno.bind(this);
        this.setPlaca = this.setPlaca.bind(this);
        this.setCor = this.setCor.bind(this);
        this.setValor = this.setValor.bind(this);

        this.cadastrar = this.cadastrar.bind(this);
    }

    setModelo(e) {
        this.setState({Modelo: e.target.value});
    }

    setAno(e) {
        this.setState({Ano: e.target.value});
    }

    setPlaca(e) {
        this.setState({Placa: e.target.value});
    }

    setCor(e) {
        this.setState({Cor: e.target.value});
    }

    setValor(e) {
        this.setState({Valor: e.target.value});
    }
    
    cadastrar(event) {
        event.preventDefault();

        let Modelo = this.state.Modelo.trim();
        let Ano = this.state.Ano.trim();
        let Placa = this.state.Placa.trim();
        let Cor = this.state.Cor.trim();
        let Valor = this.state.Valor.trim();        
        
        firebase.database().ref("Carro").push(
            {
                Modelo: Modelo,
                Ano: Ano,
                Placa: Placa,
                Cor: Cor,
                Valor: Valor
            }
        ).then(() => {                                    
            alert('Veículo cadastrado com sucesso!');      
            this.limpar_campos();      
        })
        .catch( erro => {
            alert('Problemas no cadastro do veículo');
            console.log(erro);
        })
        //Preciso redirecionar
    }

    limpar_campos() {
        this.setState({
            Modelo: '',
            Ano: '',
            Placa: '', 
            Cor: '',
            Valor: ''            
        });
    }

    render () {
        return (
            <Form className="col-8 pt-5 m-auto" onSubmit={this.cadastrar}>
                <Form.Group controlId="modelo-carro">
                    <Form.Label>Modelo:</Form.Label>
                    <Form.Control type="text" placeholder="Digite o modelo do carro" value={this.state.Modelo} onChange={this.setModelo}/>
                </Form.Group>

                <Form.Group controlId="ano-carro">
                    <Form.Label>Ano:</Form.Label>
                    <Form.Control type="text" placeholder="Digite o ano do carro" value={this.state.Ano} onChange={this.setAno}/>
                </Form.Group>

                <Form.Group controlId="placa-carro">
                    <Form.Label>Placa:</Form.Label>
                    <Form.Control type="text" placeholder="Digite a placa do carro" value={this.state.Placa} onChange={this.setPlaca}/>
                </Form.Group>
                
                <Form.Group controlId="cor-carro">
                    <Form.Label>Cor:</Form.Label>
                    <Form.Control as="select" value={this.state.Cor} onChange={this.setCor}>
                        <option value="Branco">Branco</option>
                        <option value="Cinza">Cinza</option>
                        <option value="Preto">Preto</option>                    
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="valor-carro">
                    <Form.Label>Valor:</Form.Label>
                    <Form.Control type="text" placeholder="Digite o valor do carro" value={this.state.Valor} onChange={this.setValor} />                                            
                </Form.Group>

                <Button variant="dark" type="submit" className="col-6 mt-3">
                    Cadastrar
                </Button>
                
          </Form>
        );
    }
}

export class ListaCarros extends Component {

    constructor(props) {
        super(props);
        this.state = {Carros_Cadastrados: []};
    }

    componentDidMount() {
        let lista_carros = [];
        firebase.database().ref('Carro').on("child_added", (snapshot, prevChildKey) => {
            let carro = snapshot.val();
            console.log(snapshot);            
            lista_carros.push(carro);
            this.setState({Carros_Cadastrados: lista_carros});                                    
        });
    }

    render () {
        return (
            <div className="col-10 m-auto pt-5">          
                <h1>Carros disponíveis</h1>      
                <Table striped bordered hover size="sm">                    
                    <thead>                    
                        <tr>
                            <th>Modelo</th>
                            <th>Ano</th>
                            <th>Cor</th>
                            <th>Valor da diária</th>
                        </tr>
                    </thead>
                    <tbody>                                        
                        {

                            this.state.Carros_Cadastrados.map( Carros_Cadastrados => {                                
                                return (
                                    
                                    <tr key={Carros_Cadastrados.key}>                                        
                                        <td>{Carros_Cadastrados.Modelo}</td>
                                        <td>{Carros_Cadastrados.Ano}</td>
                                        <td>{Carros_Cadastrados.Cor}</td>
                                        <td>{Carros_Cadastrados.Valor}</td>                                                                                
                                    </tr>                                    
                                );
                            })
                        }                                           
                    </tbody>
                </Table>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Banco from '../Firebase/ApiBanco';
import Cabecalho from './CabecalhoADM';

export default class CadastroCarro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Modelo: '',
            Ano: '',
            Placa: '', 
            Cor: '',
            Valor: '', 
            Editar: false            
        };

        this.setModelo = this.setModelo.bind(this);
        this.setAno = this.setAno.bind(this);
        this.setPlaca = this.setPlaca.bind(this);
        this.setCor = this.setCor.bind(this);
        this.setValor = this.setValor.bind(this);

        this.cadastrar = this.cadastrar.bind(this);
    }

    componentWillMount() {
                
        if(this.props.Carro !== null && this.props.Carro !== undefined) {
            this.setState({
                Modelo: this.props.Carro.Carro.Modelo,
                Ano: this.props.Carro.Carro.Ano,
                Placa: this.props.Carro.Carro.Placa, 
                Cor: this.props.Carro.Carro.Cor,
                Valor: this.props.Carro.Carro.Valor, 
                Editar: true
            });
        }
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
        
        if(this.state.Editar){
            Banco.editarCarro(this.props.Carro.Chave, Modelo, Ano, Placa, Cor, Valor);
        } else {
            Banco.cadastrarNovoCarro(Modelo, Ano, Placa, Cor, Valor);
        }
        
        this.limpar_campos();
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
            <div>
                    <Form className="col-8 pt-5 m-auto" onSubmit={this.cadastrar}>
                        <h1>{this.props.msg}</h1>
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
                                <option >Selecione cor</option>
                                <option value="Branco">Branco</option>
                                <option value="Cinza">Cinza</option>
                                <option value="Preto">Preto</option>                    
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId="valor-carro">
                            <Form.Label>Valor:</Form.Label>
                            <Form.Control type="text" placeholder="Digite o valor do carro" value={this.state.Valor} onChange={this.setValor} />                                            
                        </Form.Group>
                        <Button as="input" type="submit" value="Salvar" variant="dark" className="mr-3" />            
                        <Button as="input" type="button" value="Cancelar" variant="dark" onClick={this.props.cancelar} className="mr-3" />

                </Form>
          </div>
        );
    }   
}

//---------------------------------------------------

export class InserirData extends Component {

    constructor(props) {

        super(props);
        this.state = {
            Data: '',
            Hora: '', 
        }

        this.setData = this.setData.bind(this);
        this.setHora = this.setHora.bind(this);
        this.inserirData = this.inserirData.bind(this);
    }

    setData(e) {

        this.setState({Data: e.target.value})
    }
    
    setHora(e) {

        this.setState({Hora: e.target.value})
    }

    inserirData() {
        
        Banco.inserirCarroDataDisponivel(this.props.Carro.Chave, this.state.Data, this.state.Hora);
        this.setState({
            Data: '',
            Hora: ''
        })
    }

    render () {
       
        return (

            <div className="col-8 m-auto pt-5">
                <h1>Lançar carro para reserva:</h1>
                <h2>Modelo: {this.props.Carro.Carro.Modelo}</h2>
                <h3>Ano:{this.props.Carro.Carro.Ano}</h3>
                <h3>Cor:{this.props.Carro.Carro.Cor}</h3>
                <h3>Valor:{this.props.Carro.Carro.Valor}</h3>
                <Form.Group controlId="data-carro" className="col-5">
                    <Form.Label>Data:</Form.Label>
                    <Form.Control type="date" placeholder="Digite a data disponível do carro" value={this.state.Data} onChange={this.setData}/>
                </Form.Group>
                <Form.Group controlId="hora-carro" className="col-5">
                    <Form.Label>Hora:</Form.Label>
                    <Form.Control type="time" placeholder="Digite a hora disponível do carro" value={this.state.Hora} onChange={this.setHora}/>
                </Form.Group>
                <Button as="input" type="button" value="Inserir" variant="secondary" onClick={this.inserirData} className="mr-3" />
                <Button as="input" type="button" value="Voltar" variant="secondary" onClick={this.props.cancelar} className="mr-3" />                        
            </div>
        );
    } 
}

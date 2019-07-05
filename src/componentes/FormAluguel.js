import React, { Component } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import firebase from '../Firebase/Firebase';

import FormCarro from './FormCarro';

export default class FormAluguel extends Component {

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
            <div>
                <FormCarro />
            </div>
        );
    }
}

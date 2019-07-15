/* import React, { Component } from 'react';
import TabelaCarros from './TabelaCarros';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Banco from '../Firebase/ApiBanco'

export default class FormReservar extends Component {

    constructor(props){
        super(props);
        this.state = {Carros_Cadastrados: [], CarroSelecionado: '', TodasDatas: [], Acao: false};
        this.ChaveCarro = this.ChaveCarro.bind(this);
        this.ChamarAcao = this.ChamarAcao.bind(this);
    }

    componentWillMount(){
        const buscaCarros = async () => {
            const carros = await Banco.buscarCarros();
            return carros;
        };
        
        buscaCarros()
            .then(res => {
                this.setState({Carros_Cadastrados: res});
            });     
            
        const datas = async () => {
            const datas = await Banco.buscarDatasDisponiveis();
            return datas;
        };

        datas().then( res => {
            console.log('Datas', res);
            this.setState({TodasDatas: res});
        });
    }

      
    ChaveCarro(chave){
        this.setState({CarroSelecionado: chave});                
    }

    ChamarAcao(){

        this.setState({Acao: !this.state.Acao});
    }   

    render () {
        console.log(this.state.CarroSelecionado);

        if(this.state.Acao){
            return <AcoesCliente />
        }
        return (            
            <div className="col-8 m-auto pt-5">                    
                <h1>Selecione um carro</h1>
                <TabelaCarros Carros_Cadastrados={this.state.Carros_Cadastrados} CarroSelecionado={this.ChaveCarro} Acao={this.ChamarAcao}/>
            </div>            
        );
    }
}



//============================================================================================================================================

class AcoesCliente extends Component {

    constructor(props){
        super(props);
    }

    render () {
        return (

        );
    }
}


 */
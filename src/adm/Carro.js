import React, { Component } from 'react';
import { Button, ButtonToolbar, Table, Form, Modal, Jumbotron } from 'react-bootstrap';
import TabelaCarros, { TabelaHorarios } from '../componentes/TabelaCarros';
import CadastroCarro from './CadastroCarro';
import { InserirData } from './CadastroCarro';
import Banco from '../Firebase/ApiBanco'
import { dadosRelatorio } from '../helper/helper';
import Cabecalho from './CabecalhoADM';
import { Redirect } from 'react-router-dom';

export default class Carro extends Component {

    constructor(props) {
        super(props);
        this.state = {Carros_Cadastrados: [], CarroSelecionado: '', TodasDatas: [], Acao: false, ADM: false};
        this.ChaveCarro = this.ChaveCarro.bind(this);
        this.ChamarAcao = this.ChamarAcao.bind(this);
    }

    componentWillMount(){

        if(sessionStorage.getItem('TipoUsuario') === 'adm'){
            this.setState({
                ADM: true
            })
        }
        
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
            this.setState({TodasDatas: res});
        });

        /*const buscaCarros = async () => {
            const carros = await Banco.buscarCarros();
            return carros;
        };
        
        buscaCarros()
            .then(res => {
                this.setState({Carros_Cadastrados: res});
            });   */
    }

    ChaveCarro(chave){
        this.setState({CarroSelecionado: chave});                
    }

    ChamarAcao(){

        this.setState({Acao: !this.state.Acao});
    }   

    render () {

        if(this.state.Acao) {
            if(this.state.ADM){
                return (

                    <AcoesCarroADM ChaveCarro={this.state.CarroSelecionado} Carros_Cadastrados={this.state.Carros_Cadastrados} Acao={this.ChamarAcao} TodasDatas={this.state.TodasDatas} />
                );
            } else{
                return (

                    <AcoesCliente CarrosCadastrados={this.state.Carros_Cadastrados} CarroSelecionado={this.state.CarroSelecionado} Acao={this.ChamarAcao} TodasDatas={this.state.TodasDatas}/>
                );
            }
        } else {
            return (

                <div className="col-8 m-auto pt-5">
                    <TabelaCarros Carros_Cadastrados={this.state.Carros_Cadastrados} CarroSelecionado={this.ChaveCarro} Acao={this.ChamarAcao}/>
                </div>
                
            );
            
        }
        
    }

}


//=======================================================================================================================

export class AcoesCarroADM extends Component {

    constructor(props) {
        super(props);
        this.state = {Carro: '', Editar: false, Reservas: false};
        this.editar = this.editar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.inserirData = this.inserirData.bind(this);
        this.verReservas = this.verReservas.bind(this);
    }

    editar(){

        this.setState({Editar: true});
    } 

    inserirData(){

        this.setState({Carro: this.pegarCarro(this.props.ChaveCarro)})
    }

    excluir() {
        
        Banco.excluirCarro(this.props.ChaveCarro);
    }

    verReservas(){

        this.setState({Reservas: true});       
    } 

    //Retorna uma lista com as datas do carro
    DatasCarro(carro) {
                
        return Banco.buscarListaReservas(carro.Chave);
    }

    pegarCarro() {
        let carro;
        this.props.Carros_Cadastrados.map(carros => {
            if(carros.Chave === this.props.ChaveCarro) {
                carro = carros;                
            }
        })
        return carro;
    } 

    render(){        

        const carro = this.pegarCarro(this.props.ChaveCarro); 
        
        if(this.state.Editar){

            return <CadastroCarro Carro={carro} cancelar={this.props.Acao} msg="Editar Carro:"/>
        }
    
        if(this.state.Carro !== ''){

            return <InserirData Carro={this.state.Carro} cancelar={this.props.Acao}/>
        }
    
        if(this.state.Reservas){

            const reservasCarro = this.DatasCarro(carro);
            console.log('datas carro', reservasCarro);
            return <VerTodasReservas carro={carro} cancelar={this.props.Acao} reservas={reservasCarro}/>                                
        }
        
        
        return (
            <div className="col-10 mt-5">
                <DadosCarro carro={carro} />        
                <BotoesADM editar={this.editar} excluir={this.excluir} inserirData={this.inserirData} Acao={this.props.Acao} verReservas={this.verReservas}/>
            </div>
        );
                
    }                   
}

class DadosCarro extends Component {

    render () {
        return (
            <div>
                <h1>Modelo: {this.props.carro.Carro.Modelo}</h1>
                <h2>Ano: {this.props.carro.Carro.Ano}</h2>
                <h2>Cor: {this.props.carro.Carro.Cor}</h2>
                <h2>Valor da diária: R$ {this.props.carro.Carro.Valor}</h2> 
            </div>
        );
    }
}

class BotoesADM extends Component {

    render(){
        return (
            <ButtonToolbar className="mt-5">                        
                <Button as="input" type="button" value="Editar" variant="secondary" className="mr-3" onClick={this.props.editar} />
                <Button as="input" type="button" value="Excluir" variant="secondary" className="mr-3" onClick={this.props.excluir}/>                        
                <Button as="input" type="button" value="Incluir Horário" variant="secondary" className="mr-3" onClick={this.props.inserirData}/>
                <Button as="input" type="button" value="Reservas" variant="secondary" className="mr-3" onClick={this.props.verReservas} />
                <Button as="input" type="button" value="Cancelar" variant="secondary" onClick={this.props.Acao} className="mr-3" />                                            
            </ButtonToolbar>                
        );
    }
}

class BotoesCliente extends Component {

    render() {
        return (
            <ButtonToolbar className="mt-5">                        
                <Button as="input" type="button" value="Excluir Reserva" variant="secondary" className="mr-3" onClick={this.props.excluir}/>                        
                <Button as="input" type="button" value="Ver Reservas" variant="secondary" className="mr-3" onClick={this.props.MinhasReservas} />
                <Button as="input" type="button" value="Cancelar" variant="secondary" onClick={this.props.Acao} className="mr-3" />                                            
            </ButtonToolbar>     
        );
    }
}

//CarrosCadastrados CarroSelecionado TodasDatas
class AcoesCliente extends Component {

    constructor(props){
        super(props);
        this.state ={CarroSelecionado: '', VerReservas: false, MinhasReservas: []}
        this.pegarCarro = this.pegarCarro.bind(this);
        this.MinhasReservas = this.MinhasReservas.bind(this);
    }

    componentWillMount(){

        const reservas = Banco.buscarReservasCliente();
        this.setState({
            MinhasReservas: reservas
        })
    }

    pegarCarro() {
        let carro;
        this.props.CarrosCadastrados.map(carros => {
            if(carros.Chave === this.props.CarroSelecionado) {
                carro = carros;                
            }
        })
        return carro;
    }
    
    DatasCarro(carro) {
                
        return Banco.buscarDatasCarro(carro.Chave);        
    }

    MinhasReservas() {

        this.setState({
            VerReservas: true
        });
    }

    render(){

        if(this.state.VerReservas){

            return(
                <ReservasCliente MinhasReservas={this.state.MinhasReservas}/>
            );
        }
        const carro = this.pegarCarro();
        const DatasDisponiveis = this.DatasCarro(carro);
        return(
                
            <div className="col-10 mt-5 m-auto">
                <DatasAluguel DatasDisponiveis={DatasDisponiveis} carro={carro}/>
                <BotoesCliente Acao={this.props.Acao} MinhasReservas={this.MinhasReservas}/>
            </div>
        );
    }

}

class DatasAluguel extends Component {

    constructor(props){
        super(props);
    }

    render() {
        
        return(
            <div>
                <h1>Datas Disponíveis</h1>
                <DadosCarro carro={this.props.carro} />
                <FormReserva carro={this.props.carro} datas={this.props.DatasDisponiveis} />
            </div>            
        );
    }
}


class FormReserva extends Component {

    constructor(props){
        super(props);
        this.state = {
            ChaveData: '', 
            Qtd_dias: '', 
            Confirmar: ''
        }
        
        this.setData = this.setData.bind(this);
        this.setQtd_dias = this.setQtd_dias.bind(this);
        this.reservar = this.reservar.bind(this);
        this.calcularValor = this.calcularValor.bind(this);
        this.gravarReserva = this.gravarReserva.bind(this);
    }

    setData(e){

        this.setState({ChaveData: e.target.value});
    }

    setQtd_dias(e){

        this.setState({Qtd_dias: e.target.value})
    }

    //chave do carro -- chave da data -- qtd dias -- calcular o total
    reservar(){

        let id = Banco.pegarIdUsuario();
        let valor = this.calcularValor();
        this.setState({Confirmar: false});        
    }

    calcularValor(){
        
        return this.props.carro.Carro.Valor * this.state.Qtd_dias;        
    }

    gravarReserva() {

        Banco.reservarCarro(this.props.carro.Chave, this.state.ChaveData, this.state.Qtd_dias, this.calcularValor());
        this.setState({Confirmar: true});
    }

    render(){        
        
        if(this.state.Confirmar === false){
            const dados = dadosRelatorio(this.props.carro, this.props.datas, this.state.ChaveData, this.state.Qtd_dias, this.calcularValor());
            return(
                <RelatorioConfirmacaoReserva dados={dados} confirma={this.gravarReserva} />
            );
        }

        if(this.state.Confirmar === true){
            return(
                <Redirect to="/" />
            );
        }
        
        if(this.state.Confirmar === ''){

            return(
                <div>
                    <Table striped bordered hover size="lg" variant="secondary" className="text-center">                    
                        <thead>                    
                            <tr>
                                <th>Selecione</th>
                                <th>Datas:</th>
                                <th>Hora:</th>
                                <th>QTD dias</th>                            
                            </tr>
                        </thead>
                        <tbody> 
                            
                            {    
                                this.props.datas.map( data => {
                                    return (
                                    
                                        <tr key={data.ChaveData}>
                                            <td>
                                                <Form.Check.Input 
                                                    value={data.ChaveData} 
                                                    type="radio" 
                                                    name="carro"
                                                    checked={this.state.ChaveData === data.ChaveData} 
                                                    onChange={this.setData}/>                                                     
                                            </td>
                                            <td>{data.Data.Data}</td>
                                            <td>{data.Data.Hora}</td>
                                            <td>
                                                <Form.Group controlId="form-reserva">
                                                    <Form.Control as="select" value={this.state.Qtd_dias} onChange={this.setQtd_dias}>
                                                        <option>0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </td>
                                        </tr>                                                                                                            
                                    );
                                })
                                
                            }                                           
                        </tbody>                
                    </Table>
                    <Button as="input" type="button" value="Reservar" variant="dark" onClick={this.reservar} className="mr-3" />                    
                </div>
            );
        }
    }
}


class RelatorioConfirmacaoReserva extends Component {

    render(){

        return(

            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de reserva:</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Dados da reserva</p>
                    <p>Modelo: {this.props.dados.Modelo}</p>
                    <p>Ano: {this.props.dados.Ano}</p>
                    <p>Cor: {this.props.dados.Cor}</p>
                    <p>Data: {this.props.dados.Data}</p>
                    <p>Hora: {this.props.dados.Hora}</p>
                    <p>Valor Diário: R$ {this.props.dados.Valor}</p>
                    <p>Quantidade de dias: {this.props.dados.Qtd_dias}</p>
                    <p>Valor total: R$ {this.props.dados.ValorTotal}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.confirma}>Confirmar</Button>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}

//cancelar={this.props.Acao} reservas={reservasCarro}
class VerTodasReservas extends Component {

    constructor(props){

        super(props);
        this.state = ({ListaReservas: []});
    }

    componentWillMount(){
        
        setTimeout(() => {
            this.setState({
                ListaReservas: this.props.reservas
            })
        }, 2000)
        
    }

    render(){

        console.log(this.state.ListaReservas);
        console.log(this.props.reservas);
        

        if(this.state.ListaReservas.length === 0) return <h1>Loading...</h1>

        return(
    
            <div>
                <DadosCarro carro={this.props.carro}/>
    
                {   
                    
                    this.props.reservas.map( info => {
                        console.log(info.Data.Cliente);
                        console.log(Banco.nomeCliente(info.Data.Cliente));
                        return (
    
                            <Jumbotron key={info.ChaveData}>
                                
                                <h1>Data: {info.Data.Data}</h1>
                                <h4>Hora: {info.Data.Hora}</h4>
                                <h5>Quantidade de dias: {info.Data.QTD_Dias}</h5>
                                <h5>Valor Total: {info.Data.Valor_Total}</h5>
                                <h4>Cliente: {info.Data.Usuario}</h4>
                            </Jumbotron>                
                        );
                    })
                }
            </div>
        );
        
    }
}

class ReservasCliente extends Component {

    constructor(props){

        super(props);
        this.state = {MinhasReservas: [], ChaveCarro: '', ChaveData: '', Cancelar: false};
        this.excluir = this.excluir.bind(this);
    }

    componentDidMount(){

        const reservas = Banco.buscarReservasCliente();
        setTimeout(() => {
            this.setState({MinhasReservas: reservas});
        }, 2000);
    }

    excluir(){

        const idCarro = this.state.ChaveCarro;
        const idData = this.state.ChaveData;
        console.log(idCarro);
        console.log(idData);
        Banco.cancelarReservaCarro(idCarro, idData);
    }

    render(){


        if(this.state.Cancelar === true){
            this.excluir();
            return (
                <h1>Entrou aqui</h1>
            );
        } 

        return (
            <div>
                {
                    this.state.MinhasReservas.map( reserva => {
                        console.log(reserva)
                        return(
                            
                            <Jumbotron key={reserva.ChaveData} >                
                                <h1>Data: {reserva.Reserva.Data}</h1>
                                <h4>Hora: {reserva.Reserva.Hora}</h4>
                                <h5>Quantidade de dias: {reserva.Reserva.QTD_Dias}</h5>
                                <h5>Valor Total: {reserva.Reserva.Valor_Total}</h5>
                                <h4>Carro: {reserva.Carro.Modelo}</h4>
                                <h4>Ano: {reserva.Carro.Ano}</h4>
                                <h4>Cor: {reserva.Carro.Cor}</h4>
                                <h4>Valor diário: {reserva.Carro.Valor}</h4>
                                <Button as="input" type="submit" value="Cancelar" variant="secondary" className="mt-5" onClick={e => this.setState({
                                    ChaveCarro: reserva.ChaveCarro,
                                    ChaveData: reserva.ChaveData,
                                    Cancelar: true
                                })}/>                        
                            </Jumbotron>
                        );
                    })
                }
            </div>
        );
    }
} 
import React, { Component } from 'react';
import { Form, Button, Table, Accordion, Card, Spinner } from 'react-bootstrap';
import Banco from '../Firebase/ApiBanco';

export default class TabelaCarros extends Component {

    //
    constructor(props) {
        super(props);
        this.state = {CarroSelecionado: '', Carros: [], Acao: false}
        this.setSelecionado = this.setSelecionado.bind(this);
        this.desmarcar_checkbox = this.desmarcar_checkbox.bind(this);
    }

    componentDidMount(){

        setTimeout(() => {
            this.setState({Carros: this.props.Carros_Cadastrados});
        }, 2000)
        
    }

    setSelecionado = changeEvent => {    
        
        this.setState({
            CarroSelecionado: changeEvent.target.value
        });
        this.props.CarroSelecionado(changeEvent.target.value);
    };

    desmarcar_checkbox() {        
        
        this.setState({
            CarroSelecionado: ''
        });
    }

    

    render () {
        
        if(this.state.Carros.length === 0){
            return (
                <h1>Loading...</h1>
            );            
        }
        
        return (
            
            <div>
                <Table striped bordered hover size="lg" variant="secondary" className="text-center">                    
                    <thead>                    
                        <tr>
                            <th>Selecione</th>
                            <th>Modelo</th>
                            <th>Ano</th>
                            <th>Cor</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody> 
                        
                        {    
                            this.props.Carros_Cadastrados.map( carro => {
                                return (
                                        
                                        <tr key={carro.Chave} > 
                                            <td>
                                                <Form.Check.Input 
                                                    value={carro.Chave} 
                                                    type="radio" 
                                                    name="carro"
                                                    checked={this.state.CarroSelecionado === carro.Chave} 
                                                    onChange={this.setSelecionado}/>                                                     
                                            </td>

                                            <td>{carro.Carro.Modelo}</td>
                                            <td>{carro.Carro.Ano}</td>
                                            <td>{carro.Carro.Cor}</td>
                                            <td>{carro.Carro.Valor}</td>                                                                                                                                                                                                                                                                                                                                                                                    
                                        </tr>                                                                                                                   
                                );
                            })
                            
                        }                                           
                    </tbody>                
                </Table>
                <Button as="input" type="button" value="Escolher" variant="secondary" onClick={this.props.Acao} className="mr-5"/>
                <Button as="input" type="button" value="Cancelar" variant="secondary" onClick={this.desmarcar_checkbox} className="mr-5"/> 
            </div>
        );
    }
} 



//=========================================================================================

export class TabelaHorarios extends Component{

    constructor(props){
        super(props);
    }

    teste(){
        alert('clicou');        
    }

    render(){
        //defaultActiveKey={this.props.Carro.Chave}
        console.log(this.props.DataCarro);                 
        return (
            <div className="my-5 col-10 m-auto">
                <h4>Dias disponíveis:</h4>
                <Accordion >
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={this.props.Carro.Chave} className="text-left">
                                <h3>Modelo: {this.props.Carro.Carro.Modelo}</h3>
                                <h4>Ano: {this.props.Carro.Carro.Ano}</h4>
                                <h4>Cor: {this.props.Carro.Carro.Cor}</h4>
                                <h4>Valor: R$ {this.props.Carro.Carro.Valor}</h4>                                
                            </Accordion.Toggle>
                        </Card.Header>
                        <Form className="col-8 pt-5 m-auto" onSubmit={this.cadastrar}>
                            <Form.Group controlId="estado-cadastro">
                                <Form.Control as="select" onChange={this.teste}>
                        {
                            this.props.DataCarro.map( data => {
                                return (
                                    <optgroup value={data.ChaveData}>
                                        <option>                                                                                                                                                                                   
                                            {data.Data.Data}
                                            {data.Data.Hora}
                                        </option>                                        
                                    </optgroup>                                               
                                );
                            })
                        }
                                </Form.Control>
                            </Form.Group>
                            <Button as="input" type="subbmit" value="Reservar" variant="secondary" className="mr-3" onClick={this.teste}/>
                        </Form>  
                    </Card>                                       
                </Accordion>
            </div>
        );
    }
}

/* 
                <Form.Group controlId="estado-cadastro">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control as="select" onChange={e => this.setEstado(e)}>
                        <option value="Paraná">Paraná</option>
                        <option value="Santa Catarina">Santa Catarina</option>
                        <option value="Rio Grande do Sul">Rio Grande do Sul</option>                    
                    </Form.Control>
                </Form.Group>
*/

/* <Form>
                                    <Form.Group controlId={data.ChaveData}>
                                        <Accordion.Collapse eventKey={this.props.Carro.Chave}>
                                            <Card.Body>                                                                                                                                
                                                <h5>Data: {data.Data.Data}</h5>
                                                <h5>Hora: {data.Data.Hora}</h5>
                                                <Button as="input" type="subbmit" value="Reservar" variant="secondary" className="mr-3" onClick={this.teste}/>
                                                <hr></hr>
                                            </Card.Body>                            
                                        </Accordion.Collapse>
                                    </Form.Group>
                                    </Form>*/
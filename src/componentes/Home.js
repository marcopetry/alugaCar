import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Cabecalho from '../adm/CabecalhoADM';

export default class Home extends Component {

    render () {
        return (
            <Container>
                <Row>                
                    <Col>
                        <Image src="imagens/carro-cabecalho.png" fluid/> 
                        <h1>{this.props.nome}</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}
import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export default class Home extends Component {

    render () {
        return (
            <Container>
                <Row>                
                    <Col>
                        <Image src="imagens/carro-cabecalho.png" fluid/> 
                    </Col>
                </Row>
            </Container>
        );
    }
}
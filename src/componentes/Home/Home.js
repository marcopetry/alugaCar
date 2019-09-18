import React, { Component } from 'react';
import { Container, Row, Col, Image, CardDeck, Jumbotron, Button } from 'react-bootstrap';
import CartaoHomePersonalizado from './CartaoHomePersonalizado';
import { cardCarros, cardInformacoes, cardContato, styleCardHome } from './const';

export default class Home extends Component {

    render () {

        return (
            <Container fluid className="p-0">

                <Row className="mx-0">                
                    <Col xs={0} md={12}className="m-auto d-none d-sm-block p-0">
                        <Image src="imagens/img-1.jpg" fluid/>                        
                    </Col>
                </Row>
                
                <Row className="mx-0 bg-white" style={styleCardHome}>
                    <Col xs={10} className="m-auto">
                        <CardDeck>
                            <CartaoHomePersonalizado informacoesCard={cardCarros}/>
                            <CartaoHomePersonalizado informacoesCard={cardInformacoes}/>
                            <CartaoHomePersonalizado informacoesCard={cardContato}/>
                        </CardDeck>
                    </Col>                   
                </Row>

                {/* Aqui estará alguma faixa da empresa */}   

                <Row className="mt-5 mx-0">
                    <Col className="p-0 align-items-baseline bg-secondary" xs={6}>
                        <Jumbotron fluid className="bg-transparent px-5 m-0">
                            <h1>Central de atendimento</h1>
                            <p>
                                Parobé: (51)35232502<br></br>
                                Campo Bom: (51)35982057<br></br>
                            </p>
                        </Jumbotron>                    
                    </Col>

                    <Col xs={6}className="p-0 align-items-baseline">                        
                        <Jumbotron fluid className="bg-transparent px-5 m-0">
                            <h1>Horário de atendimento</h1>
                            <p>
                                <h4>Segunda a sexta:</h4>
                                <h6>Das 8:30 hrs às 18:00 hrs</h6>

                                <h4>Sábado:</h4>
                                <h6>Das 8:00 hrs às 12:00 hrs</h6>
                                <h3>Assistência ao cliente 24 hrs</h3>
                            </p>
                        </Jumbotron>                          
                    </Col>                    
                </Row>             

                <Row className="mt-5 mx-0">
                    <Col className="p-0" xs={6}>
                        <Jumbotron fluid className="bg-secondary text-light px-5 m-0">
                            <h1 className="text-center">Alugue um carro</h1>
                            <p>
                                Economize tempo e dinheiro.<br></br>
                                Veículos com a garantia e segurança que você e sua família merecem.                                
                            </p>
                            <Button variant="light" className="col-12">Alugar carro</Button>
                        </Jumbotron>                    
                    </Col>

                    <Col xs={6}className="p-0">                        
                        <Image src="imagens/iconeCarro.png" fluid className="px-5" />                        
                    </Col>                    
                </Row>

                <Row className="mx-0">
                    <Col xs={6} className="p-0">                        
                        <Image src="imagens/iconeCarro.png" fluid className="px-5 pt-4" />                        
                    </Col>   

                    <Col className="p-0" xs={6}>
                        <Jumbotron fluid className="bg-secondary text-light px-5 m-0">
                            <h1 className="text-center">Terceirize a frota da sua empresa</h1>
                            <p>
                                <ul>
                                    <li></li>
                                </ul>
                            </p>
                            <Button variant="light" className="col-12">Alugar carro</Button>
                        </Jumbotron>                    
                    </Col>           
                </Row>

                <Row className="mx-0">
                    <Col className="p-0" xs={6}>
                        <Jumbotron fluid className="bg-secondary text-light px-5 m-0">
                            <h1 className="text-center">Alugue um carro</h1>
                            <p>
                                Economize tempo e dinheiro, venha locar seu veiculo na Locadora Paranhana, 
                                seu veículo com a garantia e segurança que você e sua família merecem,
                                conheça nossa empresa e saiba como podemos lhe oferecer nossos serviços.                                
                            </p>
                            <Button variant="light" className="col-12">Alugar carro</Button>
                        </Jumbotron>                    
                    </Col>

                    <Col xs={6}className="p-0">                        
                        <Image src="imagens/iconeCarro.png" fluid className="px-5 pt-5" />                        
                    </Col>                    
                </Row>

            </Container>
        );
    }
}


/*<p>
    Economize tempo e dinheiro, venha locar seu veiculo na Locadora Paranhana,
    seu veículo com a garantia e segurança que você e sua família merecem,
    conheça nossa empresa e saiba como podemos lhe oferecer nossos serviços.
</p>*/
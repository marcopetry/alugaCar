import React, { Component } from 'react';
import { Card, Image } from 'react-bootstrap';
import { corFundo, styleFontCardHome } from './const'

export default class CartaoHomePersonalizado extends Component {

    render () {
        return (

            <Card className="text-center" style={corFundo} >
                <Card.Link href={this.props.informacoesCard.caminho} style={styleFontCardHome} >
                    <Image rounded src={this.props.informacoesCard.imagem} fluid /> 
                    {this.props.informacoesCard.texto}                                                                                   
                </Card.Link>
            </Card>   
        );

    }    
}
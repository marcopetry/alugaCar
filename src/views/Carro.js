import React, { Component } from 'react';
import FormCarro, { ListaCarros }  from '../componentes/FormCarro';

export default class Carro extends Component {


    render () {
        return (
            <div>
                <ListaCarros />
                <FormCarro />                
            </div>
            
        );
    }
}
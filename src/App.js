import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import CabecalhoADM from './componentes/Cabecalho/CabecalhoADM';

import Home from './componentes/Home/Home';
import Carro from './componentes/adm/Carro';
import CadastroCarro from './componentes/adm/CadastroCarro';
import FormLogin from './componentes/Login/FormLogin';
import FormCadastro from './componentes/CadastroUsuario/FormCadastro';
import { Container } from 'react-bootstrap';

function App() {

  return (    
      <BrowserRouter>        
        <CabecalhoADM />        
        <Switch>                    
          <Route exact path="/" component={Home} />
          <Route path="/cadastrar" component={FormCadastro} />
          <Route path="/login" component={FormLogin} />
          <Route path="/carros" component={Carro} />
          <Route path="/inserir_carro" component={CadastroCarro} />
        </Switch>       
      </BrowserRouter>    
  );
}

export default App;

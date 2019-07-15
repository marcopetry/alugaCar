import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import CabecalhoADM from './adm/CabecalhoADM';
import Rodape from './componentes/Rodape';

import Home from './componentes/Home';
import Carro from './adm/Carro';
import CadastroCarro from './adm/CadastroCarro';
import FormLogin from './componentes/FormLogin';
import FormCadastro from './componentes/FormCadastro';

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
        <Rodape />
      </BrowserRouter>    
  );
}

export default App;
//        <CabecalhoADM />

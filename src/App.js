import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Cabecalho from './componentes/Cabecalho';
import Rodape from './componentes/Rodape';

import Home from './views/Home';
import Login from './views/Login';
import Cadastro from './views/Cadastro';
import Carro from './views/Carro';

function App() {
  return (
    <BrowserRouter>
        <Cabecalho />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/inserir_carro" component={Carro} /> 
          <Route path="/cadastro" component={Cadastro} />                  
          <Route path="/login" component={Login} />
        </Switch>
        <Rodape />
      </BrowserRouter>
  );
}

export default App;

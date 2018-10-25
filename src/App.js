import React, { Component } from 'react';
import ImportData from './containers/ImportData/ImportData';
import Layout from './components/Layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";
import SinglePage from './components/SinglePage/SinglePage';
import Aux from './hoc/Aux/Aux';
import ImportPages from './containers/ImportPages/ImportPages';



class App extends Component {
  render() {           
    return (
      <Aux>
        <ImportPages />
        <Layout>          
          <Switch>            
            <Route exact path="/" component={ImportData} />                       
            <Route component={SinglePage} />
          </Switch>
        </Layout>
      </Aux>
    );
  }
}

export default App;

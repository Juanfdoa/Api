import React from 'react';
import axios from 'axios';
import {Modal , ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Clientes} from './components/Clientes';
import {Productos} from './components/Productos';
import {Proveedores} from './components/Proveedores';
import {Inicio} from './components/Inicio';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function App() {
    return(
        <Router>
     <div className="container mt-5">
       <div className="btn-group">
         <Link to="/" className="btn btn-dark">
           Inicio
         </Link>
         <Link to="/Clientes" className="btn btn-dark">
           Clientes
         </Link>
         <Link to="/Productos" className="btn btn-dark">
           Productos
         </Link>
         <Link to="/Proveedores" className="btn btn-dark">
           Proveedores
         </Link>
        </div>
         <hr />
     
     <Switch>
          <Route path="/Clientes">
            <Clientes />
          </Route>
          <Route path="/Productos">
            <Productos />
          </Route>
          <Route path="/Proveedores">
            <Proveedores />
          </Route>
          <Route path="/">
            <Inicio />
          </Route>
        </Switch>
        </div>
     </Router>
    );
}

export default App;

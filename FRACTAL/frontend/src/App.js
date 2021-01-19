import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation'
import SuculentList from './components/SuculentList'
import Login from './components/Login'
import Register from './components/Register'
import Imagen from './components/Imagen'
import ProductSite from './components/SuculentSite'
import registroProducto from './components/registroSuculenta'


import admin from "./components/admin"
import profile from "./components/userProfile"

import { UserProvider } from './UserContext';


function App() {
  
  return (
    <Router>
      <UserProvider>
        <Navigation />

        <div className="container p-4">
        
            <Route path="/" exact component={SuculentList} />
            <Route path="/login" component={Login}/>
          
            <Route path="/register" component={Register}/>
          
            <Route path="/search/:title" exact component={SuculentList} />
            
            
            <Route path="/precios/:pr" exact component={SuculentList} />
            <Route path="/uploadImage/:id" exact component={Imagen} />
            <Route path="/suculent/:id" exact component={ProductSite} />
            <Route path="/addProduct" exact component={registroProducto} />
            <Route path="/edit/:id" component={registroProducto} />
            
            
            <Route path="/admin" exact component={admin} />
            <Route path="/profile" exact component={profile} />
            
            
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
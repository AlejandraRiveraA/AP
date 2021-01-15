import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation'
import ProductsList from './components/ProductsList'
import Login from './components/Login'
import Register from './components/Register'
import Imagen from './components/Imagen'
import ProductSite from './components/ProductSite'
import registroProducto from './components/registroProducto'
import crearCategoria from './components/crearCategoria'
import addDeliveryType from "./components/addDeliveryType"
import admin from "./components/admin"
import profile from "./components/userProfile"
import shoppingCar from "./components/shoppingCar"
import { UserProvider } from './UserContext';


function App() {
  //const user = { name: 'Mau', loggedIn: true }
  return (
    <Router>
      <UserProvider>
        <Navigation />

        <div className="container p-4">
        
            <Route path="/" exact component={ProductsList} />
            <Route path="/login" component={Login}/>
          
            <Route path="/register" component={Register}/>
          
            <Route path="/search/:title" exact component={ProductsList} />
            <Route path="/category/:nameCategory" exact component={ProductsList} />
            <Route path="/delivery/:nameType" exact component={ProductsList} />
            <Route path="/precios/:pr" exact component={ProductsList} />
            <Route path="/uploadImage/:id" exact component={Imagen} />
            <Route path="/product/:id" exact component={ProductSite} />
            <Route path="/addProduct" exact component={registroProducto} />
            <Route path="/edit/:id" component={registroProducto} />
            <Route path="/addCategory" exact component={crearCategoria} />
            <Route path="/addDeliveryType" exact component={addDeliveryType} />
            <Route path="/admin" exact component={admin} />
            <Route path="/profile" exact component={profile} />
            <Route path="/shoppingCar" exact component={shoppingCar}/>
            
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
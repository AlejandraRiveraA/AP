import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation'
import SuculentList from './components/SuculentList'
import Login from './components/Login'
import Register from './components/Register'
import Imagen from './components/Imagen'
import SuculentSite from './components/SuculentSite'
import registroSuculenta from './components/registroSuculenta'
import Catalog from './components/catalog'
import registroPost from './components/registroPost'


import admin from "./components/admin"
import profile from "./components/userProfile"

import { UserProvider } from './UserContext';
import PostsList from './components/PostList';
import Foro from './components/Foro';


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
            
            
            
            <Route path="/uploadImage/:id" exact component={Imagen} />
            <Route path="/suculent/:id" exact component={SuculentSite} />
            <Route path="/addSuculent" exact component={registroSuculenta} />
            <Route path="/addPost" exact component={registroPost} />
            <Route path="/catalog" exact component={Catalog} />
            <Route path="/PostList" exact component={PostsList} />
            <Route path="/post/:id" exact component={Foro} />

            
            
            
            <Route path="/admin" exact component={admin} />
            <Route path="/profile" exact component={profile} />
            
            
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
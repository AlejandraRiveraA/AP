import React, { Component } from 'react'
 import axios from 'axios'
import UserContext from '../UserContext'


export default class Login extends Component {
    static contextType = UserContext
    constructor(props){
    super(props);
    
    this.state = {

        username: '',
        password: '',
        auth: '',
        logedUser: {}
        }
    }

    onSubmit = async(e) => {
        const {user, setUser} = this.context
        e.preventDefault(); //evita que el form resetee la pagina de react
        console.log(this.state) //muestra por consola lo que se escribe
        await axios.post('http://localhost:5000/api/login', {
            username: this.state.username,
            password: this.state.password
        })      
        this.setState({auth: true})
        setUser({nombre: this.state.username, admin: "user"})
        const res = await axios.get('http://localhost:5000/api/users')
        const length = res.data.length
        for (var i = 0; i < length; i++) {
            
            if (res.data[i].username == this.state.username){
                this.setState({logedUser: res.data[i]})
               
                i=length
            }
        }
        const resSession = await axios.get('http://localhost:5000/api/sessionState/')
        await axios.put('http://localhost:5000/api/sessionState/'+resSession.data[0]._id, {
            id: this.state.logedUser._id,
            nombre: this.state.username,
            admin: this.state.logedUser.permisos
        })      
        window.location.href = '/'; 
    }
    
        
        
        
         
        //window.location.href = '/'; //al jecutar este evento y subir la info nos devuelve a la pagina principal 
    
    onInputChangeUser = (e) =>{ //recibe un evento
        console.log(e.target.value) //muestra por consola lo que se escribe
        this.setState({
            username: e.target.value //agrga lo que escribimos al estado del componente user
        })
 
 
     }

     onInputChangePass = (e) =>{ //recibe un evento
        console.log(e.target.value) //muestra por consola lo que se escribe
        this.setState({
            password: e.target.value //agrga lo que escribimos al estado del componente user
        })
 
 
     }

   
    render() {
        const {user, setUser} = this.context
        return (


            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
            <form onSubmit={this.onSubmit}>
                <h3>Log In</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       onChange={this.onInputChangeUser} 
                       className="form-control" 
                       placeholder="Enter Username"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password" 
                       onChange={this.onInputChangePass} 
                       className="form-control" 
                       placeholder="Enter Password"/>
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Log in </button>
            </form>
            </div>
        </div>

   
        )
    }
}

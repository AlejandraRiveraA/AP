import React, { Component } from 'react'
 import axios from 'axios'
 import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import UserContext from '../UserContext'



export default class Register extends Component {
    static contextType = UserContext
    
    state = {

        username: '',
        password: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        permisos: '',
        date: new Date()
    }

    async componentDidMount(){
        const resSession = await axios.get('http://localhost:5000/api/sessionState/')
        const status = resSession.data[0].admin
        if(status=="admin"){
            this.setState({permisos: resSession.data[0].admin})}
        else{this.setState({permisos: 'user'})}

    }

    onSubmit = async(e) => {
        e.preventDefault();

        await axios.post("http://localhost:5000/api/singup", {
            username: this.state.username,
            password: this.state.password,
            nombre: this.state.nombre,
            apellido1: this.state.apellido1,
            apellido2: this.state.apellido2,
            permisos: this.state.permisos,
            date: this.state.date

        });
        
        
         
        window.location.href = '/'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }

    onInputChange = e => {

        this.setState({
          [e.target.name]: e.target.value // actualiza segun el nombre de lo que nos den (tittle, content...)
            
        })
        
    }

    onChangeDate = date => {
        this.setState({date});
    }

   
    render() {
        const {user, setUser} = this.context
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                <h4>Registro</h4>


                    {/*SET usernarme */}
                    <div className="form-group">
                        <input type="text"
                        className="form-control" 
                        placeholder="Nombre de usuario" 
                        name="username"
                        onChange={this.onInputChange} 
                        value={this.state.username}
                        required
                        />
                    </div>

                    {/*SET pass */}
                    <div className="form-group">
                        <input type="password" 
                        className="form-control" 
                        placeholder="Constraseña" 
                        name="password"
                        onChange={this.onInputChange}
                        value={this.state.password}
                        required
                        />
                 
                    </div>
                    
                    {/*SET name */}
                    <div className="form-group">
                        <input type="text"
                        className="form-control" 
                        placeholder="Nombre" 
                        name="nombre"
                        onChange={this.onInputChange} 
                        value={this.state.nombre}
                        required
                        />
                    </div>

                    {/*SET apell1 */}
                    <div className="form-group">
                        <input type="text"
                        className="form-control" 
                        placeholder="Primer Apellido" 
                        name="apellido1"
                        onChange={this.onInputChange} 
                        value={this.state.apellido1}
                        required
                        />
                    </div>

                    {/*SET apell2 */}
                    <div className="form-group">
                        <input type="text"
                        className="form-control" 
                        placeholder="Segundo Apellido" 
                        name="apellido2"
                        onChange={this.onInputChange} 
                        value={this.state.apellido2}
                        required
                        />
                    </div>

                    {/*SET DATE */}
                    <div className="form-group">
                        <h6>Fecha de Nacimiento</h6>
                        <DatePicker 
                        className="form-control" 
                        selected={this.state.date} 
                        onChange={this.onChangeDate}

                        />
                    </div>



                    <form onSubmit={this.onSubmit}>

                        <button type='submit' className="btn btn-primary">
                            Registrarse
                        </button>

                    </form>
                </div>
             </div>
        )
    }
}

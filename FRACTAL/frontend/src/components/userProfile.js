import React, { Component, useReducer } from 'react'
import UserContext from '../UserContext'
import { Slide } from 'react-slideshow-image'
import axios from 'axios'

const properties = {
    indicators: true,
    speed: 1,
    infinite: true,
    arrows: true,
    className: 'slides'
}

export default class profile extends Component {
    static contextType = UserContext

    state = {
  
        images: [],
        username:'',
        nombre:'',
        apellido1:'',
        apellido2:''
    }

    async componentDidMount() {

        const resSession = await axios.get('http://localhost:5000/api/sessionState/')
        const res = await axios.get('http://localhost:5000/api/users/' + resSession.data[0].id)
        console.log(res.data)

        this.setState({
            username: res.data.username,
            nombre: res.data.nombre,
            apellido1: res.data.apellido1,
            apellido2: res.data.apellido2
        })

        const res2 = await axios.get('http://localhost:5000/api/images');
        const { user } = this.context
        this.setState({
            images: res2.data.filter(image => image.id_object == user.id)
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        window.location.href = '/'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }

    onSubmitImage = async (e) => {
        e.preventDefault();
        const { user } = this.context
        window.location.href = '/uploadImage/' + user.id;

    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value

        })

    }

    onUpdate = async(e) => {
        e.preventDefault();

        const resSession = await axios.get('http://localhost:5000/api/sessionState/')
        await axios.put("http://localhost:5000/api/users/"+ resSession.data[0].id, {
            nombre: this.state.nombre,
            apellido1: this.state.apellido1,
            apellido2: this.state.apellido2,

        });
    }

    render() {

        const { user } = this.context
        return (
            <div className="row">
                <div className="col-6">
                    <div className="card card-header">
                        <h4>Editar Perfil</h4>

                    </div>

                    <div className="card card-body">
                        {/*SET usernarme */}
                        <div className="form-group">
                            <label>Nombre de usuario: {user.nombre} </label>
                        
                        </div>

                        {/*SET fecha de nacimiento */}
                        <div className="form-group">
                            <label>Tipo de usuario: {user.admin} </label>

                        </div>

                        {/*SET name */}
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder={this.state.nombre}
                                name="nombre"
                                onChange={this.onInputChange}
                                required

                            />  

                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder={this.state.apellido1}
                                name="apellido1"
                                onChange={this.onInputChange}
                                required

                            />  

                        </div>

                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder={this.state.apellido2}
                                name="apellido2"
                                onChange={this.onInputChange}
                                required

                            />  

                        </div>

                    </div>

                    <div className="card card-footer">
                        <form onSubmit={this.onUpdate}>
                            <button type='submit' className="btn btn-secondary">
                                Actualizar
                            </button>
                        </form>
                        <br/>
                        <form onSubmit={this.onSubmit}>

                            <button type='submit' className="btn btn-primary">
                                Volver
                            </button>
                        </form>          
                    </div>
                </div>

                <div className="col-6">
                    <div className="col-md-12 offset-md-3">

                        <div className="card card-body">
                            <h4>Foto de Perfil</h4>

                            <br></br>
                            {/*SET profilePic */}
                            <div className="container">
                                <Slide {...properties}>
                                    {this.state.images.map((image) =>
                                        <div className="each-slide" key={image._id}>
                                            <img
                                                src={require('../public/upload/' + image.filename)}
                                                className="rounded mx-auto d-block"
                                                alt="img"
                                                height='300px'>

                                            </img>
                                        </div>

                                 )}</Slide>
                         </div>
    
                        <br></br>

                        <form onSubmit={this.onSubmitImage}>

                            <button type="submit" className="btn btn-outline-success">
                                Subir Imagen
                            </button>

                        </form>
                        <br></br>
    
                    </div>

                    <br></br>
                </div>


            </div>

                
        </div>
        )
    }
}

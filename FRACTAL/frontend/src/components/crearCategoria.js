import React, { Component } from 'react'
import axios from 'axios'

export default class RegisterCategory extends Component {
    
    
    state = {

        name: '',

    }

    async componentDidMount(){

    }

    onSubmit = async(e) => {
        e.preventDefault();

        console.log(this.state.name);

        await axios.post("http://localhost:5000/api/category", {

            nameCategory: this.state.name


        });
        
             
        window.location.href = '/'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }

    onSubmitAdmin  = async(e) => {
        e.preventDefault();

         
        window.location.href = '/admin'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }

    onInputChange = e => {

        this.setState({
          [e.target.name]: e.target.value // actualiza segun el nombre de lo que nos den (tittle, content...)
            
        })
        
    }

   
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear Categoría</h4>


                    {/*SET usernarme */}
                    <div className="form-group">
                        <input type="text"
                        className="form-control" 
                        placeholder="Category Name" 
                        name="name"
                        onChange={this.onInputChange} 
                        value={this.state.title}
                        required
                        />
                    </div>

                    <form onSubmit={this.onSubmit}>

                        <button type='submit' className="btn btn-primary">
                            Guardar
                        </button>

                    </form>

                    <div className="form-group">
                        
                    </div>
                    
                    <div className="form-group">
                        
                    </div>


                    <div className="form-group">

                        <form onSubmit={this.onSubmitAdmin}>

                            <button type='submit' color = "FF2D00" className="btn btn-primary" >
                                Volver
                            </button>

                        </form>

                    </div>
                </div>
             </div>
        )
    }
}
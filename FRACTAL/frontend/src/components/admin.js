import React, { Component } from 'react'
 import axios from 'axios'

export default class Admin extends Component {
    
    
    state = {
    }

    async componentDidMount(){

    }

    onSubmit  = async(e) => {
        e.preventDefault();

         
        window.location.href = '/'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }

    

    

    onSubmitProduct  = async(e) => {
        e.preventDefault();

         
        window.location.href = '/addProduct'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }

    onSubmitAdmin  = async(e) => {
        e.preventDefault();

         
        window.location.href = '/register'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }


   
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Herramientas de Admin</h4>




                    <div className="form-group">

                        <form onSubmit={this.onSubmitProduct}>
                            
                            <button type='submit' className="btn btn-warning">
                                Registro de Producto
                            </button>

                        </form>
                        
                        
                    </div>

                    <div className="form-group">

                        <form onSubmit={this.onSubmitAdmin}>
                            
                            <button type='submit' className="btn btn-warning">
                                Registrar Nuevo Administrador
                            </button>

                        </form>
                        
                        
                    </div>


                    <div className="form-group">
                        
                    </div>
                    
                    <div className="form-group">
                        
                    </div>


                    <div className="form-group">

                        <form onSubmit={this.onSubmit}>

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
import React, { Component } from 'react'
import "./BtmColor.css"

export default class Admin extends Component {
    
    
    state = {
    }

    async componentDidMount(){

    }

    onSubmit  = async(e) => {
        e.preventDefault();

         
        window.location.href = '/'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }

    

    

    onSubmitSuculent  = async(e) => {
        e.preventDefault();

         
        window.location.href = '/addSuculent'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }


    
    onSubmitPost  = async(e) => {
        e.preventDefault();

         
        window.location.href = '/addPost'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }

    onSubmitAdmin  = async(e) => {
        e.preventDefault();

         
        window.location.href = '/register'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }


   
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Herramientas de Publicación</h4>


                    <div className="form-group">

                        <form onSubmit={this.onSubmitSuculent}>
                            
                            <button id = 'botonlogin' type='submit' className="btn btn-success">
                                Registrar una suculenta personal
                            </button>

                        </form>

                        <div className="form-group">
                        
                        </div>

                        <form onSubmit={this.onSubmitPost}>
                            
                            <button id = 'botonlogin' type='submit' className="btn btn-success">
                                Registrar un post en el foro    
                                </button>

                        </form>
                        
                        
                    </div>

                    <div className="form-group">
                        
                    </div>
                    
                    <div className="form-group">
                        
                    </div>


                    <div className="form-group">

                        <form onSubmit={this.onSubmit}>

                            <button type='submit' className="btn btn-primary" >
                                Volver
                            </button>

                        </form>

                    </div>
                </div>
             </div>
        )
    }
}
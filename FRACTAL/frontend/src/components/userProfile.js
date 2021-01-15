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
        nombreCompleto: '',
        total: [],
        productos: [],
        precios: [],
        cantidades: [],
        historial: [],
        historialProds: [],
        images: []
    }
    
    async componentDidMount(){
        const resSession = await axios.get('http://localhost:5000/api/sessionState/')
        const res = await axios.get('http://localhost:5000/api/users/' + resSession.data[0].id)
        console.log(res.data)
        
        this.setState({
                       nombreCompleto: res.data.nombre + ' ' + res.data.apellido1 + ' ' + res.data.apellido2
                     })

        const compras =await axios.get('http://localhost:5000/api/purchases')
        var arrTotal = []
        
        var arrPrecios=[]
        var arrCant = []
        var History=[]
        var HistoryProds=''
        for(var i=0; i<compras.data.length; i++){
            var arrProds = []
            
            if(compras.data[i].user===resSession.data[0].id){
                var HistoryProds=''
                for(var k=0; k<compras.data[i].products.length; k++){
                    var nflag='\n'
                    if(k==compras.data[i].products.length-1){nflag=''}
                    HistoryProds+="Producto: "+ compras.data[i].products[k].title+"---"
                    +"Precio: "+ compras.data[i].products[k].precio+"---"
                    +"Cantidad:" +String(compras.data[i].products[k].cantidad)+nflag
                }
                History.push({
                    total: compras.data[i].total,
                    productos: HistoryProds 
                })
               

            }
        }
        this.setState({historial: History})
        
        console.log(this.state.historial)

        const res2 = await axios.get('http://localhost:5000/api/images');
        const {user} = this.context
        this.setState({
            images: res2.data.filter(image => image.id_object == user.id)
        })
    }

    onSubmit = async(e) => {
        e.preventDefault();
         
        window.location.href = '/'; //al ejecutar este evento y subir la info nos devuelve a la pagina principal 
    }

    onSubmitImage = async (e) => {
        e.preventDefault();
        const {user} = this.context
        window.location.href = '/uploadImage/' + user.id;
    }

   
   
    render() {

        const {user} = this.context
    

        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>User Profile</h4>

                    <br></br>
                    {/*SET profilePic */}
                    <div className="container">
                        <Slide {...properties}>
                            {this.state.images.map((image) =>
                                <div className="each-slide" key={ image._id}>
                                    <img src={require('../public/upload/' + image.filename)} className="rounded mx-auto d-block" alt="img" height='300px'></img>
                                </div>
                            )}</Slide>
                    </div>


                    {/*SET usernarme */}
                    <div className="form-group">
                    <label>Username : {user.nombre} </label>
                    </div>

                    
                    {/*SET name */}
                    <div className="form-group">
                    <label>Name: {this.state.nombreCompleto}  </label>
                    </div>
            
                    {/*SET fecha de nacimiento */}
                    <div className="form-group">
                    <label>User Type: {user.admin} </label>
                    </div>

                    <br></br>

                    <form onSubmit={this.onSubmitImage}>

                        <button type="submit" className="btn btn-outline-success">
                            Upload Image
                         </button>

                    </form>

                    <br></br>

                    <form onSubmit={this.onSubmit}>

                        <button type='submit' className="btn btn-primary">
                            Back
                        </button>

                    </form>
                </div>
                <br></br>
                <label>Historial</label>
                
                <div className="card card-body" >
                   
                            {
                                this.state.historial.map((prods, index)=> (
                                    <div className="card card-body" key={index} style={{backgroundColor: "#BDFFF3"}}>
                                    

                                        {"Total de la compra: " +prods.total} 
                                        {prods.productos.split("\n").map((sub, ind)=>(
                                            <p className="card card-body" key={ind}>
                                                {sub}
                                            </p>
                                            ))
                                        }
                                        
                                        
                                    
                                    </div>
                                    
                                ))
                                
                            }
                    
                </div>
             </div>
        )
    }
}

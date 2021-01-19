import React, { Component } from 'react'
import axios from 'axios'
import { Slide } from 'react-slideshow-image'
import { FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

const properties = {
    indicators: true,
    speed: 500,
    infinite: true,
    arrows: true,
    className: 'slides'
}

export default class ProductSite extends Component {

    state = {
        images: [],
        comments: [],
        commentsProd: [],
        title: '',
        description: '',
        precio: '',
        cantidad: '',
        envio: '',
        _id: '',
        user: '',
        acceso: '',
        idUser: '',
        contenido: '',
        autor: '',
        id: '',
        idProd: '', 
        bloqueo: false,
        estadoBloqueo: "Bloquear",
        promedioEstrellas: 1,
        starSelected: 3
    }

    async componentDidMount() {

        
        const res = await axios.get('http://localhost:5000/api/products/' + this.props.match.params.id);
        this.setState({
            title: res.data.title,
            description: res.data.description,
            precio: res.data.precio,
            cantidad: res.data.cantidad,
            envio: res.data.envio,
            _id: this.props.match.params.id,
            bloqueo: res.data.bloqueo
        })

        const res2 = await axios.get('http://localhost:5000/api/images');
        this.setState({
            images: res2.data.filter(image => image.id_object === this.props.match.params.id)
        })

        const resSession = await axios.get('http://localhost:5000/api/sessionState')
        this.setState({ 
            acceso: resSession.data[0].admin,
            user: resSession.data[0].nombre,
            idUser: resSession.data[0].id
        })

        const resComm = await axios.get('http://localhost:5000/api/comment')
        this.setState({
            id: this.props.match.params.id,
            idProd: resComm.data[0].id_product,
            autor: resComm.data[0].autor,
            //contenido: resComm.data[0].contenido
        });

        console.log(this.state.idUser)
        console.log(this.state._id)
        this.getComments()
        console.log(this.state.commentsProd)

        if(this.state.bloqueo) {
            this.state.estadoBloqueo = "Desbloquear"
        } else {
            this.state.estadoBloqueo = "Bloquear"
        }

        this.calcularPromedioEstrellas()
        //console.log(this.calcularPromedioEstrellas)
        console.log(this.state.promedioEstrellas)
    }

    onInputChange = e => {

        this.setState({
            [e.target.name]: e.target.value // actualiza segun el nombre de lo que nos den (tittle, content...)

        })

    }

    onSubmitImage = async (e) => {
        e.preventDefault();
        window.location.href = '/uploadImage/' + this.props.match.params.id;
    }


    onSubmit = async (e) => {
        e.preventDefault();
        


        await axios.post('http://localhost:5000/api/carrito/carrito:'+this.state.idUser, {
            idproducto: this.state._id,
            cantidad: '1'

        });

        window.location.href = '/';
    
    
    }

    onSubmitComment = async (e) => {
       // e.preventDefault();
        
        await axios.post('http://localhost:5000/api/comment', {

        id_product: this.state._id,
        autor: this.state.user,
        contenido: this.state.contenido

        });
        this.setState({contenido: ''})
        window.location.reload(false);
        
    }

    async getComments() {

        const comments = await axios.get('http://localhost:5000/api/comment')
        const listComments = []
        try{
            for(var i = 0; i<comments.data.length; i++){
                if(comments.data[i].id_product == this.state._id){
                    listComments.push(comments.data[i])
                }   

            }
            console.log(listComments)
            this.setState({commentsProd:listComments})
        }catch{
            this.setState({commentsProd:[]})
        }
    }

    onDelete = async (e) => {
        e.preventDefault();
        await axios.delete('http://localhost:5000/api/products/' + this.props.match.params.id);
        window.location.href = '/';
    }

    onSubmitBlock = async (e) => {
        e.preventDefault();
        var block = this.state.bloqueo
        if(block) {
            block = false
            this.state.estadoBloqueo = "Desbloquear"
        } else {
            block = true
            this.state.estadoBloqueo = "Bloquear"
        }
        await axios.put('http://localhost:5000/api/products/' + this.state._id, {
            title: this.state.title,
            description: this.state.description,
            precio: this.state.precio,
            cantidad: this.state.cantidad,
            bloqueo: block
        });
        window.location.reload(false);
    }

    async calcularPromedioEstrellas(){
        const stars=await axios.get('http://localhost:5000/api/estrellas/star:'+ this.state._id)
        
        try{
            var arr = Object.values(stars.data)
            var arr2 = Object.keys(stars.data)
        }catch{
            var arr=[]
            var arr2=[]}
        
        var sum = 0.0
        console.log(arr[0])
        for(var i=0; i<arr.length; i++){
            if(arr2[i]===this.state.idUser){
                this.setState({starSelected: parseInt(arr[i])})
                console.log(this.state.starSelected)
            }
            sum+=parseFloat(arr[i])
        }
        var promedio = sum/arr.length
        console.log(Math.round(parseFloat(promedio)*10)/10)
        this.setState({promedioEstrellas: Math.round(parseFloat(promedio)*10)/10})
        console.log(this.state.promedioEstrellas)
    }

     ratingChanged = async(newRating) => {
        await axios.put('http://localhost:5000/api/estrellas/star:'+ this.state._id, {
            usuario: this.state.idUser,
            estrellas: newRating
        })
        console.log(newRating);
        window.location.reload(false);
      };

      

    render() {
        const authenticatedAdmin = () => {
            return (
                <div className="card text-center text-white bg-dark mb-3">
                    <div className="containerSlide">
                        <Slide {...properties}>
                            {this.state.images.map((image) =>
                                <div className="each-slide" key={ image._id}>
                                    <img src={require('../public/upload/' + image.filename)} className="rounded mx-auto d-block" alt="img" height='400px'></img>
                                </div>
                            )}</Slide>
                    </div>
                    <div className="card-body">

                        <div className="card-footer">
                            <h5 className="card-title">{this.state.title}</h5>
                            <p className="card-text">{this.state.description}</p>
                            <p className="card-text"><FaDollarSign color='white' size='1rem' />{this.state.precio}</p>
                            <p className="card-text">envio: {this.state.envio}</p>

                            <div className="card-footer mb-4">
                                <p className="card-text"><small className="text-muted">{'Disponibles: ' + this.state.cantidad}</small></p>
                            </div>
                            
                            <Link className="btn btn-outline-success" to={"/edit/" + this.state._id}>
                                Editar
                            </Link>
                            <br></br>
                            <br></br>
                            <form onSubmit={this.onSubmitImage}>

                                <button type="submit" className="btn btn-outline-success">
                                    Subir Imagen
                                </button>

                            </form>
                            <br></br>
                            <form onSubmit={this.onSubmitBlock}>

                                <button type="submit" className="btn btn-outline-warning">
                                    {this.state.estadoBloqueo}
                                </button>

                            </form>
                            <br></br>
                            <br></br>
                            <form onSubmit={this.onDelete}>

                                <button type="submit" className="btn btn-outline-danger">
                                    Eliminar
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            )
        }

        const unauthenticated = () => {
            return (
                <div className="card text-center text-white bg-dark mb-3">
                    <div className="containerSlide">
                        <Slide {...properties}>
                            {this.state.images.map((image) =>
                                <div className="each-slide" key={ image._id}>
                                    <img src={require('../public/upload/' + image.filename)} className="rounded mx-auto d-block" alt="img" height='400px'></img>
                                </div>
                            )}</Slide>
                    </div>
                    <div className="card-body">

                        <div className="card-footer">
                            <h5 className="card-title">{this.state.title}</h5>
                            <p className="card-text">{this.state.description}</p>
                            <p className="card-text"><FaDollarSign color='white' size='1rem' />{this.state.precio}</p>
                            <p className="card-text">envio: {this.state.envio}</p>

                            <div className="card-footer mb-4">
                                <p className="card-text"><small className="text-muted">{'Disponibles: ' + this.state.cantidad}</small></p>
                            </div>


                            <form onSubmit={this.onSubmit}>
                                <button type="submit" className="btn btn-outline-primary" disabled={this.state.bloqueo}>
                                    Agregar al Carrito
                    </button>
                            </form>
                            <div className="form-group" align="left">
                            <ReactStars
                                count={5}
                                onChange={this.ratingChanged}
                                size={24}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                value={this.state.starSelected}
                                activeColor="#ffd700"
                            ></ReactStars>{"Calificación promedio: "+this.state.promedioEstrellas}
                            </div>
                            <br></br>
                            <br></br>

                            <h3>Deja un comentario</h3>

                            <div className="form-group">
                            <input type="text"
                            className="form-control" 
                            placeholder="Escribe un comentario" 
                            name="contenido"
                            onChange={this.onInputChange} 
                            value={this.state.contenido}
                            required
                            />
                            </div>
                            

                            <form onSubmit={this.onSubmitComment}>
                            
                                <button type="submit" className="btn-success">
                                    Postear
                                </button>
                            </form>

                            <br></br>
                            <br></br>

                            <h3>Comentarios de clientes</h3>

                            <ul className="list-group">
                                    {
                                        this.state.commentsProd.map((comts, index)=> (
                                            <li className="list-group-item list-group-item-action" key={index}>

                                                {comts.autor +': '}  {comts.contenido}
                                                
                                            </li>
                                        ))
                                    }
                            </ul>




                        </div>
                    </div>
                </div>
            )
        }

        const unlog = () => {
            return (
                <div className="card text-center text-white bg-dark mb-3">
                    <div className="containerSlide">
                        <Slide {...properties}>
                            {this.state.images.map((image) =>
                                <div className="each-slide" key={ image._id}>
                                    <img src={require('../public/upload/' + image.filename)} className="rounded mx-auto d-block" alt="img" height='400px'></img>
                                </div>
                            )}</Slide>
                    </div>
                    <div className="card-body">

                        <div className="card-footer">
                            <h5 className="card-title">{this.state.title}</h5>
                            <p className="card-text">{this.state.description}</p>
                            <p className="card-text"><FaDollarSign color='white' size='1rem' />{this.state.precio}</p>
                            <p className="card-text">envio: {this.state.envio}</p>

                            <div className="card-footer mb-4">
                                <p className="card-text"><small className="text-muted">{'Disponibles: ' + this.state.cantidad}</small></p>
                            </div>
                            
                            <form onSubmit={this.onSubmit}>
                                    <div className="alert alert-danger" role="alert">
                                        <a href="http://localhost:3000/login" className="alert-link"> Iniciar sesion </a> para comprar el producto.
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <ul>
                {this.state.acceso == "admin" ? authenticatedAdmin() :
                    this.state.acceso == "user" ? unauthenticated() : unlog()}
            </ul>
        )
    }
}
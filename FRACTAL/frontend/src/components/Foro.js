import React, { Component } from 'react'
import axios from 'axios'
import { Slide } from 'react-slideshow-image'



const properties = {
    indicators: true,
    speed: 500,
    infinite: true,
    arrows: true,
    className: 'slides'
}

export default class Foro extends Component {

    state = {
        images: [],
        comments: [],
        commentsProd: [],
        title: '',
        description: '',
        _id: '',
        user: '',
        acceso: '',
        idUser: '',
        contenido: '',
        autor: '',
        id: '',
        idProd: ''
    }

    async componentDidMount() {

        
        const res = await axios.get('http://localhost:5000/api/posts/' + this.props.match.params.id);
        this.setState({
            title: res.data.title,
            description: res.data.description,
            _id: this.props.match.params.id
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
            
        });

        
        this.getComments()
        console.log(this.state.commentsProd)


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



    onSubmitComment = async (e) => {
        
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

    

    render() {
        
            return (
                <div className="card text-center text-black bg-white mb-3">
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

                            
                            <br></br>
                            <br></br>
                            <br></br>

                            <form onSubmit={this.onSubmitImage}>

                            <button type="submit" className="btn btn-outline-success">
                                Subir Imagen
                                </button>

                            </form>

                            <br></br>
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
}
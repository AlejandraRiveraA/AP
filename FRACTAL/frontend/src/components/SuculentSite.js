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

export default class SuculentSite extends Component {

    state = {
        images: [],
        comments: [],
        commentsProd: [],
        title: '',
        description: '',
        enfermedad: '',
        reproduction: '',
        cuidado: '',
        _id: '',
        user: '',
        acceso: '',
        idUser: '',
        contenido: '',
        autor: '',
        id: '',
        idProd: '',

    }

    async componentDidMount() {


        const res = await axios.get('http://localhost:5000/api/suculents/' + this.props.match.params.id);
        this.setState({
            title: res.data.title,
            description: res.data.description,
            enfermedad: res.data.enfermedad,
            reproduction: res.data.reproduction,
            cuidado: res.data.cuidado,
            _id: this.props.match.params.id,
        })
        console.log(this.state.title)
        console.log('sí entra acá')

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


        console.log(this.state.idUser)
        console.log(this.state._id)



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










    render() {

        return (
            <div className="card text-center text-dark bg-white mb-3">
                <div className="containerSlide">
                    <Slide {...properties}>
                        {this.state.images.map((image) =>
                            <div className="each-slide" key={image._id}>
                                <img src={require('../public/upload/' + image.filename)} className="rounded mx-auto d-block" alt="img" height='400px'></img>
                            </div>
                        )}</Slide>
                </div>
                <div className="card-body">

                    <div className="card-footer">
                        <h5 className="card-title">Nombre de la Suculenta: {this.state.title}</h5>
                        <p className="card-text">Descripción: {this.state.description}</p>
                        <p className="card-text">Enfermedades: {this.state.enfermedad}</p>
                        <p className="card-text">Cuidados: {this.state.cuidado}</p>
                        <p className="card-text">Reproducción: {this.state.reproduction}</p>
                        <br></br>
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

                    </div>
                </div>
            </div>
        )





    }
}
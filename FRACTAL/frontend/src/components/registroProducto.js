import React, { Component } from 'react'
import axios from 'axios'

export default class RegisterProduct extends Component {


    state = {
        products: [],
        title: '',
        description: '',
        precio: Number,
        cantidad: Number,
        categoria: '',
        envio: '',
        bloqueo: false,
        editando: false,
        _id: ''
    }

    async componentDidMount() {
        this.getProducts();


        if (this.props.match.params.id) {
            const resE = await axios.get('http://localhost:5000/api/products/' + this.props.match.params.id);
            this.setState({
                title: resE.data.title,
                description: resE.data.description,
                cantidad: resE.data.cantidad,
                precio: resE.data.precio,
                bloqueo: resE.data.bloqueo,
                editando: true,
                _id: this.props.match.params.id
            })
        }
    }
    async getProducts() {
        const res = await axios.get('http://localhost:5000/api/products')
        this.setState({ products: res.data })
    }

    async registrar() {
        const newProduct = {
            title: this.state.title,
            description: this.state.description,
            precio: this.state.precio,
            cantidad: this.state.cantidad,
            bloqueo: this.state.bloqueo
        }
        if (this.state.editando) {
            await axios.put('http://localhost:5000/api/products/' + this.state._id, newProduct);
        } else {
            await axios.post('http://localhost:5000/api/products', newProduct);
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.registrar();
        if (this.props.match.params.id) {
            window.location.href = '/product/' + this.props.match.params.id;
        } else {
            this.getProducts();
            window.location.href = '/';
            
        }
    }

    onInputChange = e => {

        this.setState({
            [e.target.name]: e.target.value// actualiza segun el nombre de lo que nos den (tittle, content...)

        })
        console.log(this.state)

    }

    onChangeDate = date => {
        this.setState({ date });
    }


    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Registrar Producto</h4>


                    {/*SET producto */}
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Nombre del Producto"
                            name="title"
                            onChange={this.onInputChange}
                            value={this.state.title}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <textarea type="text"
                            className="form-control"
                            placeholder="Description"
                            name="description"
                            onChange={this.onInputChange}
                            value={this.state.description}
                            required
                        />

                    </div>




                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="cantidad"
                            name="cantidad"
                            onChange={this.onInputChange}
                            value={this.state.cantidad}
                            required
                        />
                    </div>

                  

                    

                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="precio"
                            name="precio"
                            onChange={this.onInputChange}
                            value={this.state.precio}
                            required
                        />
                    </div>

                    <div className="card-footer md-9">

                        <form onSubmit={this.onSubmit}>

                            <button type='submit' className="btn btn-primary">
                                Guardar
                        </button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'

export default class RegisterProduct extends Component {


    state = {
        products: [],
        category: [],
        delivery: [],
        deliverySelected: '',
        categorySelected: '',
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

        const res = await axios.get("http://localhost:5000/api/category");
        this.setState({
            category: res.data.map(category => category.nameCategory),
            categorySelected: res.data[0].nameCategory
        })
        console.log(this.state.categorySelected) //nos permite solo jalar el name y no todo el objeto
        //el data[0] nos pone por defecto el primero 

        const res2 = await axios.get("http://localhost:5000/api/deliveryType");
        this.setState({
            delivery: res2.data.map(delivery => delivery.deliveryTypeName),
            deliverySelected: res2.data[0].deliveryTypeName
        })
        console.log(this.state.deliverySelected) //nos permite solo jalar el name y no todo el objeto
        //el data[0] nos pone por defecto el primero
        if (this.props.match.params.id) {
            const resE = await axios.get('http://localhost:5000/api/products/' + this.props.match.params.id);
            this.setState({
                deliverySelected: resE.data.envio,
                categorySelected: resE.data.categoria,
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
            categoria: this.state.categorySelected,
            envio: this.state.deliverySelected,
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
            //window.location.href = '/product/' + this.state.products[0]._id;
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

                    {/*category */}
                    <div className="form-group">
                        <select className="form-control"
                            name="categorySelected"
                            onChange={this.onInputChange}
                            value={this.state.categorySelected}>
                            {
                                this.state.category.map(categ =>
                                    <option key={categ} value={categ}>
                                        {categ}
                                    </option>)
                            }

                        </select>
                    </div>

                    {/*Deliv */}
                    <div className="form-group">
                        <select className="form-control"
                            name="deliverySelected"
                            onChange={this.onInputChange}
                            value={this.state.deliverySelected}>
                            {
                                this.state.delivery.map(deliv =>
                                    <option key={deliv} value={deliv}>
                                        {deliv}
                                    </option>)
                            }

                        </select>
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

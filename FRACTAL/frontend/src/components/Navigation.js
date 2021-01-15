import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
//import axios from 'axios';
import UserContext from '../UserContext'
import axios from 'axios'



export default class Navigation extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props);
        this.state = {

            username: '',
            password: '',
            title: '',
            auth: false,
            categories: [],
            deliveries: [],
            dropdown: "none"
        }
    }

    /*state = {

        userStatus: '',
        auth: false
    
    }*/

    onInputChange = e => {

        this.setState({
            [e.target.name]: e.target.value // actualiza segun el nombre de lo que nos den

        })
    }

    async componentDidMount() {
        const res = await axios.get("http://localhost:5000/api/category");
        this.setState({
            categories: res.data
        })
        const res2 = await axios.get("http://localhost:5000/api/deliveryType");
        this.setState({
            deliveries: res2.data
        })
        //const res = await  axios.get("http://localhost:5000/api/userinfo")
        console.log(this.state.auth)

    }

    async logOut() {
        const resSession = await axios.get('http://localhost:5000/api/sessionState/')
        await axios.put('http://localhost:5000/api/sessionState/' + resSession.data[0]._id, {
            id: "noLog",
            nombre: "noLog",
            admin: "noLog"
        })
        window.location.href = '/';

    }

    clickChange() {
        if(this.state.dropdown === "none") {
            this.setState({ dropdown: "block" });
        } else if(this.state.dropdown === "block") {
            this.setState({ dropdown: "none" });
        }
    }

    render() {


        const { user, setUser } = this.context

        //Navbar usuario normal
        const unauthenticatedNavBar = () => {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                                {/*categorias*/}
                            <ul className="navbar-nav mr-auto">
                                <Link className="navbar-brand" to="/">
                                    El Mercadito
                                </Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <li className="nav-item dropdown" onClick={() => this.clickChange()}>
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sort By
                                    </a>
                                    <div className={"dropdown-menu d-" + this.state.dropdown} aria-labelledby="navbarDropdown">Categories
                                        {this.state.categories.map(category => (
                                            <a className="dropdown-item" key={category.idcategory} href={"http://localhost:3000/category/" + category.nameCategory}>{category.nameCategory}</a>
                                        ))}
                                        <div className="dropdown-divider"></div>Deliveries
                                        {this.state.deliveries.map(delivery => (
                                            <a className="dropdown-item" key={delivery.iddeliveryType} href={"http://localhost:3000/delivery/" + delivery.deliveryTypeName}>{delivery.deliveryTypeName}</a>
                                        ))}
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href={"http://localhost:3000/precios/" + "pr"}>Precios</a>
                                    </div>
                                </li>
                            </ul>
                                {/*buscador*/}
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Buscar"
                                    aria-label="Search"
                                    name="title"
                                    onChange={this.onInputChange}
                                    value={this.state.title}
                                    required
                                />
                                <a className="btn btn-outline-light my-2 my-sm-0" href={"http://localhost:3000/search/" + this.state.title} type="submit" >Buscar</a>
                            </form>

                            {/*login in-sign up*/}
                            <ul className="navbar-nav ml-auto">


                                <li className="nav-item active">
                                    <Link className="nav-link" to="/profile">
                                        {user.nombre}
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">
                                        <span onClick={this.logOut}>LogOut</span>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/shoppingCar">
                                        <FaShoppingCart color='white' size='1.5rem' />
                                    </Link>
                                </li>
                            </ul>
                            </div>

                        </div>

                </nav>
            )
        }
        //Navbar Admin
        const authenticatedNavBar = () => {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                                {/*categorias*/}
                            <ul className="navbar-nav mr-auto">
                                <Link className="navbar-brand" to="/">
                                    El Mercadito
                                </Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <li className="nav-item dropdown" onClick={() => this.clickChange()}>
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sort By
                                    </a>
                                    <div className={"dropdown-menu d-" + this.state.dropdown} aria-labelledby="navbarDropdown">Categories
                                        {this.state.categories.map(category => (
                                            <a className="dropdown-item" key={category.idcategory} href={"http://localhost:3000/category/" + category.nameCategory}>{category.nameCategory}</a>
                                        ))}
                                        <div className="dropdown-divider"></div>Deliveries
                                        {this.state.deliveries.map(delivery => (
                                            <a className="dropdown-item" key={delivery.iddeliveryType} href={"http://localhost:3000/delivery/" + delivery.deliveryTypeName}>{delivery.deliveryTypeName}</a>
                                        ))}
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href={"http://localhost:3000/precios/" + "pr"}>Precios</a>
                                    </div>
                                </li>
                            </ul>
                            {/*buscador*/}
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Buscar"
                                    aria-label="Search"
                                    name="title"
                                    onChange={this.onInputChange}
                                    value={this.state.title}
                                    required
                                />
                                <a className="btn btn-outline-light my-2 my-sm-0" href={"http://localhost:3000/search/" + this.state.title} type="submit" >Buscar</a>
                            </form>

                            {/*login in-sign up*/}
                            <ul className="navbar-nav ml-auto">



                                <li className="nav-item active">
                                    <Link className="nav-link" to="/admin">
                                        Admin
                                </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/profile">
                                        {user.nombre}
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">
                                        <span onClick={this.logOut}>LogOut</span>
                                    </Link>
                                </li>
                            </ul>
                            </div>
                    </div>
                </nav>
            )
        }

        //Navbar cuando no se está log
        const unlogNavBar = () => {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                                {/*categorias*/}
                            <ul className="navbar-nav mr-auto">
                                <Link className="navbar-brand" to="/">
                                    El Mercadito
                                </Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <li className="nav-item dropdown" onClick={() => this.clickChange()}>
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sort By
                                    </a>
                                    <div className={"dropdown-menu d-" + this.state.dropdown} aria-labelledby="navbarDropdown">Categories
                                        {this.state.categories.map(category => (
                                            <a className="dropdown-item" key={category.idcategory} href={"http://localhost:3000/category/" + category.nameCategory}>{category.nameCategory}</a>
                                        ))}
                                        <div className="dropdown-divider"></div>Deliveries
                                        {this.state.deliveries.map(delivery => (
                                            <a className="dropdown-item" key={delivery.iddeliveryType} href={"http://localhost:3000/delivery/" + delivery.deliveryTypeName}>{delivery.deliveryTypeName}</a>
                                        ))}
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href={"http://localhost:3000/precios/" + "pr"}>Precios</a>
                                    </div>
                                </li>
                            </ul>
                            {/*buscador*/}
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Buscar"
                                    aria-label="Search"
                                    name="title"
                                    onChange={this.onInputChange}
                                    value={this.state.title}
                                    required
                                />
                                <a className="btn btn-outline-light my-2 my-sm-0" href={"http://localhost:3000/search/" + this.state.title} type="submit" >Buscar</a>
                            </form>

                            {/*login in-sign up*/}
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/login">
                                        Iniciar Sesión
                                </Link>
                                </li>

                                <li className="nav-item active">
                                    <Link className="nav-link" to="/register">
                                        Registrarse
                                </Link>
                                </li>
                            </ul>
                        </div>
                        </div>
                </nav>
            )
        }

        return (
            <ul className="navbar-nav">
                {user.admin == "admin" ? authenticatedNavBar() :
                    user.admin == "user" ? unauthenticatedNavBar() : unlogNavBar()}
            </ul>


        )
    }
}

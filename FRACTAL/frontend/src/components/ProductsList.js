import React, { Component } from 'react'
import axios from 'axios'
import { FaDollarSign } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default class ProductsList extends Component {

    state = {
        products: [],
        images: [],
        lista: []
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/api/products')
        this.setState({ products: res.data })
        const res2 = await axios.get('http://localhost:5000/api/images')
        this.setState({ images: res2.data })

        if (this.props.match.params.title) {
            const buscar = this.props.match.params.title.toLowerCase()
            const list = res.data.filter(product => product.title.toLowerCase().indexOf(buscar) !== -1)
            const length = list.length
            var arr = new Array(length)
            for (var i = 0; i < length; i++) {
                arr[i] = new Array(length)
                for (var j = 0; j < 2; j++) {
                    if(j === 0) {
                        arr[i][j] = list[i]
                    } else {
                        var imagesf = res2.data.filter(img => img.id_object === list[i]._id)
                        if (imagesf.length > 0) {
                            arr[i][j] = imagesf[0].filename
                        } else {
                            arr[i][j] = 'nada.png' 
                        }
                    }
                }
            }
        } else if (this.props.match.params.nameCategory) {
            const categoria = this.props.match.params.nameCategory
            const list = res.data.filter(product => product.categoria === categoria)
            const length = list.length
            var arr = new Array(length)
            for (var i = 0; i < length; i++) {
                arr[i] = new Array(length)
                for (var j = 0; j < 2; j++) {
                    if(j === 0) {
                        arr[i][j] = list[i]
                    } else {
                        var imagesf = res2.data.filter(img => img.id_object === list[i]._id)
                        if (imagesf.length > 0) {
                            arr[i][j] = imagesf[0].filename
                        } else {
                            arr[i][j] = 'nada.png' 
                        }
                    }
                }
            }
        } else if (this.props.match.params.nameType) {
            const envio = this.props.match.params.nameType
            const list = res.data.filter(product => product.envio === envio)
            const length = list.length
            var arr = new Array(length)
            for (var i = 0; i < length; i++) {
                arr[i] = new Array(length)
                for (var j = 0; j < 2; j++) {
                    if(j === 0) {
                        arr[i][j] = list[i]
                    } else {
                        var imagesf = res2.data.filter(img => img.id_object === list[i]._id)
                        if (imagesf.length > 0) {
                            arr[i][j] = imagesf[0].filename
                        } else {
                            arr[i][j] = 'nada.png' 
                        }
                    }
                }
            }
        } else {
            const length = res.data.length
            var temp = new Array(length)
            if(this.props.match.params.pr) {
                res.data.sort(function (a, b) {
                    if (a.precio > b.precio) {
                      return 1;
                    }
                    if (a.precio < b.precio) {
                      return -1;
                    }
                    return 0;
                  });
                console.log(temp)
            }
            var arr = new Array(length)
            for (var i = 0; i < length; i++) {
                arr[i] = new Array(length)
                for (var j = 0; j < 2; j++) {
                    if(j === 0) {
                        arr[i][j] = res.data[i]
                    } else {
                        var imagesf = res2.data.filter(img => img.id_object === res.data[i]._id)
                        if (imagesf.length > 0) {
                            arr[i][j] = imagesf[0].filename
                        } else {
                            arr[i][j] = 'nada.png' 
                        }
                    }
                }
            }
        } 
        this.setState({ 
            products: res.data,
            lista: arr
        })
    }

    render() {
        return (
            <div className="row row-cols-1 row-cols-md-3">
                {
                    this.state.lista.map(list => (
                        <div className="col mb-4" key={list[0]._id}>
                            <div className="card text-white bg-dark h-100">
                                <img src={require('../public/upload/' + list[1])} className="card-img-top" alt="..."></img>
                                <div className="card-body">
                                    <Link className="nav-link" to={"/product/" + list[0]._id}>
                                        <h4 className="card-title">{list[0].title}</h4>
                                    </Link>
                                    <p className="card-text"><FaDollarSign color='white' size='1rem' />{list[0].precio}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

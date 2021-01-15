import React, { Component } from 'react'
import axios from 'axios'

export default class ShoppingCar extends Component {

    state = {
        userid: '',
        products: [],
        cantidades: [],
        productsJs: [],
        car: [],
        total: 0,
        compra: {usuario: '', products: [{}], privacity: 'public', total: '' },
        inventario: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"],
        selectedCant: '1',
        indexObj: '',
        auxProducts: []
    }

    async componentDidMount() {
        //this.getUsers();
        const resSession = await axios.get('http://localhost:5000/api/sessionState/')
        this.setState({userid: resSession.data[0].id})
        
        
        
        this.getProducts()
        
    }

    getProducts = async () => {
        /*const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data
        });*/

        const car= await axios.get('http://localhost:5000/api/carrito/carrito:'+ this.state.userid)
    
        this.setState({car: car.data})
        try{
            this.setState({products: Object.keys(car.data)})
            this.setState({cantidades: Object.values(car.data)})
        }
        catch{
            this.setState({products: []})
        }
        console.log(this.state.products)
        const arr = []
        for(var i = 0; i<this.state.products.length; i++){
            const res =await axios.get('http://localhost:5000/api/products/'+ this.state.products[i])
            arr.push({
                id: this.state.products[i],
                title: res.data.title,
                description: res.data.description,
                precio: res.data.precio,
                categoria: res.data.categoria,
                cantidad: this.state.cantidades[i],
                inventario: res.data.cantidad })
            this.state.auxProducts.push(res.data)
            
        }
        this.setState({productsJs: arr})
        console.log(this.state.auxProducts)
        this.calcularTotal()
    }
    calcularTotal(){
        console.log(this.state.productsJs.length)
        for(var i = 0; i<this.state.productsJs.length; i++){
            this.setState({total: this.state.total+parseInt(this.state.productsJs[i].precio)*
            parseInt(this.state.productsJs[i].cantidad)})
            
            console.log(this.state.productsJs[i].precio)
        }
        
    }

    onChangeUsername = e => {
       /* this.setState({
            username: e.target.value
        })*/
    }

    onSubmit = async (e) => {
        /*e.preventDefault();
        await axios.post('http://localhost:4000/api/users', {
            username: this.state.username
        });
        this.setState({ username: '' });
        this.getUsers();*/
    }

    deleteItem = async (prodID) => {
            console.log(prodID)
            await axios.delete( 'http://localhost:5000/api/carrito/carrito:'+this.state.userid, 
                 {data:{idproducto: prodID}}
            );
            window.location.reload(false);
    }

    onSubmitPurchase = async (e) =>{
        e.preventDefault();
        await axios.post( 'http://localhost:5000/api/purchases', 
                 {user: this.state.userid,
                privacity: 'public',
                products: this.state.productsJs,
                total: this.state.total}
            );
        console.log(this.state.products)
        for(var i=0; i<this.state.productsJs.length; i++){
            
            
            await axios.put( 'http://localhost:5000/api/products/'+this.state.products[i], 
                 {title: this.state.auxProducts[i].title, 
                    description: this.state.auxProducts[i].description, 
                    precio:this.state.auxProducts[i].precio, 
                    cantidad:this.state.auxProducts[i].cantidad - parseInt(this.state.cantidades[i]),
                    categoria: this.state.auxProducts[i].categoria,
                    envio: this.state.auxProducts[i].envio})
            this.deleteItem(this.state.products[i])
        }
        
        
    }

    getCantidad =async (inv) =>{
        var arr =[]
        for(var i=1; i<=inv; i++){
            arr.push(i)
        }
        //this.setState({inventario: arr})
        return arr;
    }

   

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                <div className="card card-body">
                        <h3>Compra</h3>
                        <h5>Total de Compra: ${this.state.total}</h5>
                        <form onSubmit={this.onSubmitPurchase}>
                            
                            <button type="submit" className="btn btn-primary">
                                Realizar Compra
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                <ul className="list-group">
                        {
                            this.state.productsJs.map((prods)=> (
                                <li className="list-group-item list-group-item-action"  key={prods.id} onDoubleClick={() => this.deleteItem(prods.id)}>

                                    {prods.title} {"$"+prods.precio}
                                    
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

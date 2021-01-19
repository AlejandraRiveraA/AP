import React, { Component } from 'react'
import axios from 'axios'

export default class RegisterSuculent extends Component {


    state = {
        suculents: [],
        title: '',
        description: '',
        enfermedad: '',
        reproduction: '',
        cuidado: '',
        editando: false,
        _id: ''
    }

    async componentDidMount() {
        this.getSuculents();


        if (this.props.match.params.id) {
            const resE = await axios.get('http://localhost:5000/api/suculents/' + this.props.match.params.id);
            this.setState({
                title: resE.data.title,
                description: resE.data.description,
                enfermedad: resE.data.enfermedad,
                reproduction: resE.data.reproduction,
                cuidado: resE.data.cuidado,
                _id: this.props.match.params.id
            })
        }
    }
    async getSuculents() {
        const res = await axios.get('http://localhost:5000/api/suculents')
        this.setState({ suculents: res.data })
    }

    async registrar() {
        const newSuculent = {
            title: this.state.title,
            description: this.state.description,
            enfermedad: this.state.enfermedad,
            reproduction: this.state.reproduction,
            cuidado: this.state.cuidado
        }
        if (this.state.editando) {
            await axios.put('http://localhost:5000/api/suculents/' + this.state._id, newSuculent);
        } else {
            await axios.post('http://localhost:5000/api/suculents', newSuculent);
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.registrar();
        if (this.props.match.params.id) {
            window.location.href = '/suculent/' + this.props.match.params.id;
        } else {
            this.getSuculents();
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
                    <h4>Registrar Suculenta</h4>


                    {/*SET Suculent */}
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Nombre de la Suculenta"
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
                            placeholder="Enfermedad"
                            name="enfermedad"
                            onChange={this.onInputChange}
                            value={this.state.enfermedad}
                            required
                        />
                    </div>

                  

                    

                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Reproduction"
                            name="reproduction"
                            onChange={this.onInputChange}
                            value={this.state.reproduction}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Cuidados"
                            name="cuidado"
                            onChange={this.onInputChange}
                            value={this.state.cuidado}
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

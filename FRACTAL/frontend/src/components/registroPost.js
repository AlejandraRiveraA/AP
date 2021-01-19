import React, { Component } from 'react'
import axios from 'axios'
import UserContext from '../UserContext'

    export default class RegisterPost extends Component {
        static contextType = UserContext

    state = {
        posts: [],
        title: '',
        description: '',
        editando: false,
        _id: '',
        id:''
    }

    async componentDidMount() {
        this.getPosts();
        const resSession = await axios.get('http://localhost:5000/api/sessionState/')
        this.setState({id: resSession.data[0].id})

        if (this.props.match.params.id) {
            const resE = await axios.get('http://localhost:5000/api/posts/' + this.props.match.params.id);
            this.setState({
                title: resE.data.title,
                description: resE.data.description,
                _id: this.props.match.params.id
            })
        }
    }
    async getPosts() {
        const res = await axios.get('http://localhost:5000/api/posts')
        this.setState({ posts: res.data })
    }

    async registrar() {

       // const resSession = await axios.get('http://localhost:5000/api/sessionState/')

        const newPost = {
            title: this.state.title,
            description: this.state.description,
            id: this.state.id
        }
        if (this.state.editando) {
            await axios.put('http://localhost:5000/api/posts/' + this.state._id, newPost);
        } else {
            await axios.post('http://localhost:5000/api/posts', newPost);
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.registrar();
        if (this.props.match.params.id) {
            window.location.href = '/post/' + this.props.match.params.id;
        } else {
            this.getPosts();
            window.location.href = '/';
            
        }
    }

    onInputChange = e => {

        this.setState({
            [e.target.name]: e.target.value// actualiza segun el nombre de lo que nos den (tittle, content...)

        })
        console.log(this.state)

    }



    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Registrar Posts</h4>


                    {/*SET posts */}
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Título del Post"
                            name="title"
                            onChange={this.onInputChange}
                            value={this.state.title}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <textarea type="text"
                            className="form-control"
                            placeholder="Descripción"
                            name="description"
                            onChange={this.onInputChange}
                            value={this.state.description}
                            required
                        />

                    </div>


                    <div className="card-footer md-9">

                        <form onSubmit={this.onSubmit}>

                            <button type='submit' className="btn btn-primary">
                                Publicar
                                
                        </button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

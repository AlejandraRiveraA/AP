import React, { Component } from 'react'


export default class Imagen extends Component {
/*
    state = {
        images: [],
        _idObject: ""
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/api/images');
        this.setState({
            images: res.data.filter(image => image.id_object === this.props.match.params.id)
        })
    }*/

    render() {
        return (
            <div className="card">

                <div className="card-header bg-dark text-white">
                    <i className="far fa-image"></i> Upload an Image
                </div>


                <div className="card-body">
                    <form action="http://localhost:5000/api/images" method="POST" encType="multipart/form-data">

                        <div className="form-group">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" name="Image" className="custom-file-input" id="inputGroupFile"
                                        aria-describedby="inputGroupFileAddon" required />
                                    <label className="custom-file-label" htmlFor="inputGroupFile">Choose file</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <input type="text" name="id_object" className="form-control" value={this.props.match.params.id} required/>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-success" href={"http://localhost:3000/product/" + this.props.match.params.id}>
                                <i className="fa fa-upload"></i> Upload Image
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
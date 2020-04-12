import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCar } from '../redux/actions/carActions';

class carForm extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            name: this.state.name
        };

        this.props.addCar(body);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <br /><br />
                    <input 
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name of car"
                    value={this.state.name}
                    onChange={this.onChange}
                    />
                    <br /><br />
                    <button className="btn btn-primary">Add Item</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { addCar })(carForm);
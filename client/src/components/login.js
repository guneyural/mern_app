import React, { Component } from 'react';
import { loginUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(user);
    }

    render() {
        return (
            <div>
                <h1>Login!</h1>
                <form onSubmit={this.onSubmit}>
                    <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChange}
                    style={{ padding: '5px', fontSize: '25px', fontFamily: 'helvetica' }}
                    required
                    />
                    <br /> <br />
                    <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChange}
                    style={{ padding: '5px', fontSize: '25px', fontFamily: 'helvetica' }}
                    required
                    />
                    <br /> <br />
                    <button className="btn btn-warning" style={{ padding: '8px', fontSize: '30px', fontFamily: 'helvetica' }}>LOGIN</button>
                </form>
            </div>
        )  
    }
}

export default connect(null, { loginUser })(Login);
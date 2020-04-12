import React, {Component} from 'react';
import { registerUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: ''
        };
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        this.props.registerUser(user);
    }

    render() {
        return (
            <div>
                <h1>Register from here...</h1>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    name="username"
                    placeholder="Name"
                    className="form-control"
                    value={this.state.username}
                    style={{ padding: '5px', fontSize: '25px', fontFamily: 'helvetica' }}
                    onChange={this.onChange}
                    required
                    />
                    <br /> <br />
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
                    value={this.state.password}
                    onChange={this.onChange}
                    className="form-control"
                    style={{ padding: '5px', fontSize: '25px', fontFamily: 'helvetica' }}
                    required
                    />
                    <br /> <br />
                    <button className="btn btn-primary" style={{ padding: '8px', fontSize: '30px', fontFamily: 'helvetica' }}>REGISTER</button>
                </form>
            </div>
        );
    }
}

export default connect(null, { registerUser })(Register);
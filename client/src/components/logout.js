import React, { Component } from 'react';
import { logoutUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';

class Logout extends Component{
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.logoutUser();
    }

    render () {
        return (
            <div>
                <button className="btn btn-danger" onClick={this.handleSubmit}>LOGOUT</button>
            </div>
        );
    }
}

export default connect(null, { logoutUser })(Logout);
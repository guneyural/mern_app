import React, { Component } from 'react'
import { connect } from 'react-redux';

class User extends Component {
    render() {
        const { auth } = this.props;
        let text;

        if(auth.isAuthenticated){
            text = "You are authenticated"
        }else{
            text = "You are not authenticated"
        }

        return (
            <div>
                <h3 style={auth.isAuthenticated ? { color: 'green' } : { color: 'red' }}>{text}</h3>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(User);
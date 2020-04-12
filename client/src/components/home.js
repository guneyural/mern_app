import React, { Component } from 'react'
import { connect } from 'react-redux'
import Register from './register';
import User from './user';
import Logout from './logout';
import Login from './login';
import Car from './car';

class Home extends Component {
    render() {
        return (
            <div>
                <User />
                <hr />
                {this.props.auth.isAuthenticated ? '' : <div><Register /> <hr /></div> }
                {this.props.auth.isAuthenticated ? '' : <div><Login /> <hr /></div>}
                {this.props.auth.isAuthenticated ? <Logout /> : ''}
                <p style={{ fontSize: '22px', color: 'green' }}>{this.props.auth.isLoading ? 'Loading...' : ''}</p>
                {this.props.auth.isAuthenticated ? <Car /> : ''}
                <p style={{color:'green'}}>{this.props.car.isLoading ? 'Loading...' : ''}</p>
                <p style={{fontSize: '22px'}} className="text-danger">{this.props.error.isError && this.props.error.id !== 'LOAD_USER' ? this.props.error.msg : 'NO ERROR'}</p>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth,
        error: state.error,
        car: state.car
    }
}

export default connect(mapStateToProps)(Home);
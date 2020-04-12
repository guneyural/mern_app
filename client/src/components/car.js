import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCar, removeCar } from '../redux/actions/carActions';
import CarForm from './carForm';

class Car extends Component {
    componentDidMount() {
        this.props.getCar();
    }

    handleDelete(id) {
        this.props.removeCar(id);
    }

    render() {

        const cars = this.props.car.cars.map(item => {
            return  <div key={item._id}>
                        <button className="btn btn-danger" onClick={this.handleDelete.bind(this, item._id)} style={{color:"white", fontSize: '25px'}}>X</button>
                        <span>{item.name}</span>
                    </div>
        });

        return (
            <div>
                {this.props.car.cars.length === 0 ? 'Add car to see car' : cars}
                <CarForm />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        car: state.car
    }
}

export default connect(mapStateToProps, { getCar, removeCar })(Car);
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Exercise extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    deleteHandler = () => {
        {this.props.deleteExercise(this.props.exercise._id)}
    }

    render() {  
        
        return (
                <tr>
                    <th>{this.props.exercise.username}</th>
                    <td>{this.props.exercise.description}</td>
                    <td>{this.props.exercise.duration}</td>
                    <td>{this.props.exercise.date.substring(0, 10)}</td>
                    <td><Link to={`/edit/${this.props.exercise._id}`} className="btn btn-success">Edit</Link>
                    <button className="btn btn-danger" onClick={this.deleteHandler}>Delete</button>
                    </td>
                </tr>
        )
        
    }
}

export default Exercise

import React, { Component } from 'react'
import axios from 'axios'
import Exercise from './Exercise'

class ExercisesList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            exercises: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState(
                    { exercises: response.data }
                )
            })
            .catch((error) => {
                console.log("error")
            })

    }

    deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res=> console.log(res.data));
        //filter only returns certain elements. For every element in the exercises array, we are going to return them only if el._id !== id
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList = () => {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h1>Exercise List</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Description</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExercisesList

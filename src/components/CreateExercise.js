import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './compstyles.css'
import axios from 'axios'

class CreateExercise extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/users")
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })

    }

    handleChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })


    }

    handleDateChange = (date) => {
        this.setState({
            date: date
        })
    }

    addExercise = (event) => {
        event.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        console.log("EXERCISE ADDED: " + exercise);
        window.location = '/';
    }

    render() {
        return (
            <div className="group-css">
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.addExercise}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            name="username"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.handleChange}>
                            {
                                this.state.users.map((user) => {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            name="description"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group" id="duration">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            name="duration"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            {<DatePicker
                                selected={this.state.date}
                                onChange={this.handleDateChange}
                            />}
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}

export default CreateExercise

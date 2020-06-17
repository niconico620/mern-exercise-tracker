import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'

class EditExercise extends Component {
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
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date),

                })
            })
            .catch(error => {console.log(error)});


        axios.get("http://localhost:5000/users")
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
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

    updateExercise = (event) => {
        event.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        console.log("EXERCISE UPDATED: " + exercise);
        window.location = '/';
    }

    render() {
        return (
            <div className="group-css">
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.updateExercise}>
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
                        <input type="submit" value="Update Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditExercise

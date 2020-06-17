import React, { Component } from 'react'
import axios from 'axios'

class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    addUser = (event) => {
        event.preventDefault();

        const user = {
            username: this.state.username
        }
        
        console.log(user);

        //post to server of backend and send the json in the 2nd argument. (user)
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        })

        
        //window.location= '/';
    }

    render() {
        return (
            <div className="group-css">
                <h3>Username Creation</h3>
                <form onSubmit={this.addUser}>
                    <div className="form-group" id="username">
                        <label>Add username here: </label>
                        <input type="text"
                            name="username"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Username" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser

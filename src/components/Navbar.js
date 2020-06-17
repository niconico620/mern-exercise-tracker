import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <Link to='/' className="navbar-brand">ExcerTracker</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to='/' className='nav-link'>Exercises</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/create' className='nav-link'>Create Exercise Log</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/user' className='nav-link'>CreateUser</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar

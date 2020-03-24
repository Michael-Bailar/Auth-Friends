import React, {useState} from 'react'
import axios from 'axios'
import axiosWithAuth from '../utils/axiosWithAuth'

const Login = props => {
    //set state
    const [credentials, setCredentials] = useState({username: '', password: ''})
    //declare functions
    const handleChange = e => {
        
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log('Login credentials', credentials)
        axiosWithAuth()
            .post('http://localhost:5000/api/login', credentials)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.payload)
                props.history.push('/friendslist')
            })
            .catch(err => console.log(err.res))
    }

    //render component
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='username'
                    placeholder='username'
                    value={credentials.username}
                    onChange={handleChange}
                />
                <input 
                    type='password'
                    name='password'
                    placeholder='password'
                    value={credentials.password}
                    onChange={handleChange}
                />
                <button>Log in</button>
            </form>
        </div>
    )
}

export default Login
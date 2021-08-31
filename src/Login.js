import React, { useState } from 'react'

const Login = (props) => {
    const [data, setData] = useState({email: '', password: ''})
    const handleInputChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div id="login-form" className="text-center">
            <form onSubmit={e => props.login(e, data)} className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" onChange={e=>handleInputChange(e)} id="inputEmail" name="email" className="form-control" placeholder="Email address" required="" autoFocus=""></input>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" onChange={e=>handleInputChange(e)} id="inputPassword" name="password" className="form-control" placeholder="Password" required=""></input>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">© 2017-2021</p>
            </form>
        </div>
    )
}

export default Login

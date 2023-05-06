import React from 'react'
import Signin from '../LogSignItems/Sign_in'
import Login from '../LogSignItems/Login'
import '../../style/Style.css'

import { FaSignInAlt, FaUserCircle } from 'react-icons/fa'
const LoginSignin = () => {
  return (
    <div className="container">
        <div className="card border-0 shadow o-hidden my-5">
            <div className="card-header d-flex justify-content-center">
                <ul className="nav nav-pills card-header-pills card-header-pills" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation"><button className="active nav-link" id="Login-tab" data-bs-toggle="tab" data-bs-target="#Login" type="button" role="tab" aria-controls="Login" aria-selected="true"><FaSignInAlt/>&nbsp; Se Connecter</button></li>
                    <li className="nav-item" role="presentation"><button id="Signin-tab" className="nav-link" data-bs-toggle="tab" data-bs-target="#Signin" type="button" role="tab" aria-controls="Signin" aria-selected="false"><FaUserCircle/>&nbsp; S'inscrire</button></li>
                </ul>
            </div>
            <div className="card-body p-0">
                <div id="myTabContent" className="tab-content">
                    <Login/>
                    <Signin/>
                </div>
            </div>
        </div>
    </div>           
  )
}

export default LoginSignin
import React, {useState} from 'react'
import './login.css'
import backgroundImage from '../../images/background.jpg'


function Login(){

    const [login, setLogin] = useState(true)

    function handleClick(){
        setLogin(!login)
    }

    //  I can refactor this to make it simpler and split into components
    return(
        <div className="login">
            <img src={backgroundImage} alt='' draggable= 'false' />
           
            <div className={`loginContainer ${login ? 'right-panel-active': ""}`} id="container">

                <div className="loginForm-container loginSign-up-container">
                    <form className='loginForm'action="#">
                         <h1 className="LoginLogo ">Kitchen Catalogue</h1>
                         <h2>Sign in</h2> 
                        
                        <input className="loginInput" type="email" placeholder="Email" />
                        <input className="loginInput" type="password" placeholder="Password" />
                        
                        <button className="loginButton">Sign In</button>
                        <p className="loginP">Not a member? Press <span onClick={handleClick} className=' blue' id="span_register"> here</span>  to register</p>
                    </form>
                </div>

                <div className={`loginForm-container loginSign-in-container ${login ? 'opacity': ""}`}>
                    <form action="#" className="loginForm">
                        <h1 className="LoginLogo register">Kitchen Catalogue</h1>
                        <h2 className="register">Create Account</h2>
                        <input className="loginInput" type="text" placeholder="Name" />
                        <input className="loginInput" type="email" placeholder="Email" />
                        <input className="loginInput" type="password" placeholder="Password" />
                        <input className="loginInput" type="password" placeholder="Please re-enter password" />
                        <button className="loginButton">Sign Up</button>
                        <p className="register loginP">Already a member? Press <span onClick={handleClick}  className=' blue'id="span_login"> here </span>to login</p>
                    </form>
                
                </div>

            
                <div className="loginOverlay-container">
                    <div className="loginOverlay">
                        <div className="loginOverlay-panel loginOverlay-left">
                            <h1>Kitchen Catalogue</h1>
                            <p className="loginP">Welcome to Kitchen Catalogue!</p>
                            <p className="loginP">Please enter your details to login</p>
                                                
                        </div>
                        <div className={`loginOverlay-panel loginOverlay-right ${login ? 'right-panel-active':""} `}>
                            <h1>Kitchen Catalogue</h1>
                            <p className="loginP">Please enter your details for a free account</p>
                            
                           
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login

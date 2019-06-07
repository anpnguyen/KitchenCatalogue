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
            <img src={backgroundImage} draggable= 'false' />
           
            <div className={`loginContainer ${login ? 'right-panel-active': ""}`} id="container">

                <div class="loginForm-container loginSign-up-container">
                    <form action="#">
                         <h1 class="LoginLogo">Kitchen Catalogue</h1>
                         <h2>Sign in</h2> 
                        
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        
                        <button>Sign In</button>
                        <p>Not a member? Press <span onClick={handleClick} class=' blue' id="span_register"> here</span>  to register</p>
                    </form>
                </div>

                <div class={`loginForm-container loginSign-in-container ${login ? 'opacity': ""}`}>
                    <form action="#">
                        <h1 class="LoginLogo register">Kitchen Catalogue</h1>
                        <h2 class="register">Create Account</h2>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Please re-enter password" />
                        <button>Sign Up</button>
                        <p class="register">Already a member? Press <span onClick={handleClick}  class=' blue'id="span_login"> here </span>to login</p>
                    </form>
                
                </div>

            
                <div class="loginOverlay-container">
                    <div class="loginOverlay">
                        <div class="loginOverlay-panel loginOverlay-left">
                            <h1>Kitchen Catalogue</h1>
                            <p>Welcome to Kitchen Catalogue! Please enter your details to login</p>
                                                
                        </div>
                        <div className={`loginOverlay-panel loginOverlay-right ${login ? 'right-panel-active':""} `}>
                            <h1>Kitchen Catalogue</h1>
                            <p>Please enter your details for a free account</p>
                            
                           
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login

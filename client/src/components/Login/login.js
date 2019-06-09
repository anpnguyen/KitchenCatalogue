import React, {useState} from 'react'
import './login.css'
import backgroundImage from '../../images/background.jpg'


function Login(){


    const initialData = {
        name:"",
        email:"",
        password:"",
        password2:""

    }
    const [login, setLogin] = useState(true)
    const [formData, setFormData] = useState( initialData)

    const {name, email, password, password2} = formData

    function handleClick(){
        setLogin(!login)
    }

    function handleChange(e)
    {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(){}
    return(
        <div className="login">
            <img src={backgroundImage} alt='' draggable= 'false' />
           
            <div className={`loginContainer ${login ? 'right-panel-active': ""}`} id="container">

                <div className="loginForm-container loginSign-up-container">
                    <form className='loginForm'onSubmit={handleSubmit}>
                         <h1 className="LoginLogo ">Kitchen Catalogue</h1>
                         <h2>Sign in</h2> 
                        
                        <input className="loginInput" type="email" placeholder="Email" name='email' value={email} onChange={handleChange} />
                        <input className="loginInput" type="password" placeholder="Password" name='password' value={password} onChange={handleChange} />
                        
                        <button className="loginButton">Sign In</button>
                        <p className="loginP">Not a member? Press <span onClick={handleClick} className=' blue' id="span_register"> here</span>  to register</p>
                    </form>
                </div>

                <div className={`loginForm-container loginSign-in-container ${login ? 'opacity': ""}`}>
                    <form  className="loginForm" onSubmit={handleSubmit}>
                        <h1 className="LoginLogo register">Kitchen Catalogue</h1>
                        <h2 className="register">Create Account</h2>
                        <input className="loginInput" type="text" placeholder="Name"  name='name' value={name} onChange={handleChange}/>
                        <input className="loginInput" type="email" placeholder="Email" name='email' value={email} onChange={handleChange}/>
                        <input className="loginInput" type="password" placeholder="Password" name='password' value={password} onChange={handleChange}/>
                        <input className="loginInput" type="password" placeholder="Please re-enter password" name='password2'value={password2} onChange={handleChange}/>
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

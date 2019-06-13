import React ,{useState}from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'
import { clearRecipe } from '../../actions/recipe';
import './navBar.css'


function NavBar(props){

    const {auth, logout, clearRecipe} = props
    const [toggle, setToggle ] = useState(false)
    
    function handleToggle(){
        setToggle(!toggle)
    }

    function handleLogout(){
        clearRecipe()
        logout()       
    }

    return(
        
        <div className="navBar">
            <div className="navBarLogo">
                <p className="navBarLogoText"><Link to='/'>Kitchen Catalogue</Link></p>
            </div>

            <div className="navBarButton " onClick={handleToggle}>
                <div className="burgerButton"></div>
                 <div className="burgerButton"></div>
                 <div className="burgerButton"></div>
            </div>

            <div className='navBarContainer'>
                <ul className={`navBarList ${toggle? 'display': ""}`}>                           
                    <li className="navBarListItem"><Link to='/recipe/new'>Create A Recipe</Link></li>
                    {/* <li className="navBarListItem"><Link to='/recipe'>View All Recipes</Link></li> */}
                    {/* <li className="navBarListItem"><Link to='/recipe/favourites'>View Facourites</Link></li> */}
                    <li className="navBarListItem"><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
      
             {auth.loading? "" : "Welcome back "+ auth.user.username }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {logout, clearRecipe})(NavBar)
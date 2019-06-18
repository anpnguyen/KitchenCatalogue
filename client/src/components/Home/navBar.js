import React, {useState, useRef, useEffect} from 'react'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'
import { clearRecipe } from '../../actions/recipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './navBar.css'


function NavBar(props){
    const node = useRef()
    const { logout, clearRecipe} = props
    const [toggle, setToggle ] = useState(false)
    
    function handleToggle(){
        setToggle(!toggle)
    }

    function handleLogout(){
        clearRecipe()
        logout()       
    }


    useEffect(() => {
        const handleClickOutside = e => {
           
        
            if (node.current.contains(e.target)) {
            
              return;
            }
            
            setToggle(false);
          };
        
        if (toggle) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [toggle]);

      
 

    return(
        <><div>
        <div className="navBar">
            <div className="navBarLogo">
                <p className="navBarLogoText"><Link to='/'>Kitchen Catalogue</Link></p>
            </div>

            {/* <div className="navBarButton " onClick={handleToggle}>
                <div className="burgerButton"></div>
                 <div className="burgerButton"></div>
                 <div className="burgerButton"></div>
            </div> */}

            <div className="navBarButton " onClick={handleToggle}>
                <FontAwesomeIcon icon={faBars} />
            </div>

            

            
            {/* <button onClick={handleLogout}><i className="fa fa-sign-out"></i>Logout</button> */}
             
        </div>
        <div className='navBarContainer' ref={node}>
            <ul className={`navBarList ${toggle && 'slide'}`} >                           
                <li className="navBarListItem"><h2 className='pacifico'>Kitchen Catalogue</h2></li>
                <li className="navBarListItem" onClick={()=>setToggle(false)}><Link to='/recipe/new'>Create A Recipe</Link></li>
                <li className="navBarListItem" onClick={()=>setToggle(false)}><Link to='/recipe'>View All Recipes</Link></li>
                
                <li className="navBarListItem" onClick={handleLogout}>Logout</li>
                </ul>
            </div>
        </div>
        
            
       
        
        
    
    </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {logout, clearRecipe})(NavBar)
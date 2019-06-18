import React from 'react'
import './footer.css'

function Footer(){
    return(
        <div className="footer">
            <div className="footerBox text-center">
                <h2 className="pacifico footerLogo">Kitchen Catalogue</h2>
                <p className="footertext">© 2019 Kitchen Catalogue. </p>
                <p className="footertext">All rights reserved.</p>
            </div>
            
            {/* <div className="footerBox footerBoxRight ">
                <ul className='footerList'>
                    <li className='bold'>
                        Kitchen Catalogue
                    </li>
                    <li>Home</li>
                    <li>Create New Recipe</li>
                    <li>My Recipes</li>
                    <li>My Cookbooks</li>
                </ul>
            </div> */}
        </div>
    )
}

export default Footer
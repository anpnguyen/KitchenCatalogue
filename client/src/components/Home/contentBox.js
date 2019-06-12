import React, {Fragment, useState, useEffect} from 'react'
import ContentCard from './contentCard'
import './contentBox.css'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

function ContentBox(props){

    const {title, text, recipe, showAll} = props
    
    const {recipes, loading} = recipe
    const [pageLimit, setPageLimit] = useState(5)
    const [navigation, setNavigation] = useState({start:0, end: pageLimit, current: 1})
    const totalItems = recipes.length
    const totalPages = Math.floor((recipes.length/pageLimit)) + 1

    
    
    console.log(navigation)
    console.log(pageLimit)

    useEffect(
        ()=>{
        setNavigation({...navigation, start: 0, end:pageLimit, current:1})
        
    },[pageLimit]
    )
    const mappedData = recipes.map((recipe, index) =>{
        
        
        if(!showAll && index <4)
            {
            return <ContentCard title="Chicken Curry" recipe={recipe} showAll={showAll} text={text} key={recipe._id}/>
            
        } 

        else if(showAll && index < navigation.end  && index>= navigation.start ){
            return <ContentCard title="Chicken Curry" recipe={recipe} showAll={showAll} text={text} key={recipe._id}/>
        } else {
            return <Fragment key={recipe._id}></ Fragment>
        }

        
    })


    function setFirst(){
        setNavigation({start:0, end: pageLimit, current: 1})
    }
// 0 -20   curr1
    function setNext(){
        let newNavigation = {start: navigation.start + pageLimit, end: navigation.end + pageLimit , current: navigation.current +1 } 
        setNavigation(newNavigation)
    }
    // 20 -40 curr 2

    function setBack(){
        let newNavigation = {start: navigation.start - pageLimit,  end: navigation.end - pageLimit, current: navigation.current -1 } 
        setNavigation(newNavigation)
    }
    
    function setLast(){
        let newNavigation = {start: (totalPages-1)*pageLimit ,  end: totalPages* pageLimit, current: totalPages } 
        setNavigation(newNavigation)
    }

    function handleNavigationClick(e){
        console.log(e.target.value)
        let newNavigation = {start: (e.target.value-1)*pageLimit ,  end: (e.target.value)* pageLimit, current: e.target.value } 
        setNavigation(newNavigation)
    }
// 80 to 91
    // 80 - 100


   
    function navigationNumbers(){
        let navItems = []
    
    for(let i =0; i< totalPages  ; i++){
        if(i < totalPages -1 && i >0 )
        navItems.push(
        <button key= {i + "navButton" }onClick={handleNavigationClick} value={i+1}>{i+1}</button>        )
    }
    return navItems
}

    return(
        loading? <h1> loading</h1>:
        <div className="contentBox">
            
            <div className="contentBoxContent ">
                <h1 className="text-center">{title}</h1>  
                <hr className="width80"/>
                <div className="contentBoxNavigation">

                   {navigation.current!==1 ? <button onClick={setFirst}>First</button> : 'Filler'  }
                    {navigation.current!==1 ? <button onClick={setBack}>Back</button> : "filler"  }
                    <button onClick={setNext}>Next</button>   
                    <button onClick={setLast}>Last</button> 
 
                   <select name="cars" onChange={(e)=>setPageLimit(parseInt(e.target.value))} value={pageLimit}>
  
  <option value={5}>5 items per Page</option>
  <option value={10}>10</option>

  



  <option value={20}>20</option>
  <option value= {50}>50</option>
</select>  

<span> showing {navigation.start +1} to { navigation.end <= totalItems? navigation.end : totalItems} of {totalItems} </span>

{navigationNumbers()}

                    <hr className="width80"/>
                </div>
                <div className="contentBoxCard">
                    {mappedData}
           
                </div>
                
            </div>
            
        </div>


                
            
            
            
    )
}

// export default ContentBox
ContentBox.propTypes = {
    recipe: PropTypes.object.isRequired
    // auth: PropTypes.object.isRequired,
    // getRecipes: PropTypes.func.isRequired


}


const mapStateToProps = state => ({
    // auth: state.auth,
    recipe: state.recipe
})

export default connect(mapStateToProps, {})(ContentBox)




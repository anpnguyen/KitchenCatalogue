import React from 'react'
import ContentCard from './contentCard'
import './contentBox.css'


function ContentBox(props){

    const {title, text, myRecipes} = props
    const data = ['1','2','3','4','5','6','7','8','9','10']



    const mappedData = data.map((dataPoint, index) =>{
        if(!myRecipes && index <4)
            {
            return <ContentCard title="Chicken Curry" data={data} text={text}/>

        } 

        if(myRecipes){
            return <ContentCard title="Chicken Curry" data={data} text={text}/>
        }
        
    })

    return(
        <div className="contentBox">
            <div className="contentBoxSide "></div>
            <div className="contentBoxContent ">
                <h1 className="text-center">{title}</h1>  
                <hr className="width80"/>
                <div className="contentBoxCard">
                    {mappedData}
                    {/* <ContentCard title="Chicken Curry" data={data} text={text}/> */}
                    {/* <ContentCard title="Chicken curry wioth extra rice" data={data} text={text}/> */}
                    {/* <ContentCard title="yummy yummy" data={data} text={text}/> */}
                    {/* <ContentCard title="my recipe with special sause" data={data} text={text}/> */}
                </div>
                
            </div>
            <div className="contentBoxSide "></div>
        </div>


                
            
            
            
    )
}

export default ContentBox







// content box

    // have a content card
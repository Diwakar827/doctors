import React from 'react';
import './layout.css';
const SideNavbar = () => {

    let arr=[
    {    
        logo:"😊😊",
        title:"home"
    },
    {    
        logo:"😊😊",
         title:"Login"
    },
    {    
        logo:"😊😊",
         title:"Apply Doctor",
    },
    {    
        logo:"😊😊",
         title:"Book Appoitnment"
    }

]
    return (
        <div className='sidebar'>
        
             
             {arr.map((temp, index) => (  
              <div id={index}>  
                 <span>{temp.logo}</span> 
                 <span>{temp.title}</span>
              </div>  
            ))}  
         
         
        </div>
    );
};

export default SideNavbar;

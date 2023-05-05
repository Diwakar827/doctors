import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
const Home = () => {
    

    const getData=async()=>{

        try {
            const response=await axios.post('http://localhost:5000/api/userchecking/getuserdata',{},{
                headers:{
                    // eslint-disable-next-line no-useless-concat
                    Authorization:'Bearer'+" "+localStorage.getItem('token')
                }
            });
            console.log(response.data);
        } 
        catch (error) {
            console.log(error);
            
        }

    }
 
    useEffect(()=>{

    getData();
   

  },[])
    return (


      
      <div className='Layout'>
           
           <Layout></Layout>

            
        </div>
       
    );
};

export default Home;
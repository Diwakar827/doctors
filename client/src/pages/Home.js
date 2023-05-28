import React, { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import {useDispatch, useSelector} from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
const Home = () => {
       
 
    return (


      
      <div className='Layout'>
           
           <Layout></Layout>

            
        </div>
       
    );
};

export default Home;


 /*  const {user}=useSelector((state)=>state.user);
    const dispatch=useDispatch();

    const navigate=useNavigate();

    const getData=async()=>{

        try {
            const response=await axios.post('http://localhost:5000/api/userchecking/getuserdata',{},{
                headers:{
                    // eslint-disable-next-line no-useless-concat
                    Authorization:'Bearer'+" "+localStorage.getItem('token')
                }
            });
            console.log(response.data);
            if(response.data.success)
            {
                dispatch(setUser(response.data.data));
                console.log("done");
            }
            else{
                localStorage.clear();
                navigate("/login");
              
            }
            } catch (error) {
                localStorage.clear();
                 console.log(error);
               navigate("/login");  
              
                
            }

    }
 
    useEffect(()=>{

        if(!user)
        {
            getData();
        }

    },[user])



    INstead of doing this individually i am doing this with the help of protected route
    */
   
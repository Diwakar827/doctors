
import React from 'react';

import Layout from '../components/Layout';
import { Tabs} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { setUser } from '../redux/userSlice';

const Notifications = () => {
    const {user}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const markAllAsSeen=async()=>{
   
        try {
            const response = await axios.post(
              "https://doctorsking.vercel.app/api/userchecking/markunseennotifications",
              {userId:user._id},{
                headers:{
                    // eslint-disable-next-line no-useless-concat
                    Authorization:'Bearer'+" "+localStorage.getItem('token')
                }
              }

            );

            console.log(response);
      
            if (response.data.success) {
              toast.success(response.data.message);
              dispatch(setUser(response.data.data));
             
            } else {
                
              toast.error(response.data.message);
            }
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
          }

    }

    const deleteallnotifications=async()=>{
       
        try {
            const response = await axios.post(
              "https://doctorsking.vercel.app/userchecking/deleteallnotifications",
              {userId:user._id},{
                headers:{
                    // eslint-disable-next-line no-useless-concat
                    Authorization:'Bearer'+" "+localStorage.getItem('token')
                }
              }

            );

            console.log(response);
      
            if (response.data.success) {
              toast.success(response.data.message);
              dispatch(setUser(response.data.data));
             
            } else {
                
              toast.error(response.data.message);
            }
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
          }




    }


    return (
        <Layout>
        <h1 className='page-title'>Notifications</h1>
        <Tabs>
            <Tabs.TabPane tab="Unseen" key={0}>
                 <h2>Unseen</h2>
                 <div className='d-flex justify-content-end'>
                    <h1 className='anchor' onClick={markAllAsSeen}>Mark all as seen</h1>
                 </div>
             
                 {user?.unseenNotifications?.map((notification)=>(
                    <div className='card p-2'onClick={()=>{navigate(notification.onClickPath)}}>
                        <div className='card-text'>{notification.message}</div>
                    </div>
                 ))
                 }
                {/* use of map in bracket demands explicit return value if use map(()={}) for implicit return i used map(()=>()) */}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Seen" key={1}>
                 <h2>Seen</h2>
                 <div className='d-flex justify-content-end'>
                    <h1 className='anchor' onClick={deleteallnotifications}>Delete all</h1>
                 </div>
                 {user?.seenNotifications?.map((notification)=>(
                    <div className='card p-2' onClick={()=>{navigate(notification.onClickPath)}}>
                        <div className='card-text'>{notification.message}</div>
                    </div>
                 ))
                 }
            </Tabs.TabPane>
        </Tabs>
        </Layout>
    );
};

export default Notifications;
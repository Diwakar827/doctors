import React, { useEffect } from 'react';
import Content from '../components/Content';
import SideNavbar from '../components/SideNavbar';
import NotificationSection from '../components/NotificationSection';
import axios from 'axios';
import './layout.css';
const Layout = () => {

  

    return (
        <div className='layout'>
             <SideNavbar ></SideNavbar>
           
           <div className='combiner'>
            <NotificationSection> </NotificationSection>

              <Content></Content>
              </div>
            
        </div>
    );
};

export default Layout;
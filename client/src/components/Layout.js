import React, { useState } from "react";
import "./layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/userSlice';

const Layout = ({children }) => {

 

     const dispatch=useDispatch();
    const navigate=useNavigate();
     const{user}=useSelector((state)=>state.user);
 
  console.log(user);

  const [collapsed, setcollapsed] = useState(false);
  const location = useLocation();

  
  const userMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-list-settings-fill",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-5-line",
    },
    /*{  removing  this as common for all admin,user,doctor abd adding static
      name: "Logout",
      path: "/logout",
      icon: "ri-login-circle-line",
    },
    */
  ];
  
  const adminMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "ri-home-line",
    },
    {
        name: "Users",
        path: "/users",
        icon: "ri-user-line",
      },
      {
        name: "Doctors",
        path: "/doctors",
        icon: "ri-user-4-line",
      },
    
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-5-line",
    },
   
  ];

  const menuToBeRendered = user?.isAdmin?adminMenu:userMenu ;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={collapsed ? "collapsed-sidebar" : "sidebar"}>
          <div className="sidebar-header">
            <h1 className="logo">Dh</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
    
              return (
                <div  className={`d-flex menu-item ${ isActive && "active-menu-item"    }`}>
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}

                </div>
              );
            })}
            <div  className="d-flex menu-item" onClick={()=>{
    
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/login"); 
}} >
                
                  <i className="ri-login-circle-line"></i>
                  {!collapsed && <Link to="/login">Logout</Link>}
                </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i class="ri-menu-line" onClick={() => setcollapsed(false)}></i>
            ) : (
              <i
                className="ri-close-fill remix-icons"
                onClick={() => setcollapsed(true)}
              ></i>
            )}
            <div className="d-flex ">
            <i className="ri-notification-2-line header-action-icon mr-15"></i>
            <Link className="anchor mx-2" to='/profile' >{user?user.name:""}</Link>
            </div>
          </div>
          <div className="body">{children}  {/* chidren null to be fixed */}
          <h1> i am body</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

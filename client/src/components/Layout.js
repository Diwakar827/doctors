import React, { useState } from "react";
import "./layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Badge } from "antd";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

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

    /*{
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-5-line",
    },
    */
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];
 
  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={collapsed ? "collapsed-sidebar" : "sidebar"}>
          <div className="sidebar-header">
          
            <h1 className="logo">{role} <i className="ri-hearts-fill"></i></h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;

              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                onClick={()=>navigate(menu.path)} >
                  <i className={menu.icon} ></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className="d-flex menu-item"
              onClick={() => {
                localStorage.clear();
                dispatch(setUser(null));
                navigate("/login");
              }}
            >
              <i className="ri-login-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header" >
            {collapsed ? (
              <i className="ri-menu-line" onClick={() => setcollapsed(false)}></i>
            ) : (
              <i
                className="ri-close-fill remix-icons"
                onClick={() => setcollapsed(true)}
              ></i>
            )}
            <div className="d-flex ">
            <Badge count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}></Badge>
              <i className="ri-notification-2-line header-action-icon mr-15" onClick={()=>navigate('/notifications')}></i>
              <Link className="anchor mx-2" color="greenyellow">
                {user ? user.name : ""}
              </Link>
            </div>
          </div>

          <div className="body">
            {children} {/* chidren null to be fixed */}
           
          </div>
        </div>
     
       
        
      </div>
   
    
<section className="about" id="about">

<h1 className="heading"> <span>about</span> us </h1>

    <div className="about-row-content">
        <h3 className="about-row-content-h3">we take care of your healthy life</h3>
        <p className="about-row-content-p">Connect with a board-certified physician anytime, anywhere using our free app.</p>
        <p className="about-row-content-p">With Your Doctors Online, you can get online doctor consultations with an experienced doctor within minutes from the comfort of your home.</p>
        <a className="btn" href="https://simple.wikipedia.org/wiki/Healthy_lifestyle" target="_blank"> learn more <span><i className="ri-send-plane-2-fill"></i></span> </a>
    </div>



</section>


<section className="review" id="review">
    
    <h1 className="heading"> client's <span>review</span> </h1>

    <div className="box-container">

        <div className="box">
            <img src="https://wallpapercave.com/wp/wp2655110.jpg" alt=""/>
            <h3>Dr.Jaishankar</h3>
            <div className="stars">
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-half-fill"></i>
               
            </div>
            <p className="text">A very amazing and cheerful eye specialist</p>
        </div>

        <div className="box">
            <img src="https://thumbs.dreamstime.com/b/indian-doctor-mature-male-medical-standing-isolated-white-background-handsome-model-portrait-31871541.jpg" alt=""/>
            <h3>Dr.Hemendra</h3>
            <div className="stars">
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-half-fill"></i>
            </div>
            <p className="text">A very amazing heart specialist</p>
        </div>

        <div className="box">
            <img src="https://focus.independent.ie/thumbor/o-07XwdVSL7YZvmJ8s1aQDBVATI=/960x640/smart/prod-mh-ireland/6b9f3d28-c45e-11ed-bc90-0210609a3fe2" alt=""/>
            <h3>Angel Julie</h3>
            <div className="stars">
            <i className="ri-hearts-fill"></i>
            <i className="ri-hearts-fill"></i>
            <i className="ri-hearts-fill"></i>
            <i className="ri-hearts-fill"></i>
            <i className="ri-hearts-fill"></i>
            </div>
            <p className="text">Specialised doctor for womens</p>
        </div>

    </div>

</section>

 
   
<section className="footer">

<div className="footercontainer">

  
    <div className="footerbox">
        <h3 className="footerboxh3">our services</h3>
        <a className="footera"> <span className="footerai"><i class="ri-arrow-right-s-line"></i> </span> dental care </a>
        <a className="footera"> <span className="footerai"><i class="ri-arrow-right-s-line"></i> </span> message therapy </a>
        <a className="footera"> <span className="footerai"><i class="ri-arrow-right-s-line"></i> </span> cardioloty </a>
        <a className="footera"><span className="footerai"><i class="ri-arrow-right-s-line"></i> </span>diagnosis </a>
        <a className="footera"><span className="footerai"><i class="ri-arrow-right-s-line"></i> </span> ambulance service </a>
    </div>

    <div className="footerbox">
        <h3 className="footerboxh3">contact info</h3>
        <a className="footera"><span className="footerai" href="tel:6396379663"> <i class="ri-phone-line"></i></span>+4786487909</a>
        <a className="footera"> <span className="footerai" href="tel:916396379663"> <i class="ri-phone-line"></i></span> +111-222-3333 </a>
        <a  type="email"  className="footera" href="mailto:diwakarchauhaun827@gmail.com"><span className="footerai"><i class="ri-mail-fill"></i>  </span> diwakarchauhaun827@gmail.com </a>
        <a className="footera"> <span className="footerai" href="mailto:darkcoder380@gmail.com"><i class="ri-mail-fill"></i>  </span>darkcoder380@gmail.com </a>
        <a className="footera"><span className="footerai"> <i class="ri-map-pin-line"></i></span> noida, india - 400104 </a>
    </div>

    <div className="footerbox">
        <h3 className="footerboxh3">follow us</h3>
        <a className="footera"> <span className="footerai"><i class="ri-facebook-circle-fill"></i></span> facebook </a>
        <a className="footera"> <span className="footerai"><i class="ri-twitter-fill"></i> </span>twitter </a>
        <a className="footera"> <span className="footerai"><i class="ri-instagram-line"></i> </span>instagram </a>
        <a className="footera"> <span className="footerai"><i class="ri-linkedin-box-fill"></i></span> linkedin </a>
        <a className="footera"><span className="footerai"> <i class="ri-shopping-basket-line"></i> </span>pinterest </a>
    </div>

</div>

<div className="credit"> created by <span className="creditspan">Diwakar Chauhan</span> | all rights reserved </div>

</section>






      
    </div>
  );
};

export default Layout;

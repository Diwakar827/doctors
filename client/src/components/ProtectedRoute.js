import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading())
       
      const response=await axios.post('http://localhost:5000/api/userchecking/getuserdata',{},{
                headers:{
                    // eslint-disable-next-line no-useless-concat
                    Authorization:'Bearer'+" "+localStorage.getItem('token')
                }});
         
                console.log(response.data);
                
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        console.log("done");
      } else {
        localStorage.clear()
        navigate("/login");
      }
    } catch (error) {  
      dispatch(hideLoading());
      localStorage.clear()
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    
     console.log(props.children);
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;

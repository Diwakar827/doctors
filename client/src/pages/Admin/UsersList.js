import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Table } from 'antd';
import moment from 'moment';

 
   

const UsersList=()=>{

    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const getUsersData = async () => {
      try {
       // dispatch(showLoading());
        const response = await axios.get("https://doctorsking.vercel.app/api/admin/getallusers",{
                headers:{
                    // eslint-disable-next-line no-useless-concat
                    Authorization:'Bearer'+" "+localStorage.getItem('token')
                }
              });
       // dispatch(hideLoading());
       console.log(response.data.data);
        if (response.data.success) {
          setUsers(response.data.data);
        
        }
      } catch (error) {
         console.log(error);
       // dispatch(hideLoading());
      }
    };
  
    useEffect(() => {
      getUsersData();
    }, []);
  
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        render: (text,record) => moment(record.createdAt).format("DD-MM-YYYY"),
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => (
          <div className="d-flex">
            <h1 className="anchor">Block</h1>
          </div>
        ),
      },
    ];
  
    return (
      <Layout>
        <h1 className="page-header">Users List</h1>
        <hr />
        <Table columns={columns} dataSource={users}/>
      </Layout>
    );
  }
  
  export default UsersList;
  
import React, { useEffect } from 'react';
import './App.css';
import CardsGrid from './components/CardsGrid';
import Footer from './components/Footer';
import FormDialog from './components/FormDialog';
import Header from './components/Header';
import User from './model/User';
import axios from 'axios';
import { FormDiaogType } from './Enum';
import { Bounce, ToastContainer } from 'react-toastify';
import { url } from './Constants';

function App() {
  const [open, setOpen] = React.useState(false);
  const [formType, setFormType] = React.useState(FormDiaogType.ADD);
  const [selectedUser,setSelectedUser] = React.useState(null)
  const [userList, setUserList] = React.useState(Array.of());

  useEffect(() => {
    axios.get(url+'/users')
      .then(response => {
        console.log(response)
        setUserList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function UpdateUser(selectedUser) {
    const newLi = userList.map((user,index)=>{
      if(selectedUser.id === user.id) return selectedUser
      else return user
    }) 
    setUserList(newLi)
    axios.put(`${url}/updateUser?id=${selectedUser.id}`, selectedUser)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  
  function AddNewUser(user) {
    const newList = userList.concat(user);
    setUserList(newList)
    axios.post(url+'/addUser', user)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function DeleteUser(id) {
    setUserList(li => li.filter(item => item.id !== id));
    axios.delete(`${url}/${id}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (    
    <div className="App">
      <Header/>
      <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
              />
      <FormDialog formType={formType} open={open} setOpen={setOpen} selectedUser={selectedUser} setSelectedUser={setSelectedUser} AddNewUser={AddNewUser} UpdateUser={UpdateUser}/>
      <CardsGrid setFormType={setFormType} setOpen={setOpen} userList={userList} setSelectedUser={setSelectedUser} DeleteUser={DeleteUser}/>
      <Footer/>
    </div>
  );
}

export default App;

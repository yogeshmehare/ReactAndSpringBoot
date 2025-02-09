import React, { useEffect } from 'react';
import './App.css';
import CardsGrid from './components/CardsGrid';
import Footer from './components/Footer';
import FormDialog from './components/FormDialog';
import Header from './components/Header';
import User from './model/User';
import axios from 'axios';

function App() {
  const [open, setOpen] = React.useState(false);
  const [selectedUser,setSelectedUser] = React.useState(null)
  const [userList, setUserList] = React.useState(
    Array.of(
      new User(
        1,
        "Yogesh Mehare",
        "Android Developer",
        "https://avatar.iran.liara.run/public",
        "https://www.facebook.com/yogeshmehare124"
      ),
      new User(
        2,
        "Chetan Gadda",
        "Doctor",
        "https://avatar.iran.liara.run/public",
        "https://www.facebook.com/yogeshmehare124"
      ),
      new User(
        3,
        "Apu bakri",
        "Medical",
        "https://avatar.iran.liara.run/public",
        "https://www.facebook.com/yogeshmehare124"
      ),
      new User(
        4,
        "Anshu fattu",
        "10th fail berozgaar",
        "https://avatar.iran.liara.run/public",
        "https://www.facebook.com/yogeshmehare124"
      ),
      new User(
        5,
        "Ruchi bokrin",
        "Cyber security expert",
        "https://avatar.iran.liara.run/public",
        "https://www.facebook.com/yogeshmehare124"
      )
    )
  );
  const url = "http://localhost:8080";

  useEffect(() => {
    axios.get(url+'/profiles/users')
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
  }

  function DeleteUser(id) {
    setUserList(li => li.filter(item => item.id !== id));
  }

  return (    
    <div className="App">
      <Header/>
      <FormDialog open={open} setOpen={setOpen} selectedUser={selectedUser} setSelectedUser={setSelectedUser} UpdateUser={UpdateUser}/>
      <CardsGrid setOpen={setOpen} userList={userList} setSelectedUser={setSelectedUser} DeleteUser={DeleteUser}/>
      <Footer/>
    </div>
  );
}

export default App;

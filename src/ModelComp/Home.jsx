import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import ModelComp from "./ModelComp";

const userStructre = {
  name: "",
  email: "",
  mobile: "",
  gender: "",
  hobbies: [],
  password: "",
  cpassword: "",
};

export default function Home() {
  let [user, setUser] = useState(userStructre);
  let [users, setUsers] = useState([]);
  let [editIndex, setEditIndex] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const editHandler = (ele,ind) => {
    setEditIndex(ind);
    setUser(ele);
    toggle(true)
  }
  useEffect(()=>{
     let usersData = localStorage.getItem('users');
     if(usersData){
      setUsers(JSON.parse(usersData));
     }
  },[])
 
  return (
    <>
      <div className="container">
          <UserTable users={users} setUsers={setUsers} editHandler={editHandler} toggle={toggle}/>
          <ModelComp editIndex={editIndex} modal={modal} toggle={toggle} users={users} setUsers={setUsers} user={user} setUser={setUser}/>
      </div>
    </>
  );
}

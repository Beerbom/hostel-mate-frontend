import React,{useContext} from 'react'
import {UserContext}from '../context/userContext';

function UserPage() {
  const{user}=useContext(UserContext)
  return (
    <div>
      <h1>dashboard</h1>
      {!!user &&(<h2>hi {user.AdmNo}!</h2>)}
    </div>
  )
}

export default UserPage
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [ users, setUsers] =useState([]);

  useEffect(()=>{
    fetch('http://localhost:5200/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])


  const handleAddUser = event =>{
   event.preventDefault();
   const form = event.target;
   const name = form.name.value;
   const email = form.email.value;
   const user = { name, email }
   console.log(user);
   fetch('http://localhost:5200/users',{
    method:'POST',
    headers : {
      'content-type' : 'application/json'
    },
    body: JSON.stringify(user)
   } )

   .then(res => res.json())
   .then(data => {
    console.log(data);
    const newUsers = [...users, data]
    setUsers(newUsers);
    form.reset();
   })

  }





  return (
    <>
      
      <h1>clients side server</h1>
      <h3>Member : {users.length}</h3>

      <div className='form-box'>

<h2>Users_Form</h2>

<form onSubmit={handleAddUser} >
    <input type="text" name="name" id="" />
    <br />
    <input type="email" name="email" id="" />
    <br />
    <input type="submit" value="Add User" />
</form>

</div>
      
      <div>
         {
            users.map( user => <p key={user.id} className='users-p'> {user.id} : {user.name} : {user.email} </p> )
         }
      </div>

     
     
    </>
  )
}

export default App

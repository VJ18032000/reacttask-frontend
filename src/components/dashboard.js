import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Table from 'react-bootstrap/Table'


function Dashboard() {
const email=localStorage.getItem('data')

const [firstname, setFirstname] = React.useState('')
const [lastname, setLastname] = React.useState('')
const [eemail, setEmail] = React.useState('')
const [contact, setContact] = React.useState('')
const [address, setAddress] =React.useState('')
const [image, setImage] =React.useState('')


  const history=useNavigate()
  const [logout,setLogout]=useState(false)
      

  React.useEffect(()=>{
    if(!localStorage.getItem('auth'))history('/login')
},[logout])

const logoutHandler= e =>{
  e.preventDefault();
  localStorage.removeItem('auth')
  localStorage.removeItem('data')
  setLogout(true)
}

React.useEffect(() => {
  const response = axios
      .get(`http://localhost:4000/register/email/${email}`)
      .then(res => {
          const data1 = res.data;
          setFirstname(data1[0].first_name)
          setLastname(data1[0].last_name)
          setAddress(data1[0].address)
          setContact(data1[0].contact)
          setEmail(data1[0].email);
          setImage(data1[0].image);
         
          console.log('1')
      })
      .catch((err) => {
          if (err && err.response) console.log(err);
      })
  if (response && response.data) {
      alert(response.data.message);
  }
}, [])


    return (
     
  
        <div className='App'>
           <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/><br/> <br/> <br/><br/> <br/> <br/>
 <button className='btn btn-warning logout' onClick={logoutHandler}>logout</button>

     <h5 className='upper'>WELCOME {firstname} {lastname}...</h5>
<br/>
<br/>
<img className="preview"  src={`http://localhost:4000/static/${image}`} alt="avator" />
<br/>
<br/>
     <Table striped bordered hover>
  <thead>
    <tr>
      <th>Profile</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>First Name</td>
      <td>{firstname}</td>
    </tr>
    <tr>
    <td>Last Name</td>
      <td>{lastname}</td>
    </tr>
    <tr>
    <td>Email</td>
      <td>{eemail}</td>
    </tr> <tr>
    <td>Contact</td>
      <td>{contact}</td>
    </tr>
    <tr>
    <td>Address</td>
      <td>{address}</td>
    </tr>
  </tbody>
</Table>
         </div> 
         
    )
}
export default Dashboard;
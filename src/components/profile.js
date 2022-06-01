import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Profile() {

    const [firstname, setFirstname] = React.useState('')
    const [lastname, setLastname] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [contact, setContact] = React.useState('')
    const [address, setAddress] =React.useState('')

    const data = localStorage.getItem('data')
    const history = useNavigate();

    React.useEffect(() => {
        if (!localStorage.getItem('auth')) history('/login')
    }, [])

    React.useEffect(() => {
    const response = axios
        .get(`http://localhost:4000/register/email/${data}`)
        .then(res => {
            const data1 = res.data;
            setFirstname(data1[0].first_name)
            setLastname(data1[0].last_name)
            setAddress(data1[0].address)
            setContact(data1[0].contact)
            setEmail(data1[0].email);
            console.log('1')
        })
        .catch((err) => {
            if (err && err.response) console.log(err);
        })
    if (response && response.data) {
        alert(response.data.message);
    }
}, [])


function submit(e){
    e.preventDefault()
    const value={firstname,lastname,email,contact,address}
    console.log(value)
    axios
    .put(`http://localhost:4000/register/email/${data}`, value)
    .catch((err) => {
        if (err && err.response) console.log(err);
    }).then((res) => {
       alert("updated successfully... ")
    })

    const formdata = new FormData(); 
    formdata.append('avatar', userInfo.file);

    axios.put(`http://localhost:4000/register/email/upload/${email}`, formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
    })
    .then(res => { // then print response status
      console.warn(res);
        setSuccess(res.data);
    })
    history('/dashboard')
    window.location.reload('/dashboard');
}

const [isSucces, setSuccess] = React.useState(null);
const [userInfo, setuserInfo] = React.useState({
    file:[],
    filepreview:null,
   });
 const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file:event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    });

  }
//   const submit = async () =>{
//     const formdata = new FormData(); 
//     formdata.append('avatar', userInfo.file);

//     axios.put(`http://localhost:4000/register/email/upload/${email}`, formdata,{   
//             headers: { "Content-Type": "multipart/form-data" } 
//     })
//     .then(res => { // then print response status
//       console.warn(res);
//         setSuccess(res.data);
//     })
//   }






    return (
        <div className='App'>

<br /><br />
            <br /><br /> <br /><br />
            <br /><br /> <br /><br />

<form >

            <div className="form-group row">
                <label>First name</label>
              <input type="text" name="firstname" 
                    value={firstname} onChange={(e)=> setFirstname(e.target.value)}
                    className="form-control" />
            </div>
            <div className="form-group row">
                <label>Last name</label>
                <input type="text" name="lastname" 
                    defaultValue={lastname} onChange={(e) =>setLastname(e.target.value)}
                    className="form-control" />
            </div>
            <div className="form-group row">
                <label>Address</label>
                <input type="text" name="address" 
                    defaultValue={address} onChange={(e) => setAddress(e.target.value)}
                    className="form-control" placeholder="Please fill Address" />
            </div>
            <div className="form-group row">
                <label>Contact no</label>
                <input type="number" name="contact" 
                    defaultValue={contact} onChange={(e) => setContact(e.target.value)}
                    className="form-control" placeholder="Please fill Contact" />
            </div>
            <div className="form-group row">
                <label>Email</label>
                <input type="text" name="email" 
                    defaultValue={email} onChange={(e) => setEmail(e.target.value)}
                    className="form-control" disabled />
            </div>

             {/* <span className='span'>
     {isSucces !== null ? <h4> {isSucces} </h4> :null }
     </span> */}
     <div className="form-group row">
<label className="form-group">Profile</label>
<input className="form-control" name="upload_file"  type="file" onChange={handleInputChange}/>
</div>
{userInfo.filepreview !== null ? 
<img className="preview"  src={userInfo.filepreview} alt="UploadImage" />
: null}<br/><br/>
{/* <button type="submit" className="btn btn-dark" onClick={()=>submit()} > upload </button> */}




            <button type="submit" className='btn btn-info' onClick={submit} >Update</button>
            </form>

        </div>
    )
}
export default Profile;
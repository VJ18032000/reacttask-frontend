import React, { useState } from "react";
import Toast from 'react-bootstrap/Toast'
import axios from 'axios';
import { useFormik } from "formik";
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./dashboard";
import Profile from "./profile";
import Resetpassword from "./resetpassword";

function Login() {

    const history =useNavigate();

    const [loginStatus, setLoginStatus] = useState("")
    const [show, SetShow] = useState(false)

    React.useEffect(()=>{
        if(localStorage.getItem('auth'))history('/dashboard')
    },[])

    const Formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string()
                .required("email is required")
                .email(),
            password: yup.string()
                .required("Password is required")
        }),
        onSubmit: (values) => {
            const { ...data } = values;
            console.log(values);
            Formik.resetForm();
            SetShow(true)
           



    const login=
        axios.post("http://localhost:4000/register/login", data).then((res) => {
            console.log(res)
            if (res.data.message) {
                setLoginStatus(res.data.message)
                
            } else {
                setLoginStatus(res.data[0].email)
                const data=res.data[0].email;
                console.log(data)
                 history('/profile')
                localStorage.setItem('auth',true)
                localStorage.setItem('data',data)
            }
        })
    }

        })
      
    return (
        <div>
        <form>
            <div> 
                <h3 className="font-weight-bold"> LOGIN </h3></div>
            <Toast onClose={() => SetShow(false)} show={show} delay={5000} autohide>
                <Toast.Body className=" bg-danger text-white">
                    {loginStatus}
                </Toast.Body>
            </Toast>
            
                <div className="form-group ">
                    <label>Email<span className="text-danger">*</span></label>
                    <input type="email" name="email"
                        onChange={Formik.handleChange}
                        value={Formik.values.email}
                        className="form-control" placeholder="Enter email" required />
                    {Formik.errors.email ? <div className="text-danger">{Formik.errors.email}</div> : null}
                </div>
                <div className="form-group" >
                    <label>Password<span className="text-danger">*</span></label>
                    <input type="password" name="password"
                        onChange={Formik.handleChange}
                        value={Formik.values.password}
                        className="form-control" placeholder="Enter password" required />
                    {Formik.errors.password ? <div className="text-danger">{Formik.errors.password}</div> : null}
                </div>

            <button type="submit" onClick={Formik.handleSubmit} className="btn btn-dark btn-lg btn-block">Sign in</button>
            <Link className="nav-link" to={"/register"}>Don't have an account? Create an account</Link> 
       
        </form>
        </div>
    ); 
}
export default Login;

import React, { useState } from "react";
import axios from 'axios';
import { useFormik } from "formik";
import * as yup from 'yup';
import Toast from 'react-bootstrap/Toast'
import {useNavigate} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {
    const history=useNavigate()
    React.useEffect(()=>{
        if(localStorage.getItem('auth'))history('/dashboard')
    },[])

    const [registerStatus,setRegisterStatus]=useState("")
    const [show,SetShow] = useState(false)

    const Formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            firstname: yup.string()
                .required("First name is required")
                .min(3, "minimum 3 characters required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
                .max(17, "maximum 17 characters only"),
            lastname: yup.string()
                .required("Last name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
                .min(3, "minimum 3 characters required")
                .max(17, "maximum 17 characters only"),
            email: yup.string()
                .required("email is required")
                .email(),
            password: yup.string()
                .max(8, "maximum 8 characters only")
                .required("Password is required")
        }),
        onSubmit: (values) => {
            const { ...data } = values;
            console.log(values);
            Formik.resetForm();
            SetShow(true)
           


            const response = axios
                .post("http://localhost:4000/register/register", data)
                .catch((err) => {
                    if (err && err.response) console.log(err);
                }).then((res) => {
                    if(res.data.message){
                        setRegisterStatus(res.data.message)
                    }else{
                       setRegisterStatus("Data successfully register")
                       history('/dashboard')
                       localStorage.setItem('auth',true)
                    localStorage.setItem('data',data.email)                       
                    }
                    // console.log(res.data);
                })
            // if (response.data.message) {
            //    
            // }else{
            // }

        }
    })
    return (
        <form >
            <div> <h3 className="font-weight-bold"> REGISTRATION PAGE</h3></div>
<Toast onClose={()=>SetShow(false)} show={show} delay={5000} autohide>
    <Toast.Body className=" bg-primary text-white">
    {registerStatus}
    </Toast.Body>
</Toast>

            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>First name<span className="text-danger">*</span></label>
                    <input type="text" name="firstname"
                        onChange={Formik.handleChange}
                        value={Formik.values.firstname}
                        className="form-control" placeholder="First name" required />
                    {Formik.errors.firstname ? <div className="text-danger">{Formik.errors.firstname}</div> : null}
                </div>
                <div className="form-group col-md-6">
                    <label>Last name<span className="text-danger">*</span></label>
                    <input type="text" name="lastname"
                        onChange={Formik.handleChange}
                        value={Formik.values.lastname}
                        className="form-control" placeholder="Last name" required />
                    {Formik.errors.lastname ? <div className="text-danger">{Formik.errors.lastname}</div> : null}

                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Email<span className="text-danger">*</span></label>
                    <input type="email" name="email"
                        onChange={Formik.handleChange}
                        value={Formik.values.email}
                        className="form-control" placeholder="Enter email" required />
                    {Formik.errors.email ? <div className="text-danger">{Formik.errors.email}</div> : null}
                </div>
                <div className="form-group col-md-6" >
                    <label>Password<span className="text-danger">*</span></label>
                    <input type="password" name="password"
                        onChange={Formik.handleChange}
                        value={Formik.values.password}
                        className="form-control" placeholder="Enter password" required />
                    {Formik.errors.password ? <div className="text-danger">{Formik.errors.password}</div> : null}

                </div>
            </div>

            <button type="submit" onClick={Formik.handleSubmit} className="btn btn-dark btn-lg btn-block">Register</button>
            <Link className="nav-link" to={"/login"}>Already have an account? Sign in</Link>
        </form>
    );

}
export default App; 
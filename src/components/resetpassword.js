import React ,{useState}from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from "formik";
import * as yup from 'yup';


function Resetpassword() {

   //  const [value, setValue] = useState([]);

   const history = useNavigate();
const email=localStorage.getItem('data')
   React.useEffect(() => {
      if (!localStorage.getItem('auth')) history('/login')
   }, [])

 

   // const login =
   //    axios.get(`http://localhost:4000/register/email/${email}`,).then((res, err) => {
   //       if (err) {
   //          console.log("error", err)
   //       } else {
   //          // console.log(res.data)
   //          setValue(res.data)
   //       }
   //    })
 

     const Formik = useFormik({
      initialValues: {
          password: '',
          confirmpassword: ''
      },
      validationSchema: yup.object({
          password: yup.string()
              .min(8, "minimum 8 characters only")
              .required("Password is required"),

          confirmpassword: yup.string()
              .oneOf([yup.ref('password'), null], "confirm password must be same with password ")
              .min(8, "minimum 8 characters only")
              .required("Confirm Password is required"),
   }),
      onSubmit: (values) => {
          const { ...data } = values;
          console.log(values);
          axios
          .put(`http://localhost:4000/register/email/password/${email}`, values)
          .catch((err) => {
              if (err && err.response) console.log(err);
          }).then((res) => {
             alert("Password updated successfully... ")
          })
          history('/dashboard')
      }
     })




   return (
      <form >
      <div className="form-group" >
                    <label>Password<span className="text-danger">*</span></label>
                    <input type="password" name="password"
                        onChange={Formik.handleChange}
                        value={Formik.values.password}
                        className="form-control" placeholder="Enter password" required />
                    {Formik.errors.password ? <div className="text-danger">{Formik.errors.password}</div> : null}

                </div>
                <div className="form-group">
                    <label>Confirm Password<span className="text-danger">*</span></label>
                    <input type="password" name="confirmpassword"
                        onChange={Formik.handleChange}
                        value={Formik.values.confirmpassword}
                        className="form-control" placeholder="Enter confirm password" required />
                    {Formik.errors.confirmpassword ? <div className="text-danger">{Formik.errors.confirmpassword}</div> : null}
                </div>
                <button type="submit" onClick={Formik.handleSubmit} className="btn btn-dark btn-lg btn-block">Change password</button>

      </form>
   )
}
export default Resetpassword;
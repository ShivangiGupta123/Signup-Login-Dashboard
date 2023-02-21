import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import "./Signup.css";
function Signup() {
	
  const phoneRegExp = /^\d{3}-\d{3}-\d{4}$/;
  // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  //using formik library
  // 1. Initializing empty when form is open

  const formik = useFormik({
    initialValues: {
      Username: "",
      Email: "",
      Password: "",
      Confirm_Password: "",
      Phone: "",
	  DOB: ""
    },

    // 2.then after validating when we are filling the form

    validationSchema: Yup.object({
      Username: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      Email: Yup.string().email("Invalid email address").required("Required"),
      Password: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
      Confirm_Password: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required")
        .oneOf([Yup.ref("Password")], "Passwords does not match"),
      Phone: Yup.string()
        .required("Required")
        .matches(phoneRegExp, "The value must be in this format (777-444-5555)")
        .min(12, "too short")
        .max(12, "too long"),
		DOB: Yup.date()
		.typeError('The value must be a date (YYYY-MM-DD)')
		.required('Required'),
    }),

    // 3. when submitting the form  , get all the data from the form
    onSubmit: (values) => {
		axios.post('http://localhost:3500/api/v1/signup',values ).then((res)=>{
			console.log("res.data" , res.data)
		
			console.log("res.token" , res.data.token)
			alert("registered successfully")

			// alert(JSON.stringify(values, null, 2));

		}).catch((err)=>{
			console.log(err)
		})
		},
      

    //   alert(formik.values);
      //   alert("successfully registered")
 
  });
//   console.log("formik.values", formik.values);
  return (
    <div class="container ">
      <div
        class="d-flex justify-content-center h-100"
        style={{ marginTop: 100 }}
      >
        <div class="card" style={{ height: 550, width: 500 }}>
          <div class="card-header">
            <h3>Admin</h3>
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  name="Username"
                  class="form-control"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Username}
                />
                {formik.touched.Username && formik.errors.Username ? (
                  <div style={{ color: "white" }}>{formik.errors.Username}</div>
                ) : null}
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
                <input
                  type="email"
                  name="Email"
                  class="form-control"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Email}
                />
                {formik.touched.Email && formik.errors.Email ? (
                  <div style={{ color: "white" }}>{formik.errors.Email}</div>
                ) : null}
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  name="Password"
                  class="form-control"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Password}
                />
                {formik.touched.Password && formik.errors.Password ? (
                  <div style={{ color: "white" }}>{formik.errors.Password}</div>
                ) : null}
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  name="Confirm_Password"
                  class="form-control"
                  placeholder="Confirm_Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Confirm_Password}
                />
                {formik.touched.Confirm_Password &&
                formik.errors.Confirm_Password ? (
                  <div style={{ color: "white" }}>
                    {formik.errors.Confirm_Password}
                  </div>
                ) : null}
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-phone"></i>
                  </span>
                </div>
                <input
                  type="text"
                  name="Phone"
                  class="form-control"
                  placeholder="Phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Phone}
                />
                {formik.touched.Phone && formik.errors.Phone ? (
                  <div style={{ color: "white" }}>{formik.errors.Phone}</div>
                ) : null}
              </div>
			  <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-birthday-cake"></i>
                  </span>
                </div>
                <input
                  type="text"
                  name="DOB"
                  class="form-control"
                  placeholder="DOB"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.DOB}
                />
                {formik.touched.DOB && formik.errors.DOB ? (
                  <div style={{ color: "white" }}>{formik.errors.DOB}</div>
                ) : null}
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  value="Register"
                  class="btn float-right login_btn "
                  style={{ width: 467 }}
                />
              </div>
            </form>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              Have an account?<Link to="/">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

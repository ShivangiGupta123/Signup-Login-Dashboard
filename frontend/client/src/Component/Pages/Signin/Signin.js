import React from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import './Signin.css'
function Signin() {
	const nav = useNavigate()
	// const headers = {
	// 	'Content-Type' : 'application/json',
	// 	'authorization' : localStorage.getItem('token')
	// }
	
	const formik = useFormik({
		initialValues: {
		  Email: "",
		  Password: "",
		 
		},
		validationSchema: Yup.object({
			
			
			Email: Yup.string().email("Invalid email address").required("Required"),
			Password: Yup.string()
			  .max(10, "Must be 10 characters or less").required("Required")
			
		  }),
		  onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
			axios.post('http://localhost:3500/api/v1/signin',values  ).then((res)=>{
				
				console.log( "res.data.data.Username",res.data.data.Username)
				// console.log("res.data.data", res.data.data)
				// console.log("res.data", res.data)
				console.log("token" , res.data.token)
				if(res.data.message){
					alert(JSON.stringify(res.data.message))
					

				    localStorage.setItem('token',res.data.token)
				    localStorage.setItem('user',res.data.data.Username)
					nav('/dashboard')
					// console.log("headers =" , headers)
					// console.log("token",res.data.token)

				}
				

				

			}).catch((err)=>{
				
				alert(JSON.stringify(err.response.data))
			    console.log(err.response.data.message)
				
			})
		  
		  },
	})
	// console.log("formik.values", formik.values);


  return (
    <div class="container ">
	<div class="d-flex justify-content-center h-100" style = {{marginTop : 150}}>
		<div class="card">
			<div class="card-header">
				<h3>Admin</h3>
				
			</div>
			<div class="card-body">
				<form onSubmit={formik.handleSubmit}> 
				<div class="input-group form-group">
				<div class="input-group-prepend">
					<span class="input-group-text"><i class="fa fa-envelope"></i></span>
				</div>
				<input type="email" name = "Email" class="form-control" placeholder="Email" onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.Email}/>
				{formik.touched.Email && formik.errors.Email ? (
					<div style={{ color: "white" }}>{formik.errors.Email}</div>
				  ) : null}
				
			</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="password" name = "Password" class="form-control" placeholder="Password" onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.Password}/>
						{formik.touched.Password && formik.errors.Password ? (
							<div style={{ color: "white" }}>{formik.errors.Password}</div>
						  ) : null}
					</div>
				
					<div class="form-group">
						<input type="submit" value="Login" class="btn float-right login_btn"/>
					</div>
				</form>
			</div>
			<div class="card-footer" >
				<div class="d-flex justify-content-center links" >
					Don't have an account?<Link to="/admin-signup">Sign Up</Link>
				</div>
				<div class="d-flex justify-content-center">
					<a href="#">Forgot your password?</a>
				</div>
			</div>
		</div>
	</div>
</div>
   
  )
}

export default Signin
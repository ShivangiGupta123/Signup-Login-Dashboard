import React, { useEffect, useState } from "react";
import axios from 'axios'
import "./Dashboard.css";
function Dashboard() {

  const headers = {
    'Content-Type' : 'application/json',
    'authorization' : localStorage.getItem('token')
  }
  // useEffect(()=>{
  //   axios.get('http://localhost:3500/api/v1/userdetails',{
  //     headers : headers
  //   }).then((res)=>{
  //     setUserAccount(res.data)
  //     console.log(res.data)
  //   }).catch((err)=>{
  //     console.log(err)
  //   })

  // } , [])

  

  return (
    <div style={{ paddingLeft: 161 }}>
      <div class="container-fluid">
      
        <div class="sidenav">
        <logo class="" href="#">
        <img className="logo" src="https://www.freepnglogos.com/uploads/photography-logo-png/photography-logo-dave-wall-photographer-educator-retoucher-digital-4.png" alt="" width="30" height="24"/>
        </logo>
        <a href="#">Dashboard</a>
          <a href="#">Member</a>
          <a href="#">Task</a>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg navbar-light  d-flex flex-row-reverse bd-highlight">
  
       
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-flex flex-row-reverse bd-highlight" id="navbarNav">
          <ul class="navbar-nav">
           
           
            <li class="nav-item">
              <a class="navbar-brand" href="#">
                {localStorage.getItem('user')}
              </a>
            </li>
            <li class="nav-item">
              <a class="navbar-brand" href="/logout">
            Logout
              </a>
            </li>
           
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Dashboard;

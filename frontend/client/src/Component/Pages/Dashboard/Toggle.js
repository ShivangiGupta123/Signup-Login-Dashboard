import React , {useState} from 'react'
import './Dashboard.css'
function Navbar() {
    const [isSidebar,setIsSidebar]=useState(false)

    const toggleSidebar=()=>{
        setIsSidebar(!isSidebar);
    }
  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-light " style = {{backgroundColor : 'gray'}}>
  <div class="container-fluid">
  <div id="mySidebar" style={{width:isSidebar?"250px":0}} className="sidebar">
  <a href="javascript:void(0)" className="closebtn" onClick={toggleSidebar}>×</a>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
</div>

<div id="main" style={{marginLeft:isSidebar?"250px":0}}>
  <button className="openbtn" onClick={toggleSidebar}>☰ </button>  
 
</div>
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="navbar-brand" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="navbar-brand" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="navbar-brand" href="#">Pricing</a>
        </li>
       
      </ul>
    </div>
  </div>
</nav>

    
    
    </div>
  )
}

export default Navbar
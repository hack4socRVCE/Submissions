<?php include('server.php') ?>
<html>
<head> 
    <title>Team CipherHex</title>
    <style>
.error {
                width: 92%; 
                margin: 0px auto; 
                padding: 10px; 
                border: 1px solid black; 
                color:red; 
                background: #FF0000; 
                border-radius: 5px; 
                text-align: left;
}
.fade{
    font-weight:bold;
}
@keyframes slidein {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
      
    body {
        background-color:#DDD0C8;
        align-items: center;
        display: flex;
        justify-content:right;
        height: 100vh;
        margin-right: 500px;
        opacity: 0;
        animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .form {
        margin-top: 10px;
        background-color:#BFB0A8;
        border-radius: 20px;
        box-sizing: border-box;
        height: 550px;
        padding: 20px;
        width: 420px;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .title {
        color: #000000;
        font-family: sans-serif;
        font-size: 36px;
        font-weight: 600;
        margin-top: 30px;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      
      .input-container {
        height: 50px;
        position:relative;
        width: 100%;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .ic1 {
        margin-top: 40px;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .ic2 {
        margin-top: 30px;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .input {
        background-color: #DDD0C8;
        border-radius: 12px;
        border: 0;
        box-sizing: border-box;
        color: #000000;
        font-size: 18px;
        height: 100%;
        outline: 1;
        outline-color: #000000;
        padding: 4px 20px 0;
        width: 100%;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      .cut {
        background-color: #BFB0A8;
        border-radius: 10px;
        height: 20px;
        left: 20px;
        position: absolute;
        top: -20px;
        transform: translateY(0);
        transition: transform 200ms;
        width: 76px;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .cut-short {
        width: 118px;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .input:focus ~ .cut,
      .input:not(:placeholder-shown) ~ .cut {
        transform: translateY(8px);
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .placeholder {
        color: #000000;
        font-family: sans-serif;
        left: 20px;
        line-height: 14px;
        pointer-events: none;
        position: absolute;
        transform-origin: 0 50%;
        transition: transform 200ms, color 200ms;
        top: 20px;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .input:focus ~ .placeholder,
      .input:not(:placeholder-shown) ~ .placeholder {
        transform: translateY(-30px) translateX(10px) scale(0.75);
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .input:not(:placeholder-shown) ~ .placeholder {
        color: #000000;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .input:focus ~ .placeholder {
        color: #646056;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .btn {
        background-color: #08d;
        border-radius: 12px;
        border: 0;
        box-sizing: border-box;
        color: #eee;
        cursor: pointer;
        font-size: 18px;
        height: 50px;
        margin-top: 38px;
        // outline: 0;
        text-align: center;
        width: 100%;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      
      .btn:active {
        background-color: #06b;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      p{
        text-align: center;
        font-family: sans-serif;
        color:rgb(0, 0, 0);
        font-style: italic;
        opacity: 0;
            animation-name: fadein;
            animation-duration: 2s;
            animation-delay: 0.0s;
            animation-fill-mode: forwards;
            
      }
      @keyframes fadein {
                from { opacity:0; }
                to { opacity:1; }
            }
    </style>
   
</head>

<body>
<div class="deets"> 
<form method="post" action="">
<div class="form">
    <div class="title">Log-in!</div><br>
    <?php include('errors.php'); ?>
    <div class="input-container ic1">
      <input id="E-mail ID" class="input" name="EmailId" type="text" placeholder=" " />
      <div class="cut"></div>
      <label name="email" class="placeholder">E-mail ID</label>
    </div>
    <div class="input-container ic2">
      <input id="Password" class="input" name="password" type="password" placeholder=" " />
      <div class="cut"></div>
      <label name="password1" class="placeholder">Password</label>
    </div>
    <button type="submit" class="btn" name="login_user">Submit</button>  
    <p>
        Create Account? <a href="signup.php">Sign up</a>
        
    </p>
    <p>
        Admin? <a href="adminlogin.php">Login as admin</a>
    </p>
  </div> 
</form>
</div>
</body>
  </html>
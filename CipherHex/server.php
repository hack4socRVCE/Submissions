
<?php
error_reporting(0);
ini_set('display_errors', 0);

session_start();

$email = "";
$errors = array();

$db = mysqli_connect('localhost', 'root', '', 'login_credentials');

if (isset($_POST['save_user'])) {
  $Name = mysqli_real_escape_string($db, $_POST['Name']);
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $password_1 = mysqli_real_escape_string($db, $_POST['password1']);
  $password_2 = mysqli_real_escape_string($db, $_POST['password2']);

  
  if (empty($Name)) { array_push($errors, "Name is required"); }
  if (empty($email)) { array_push($errors, "EmailId is required"); }
  if (empty($password_1)) { array_push($errors, "Password is required"); }
  if ($password_1 != $password_2) {
	array_push($errors, "passwords do not match");
  }

  
  $user_check_query = "SELECT * FROM credentials WHERE EmailId='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { 
    if ($user['EmailId'] == $email) {
      array_push($errors, "email already exists");
    }
  }

  if (count($errors) == 0) {
  	$password = md5($password_1);

  	$query = "INSERT INTO credentials (EmailId, password,Name) 
  			  VALUES('$email', '$password','$Name')";
  	mysqli_query($db, $query);
    $_SESSION['username'] = $username;
  	$_SESSION['success'] = "You are now logged in";
  	header('location: login.php');
  }
}

if (isset($_POST['login_user'])) {
  $email = mysqli_real_escape_string($db, $_POST['EmailId']);
  $password = mysqli_real_escape_string($db, $_POST['password']);
  if (empty($email)) {
    array_push($errors, "EmailId is required");
  }
  if (empty($password)) {
    array_push($errors, "Password is required");
  }

  if (count($errors) == 0) {
    $password = md5($password);
    $query = "SELECT * FROM credentials WHERE EmailId='$email' AND password='$password'";
    $results = mysqli_query($db, $query);
  
    if (mysqli_num_rows($results) == 1) {
      
      $user_query = "SELECT Name FROM credentials WHERE EmailId='$email' LIMIT 1";
      $user_result = mysqli_query($db, $user_query);
      
      if ($user_result && mysqli_num_rows($user_result) > 0) {
        $user = mysqli_fetch_assoc($user_result);
        $username = $user['Name'];
        $_SESSION['username'] = $username;
      }

      $_SESSION['EmailId'] = $email; 
      $_SESSION['username'] = $username;
      header('location: students.php');
    } else {
      array_push($errors, "Wrong EmailId/password combination");
    }
  }
}
?>
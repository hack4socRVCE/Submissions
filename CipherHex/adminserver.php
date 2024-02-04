<?php
session_start();

$email    = "";
$errors = array(); 

$db = mysqli_connect('localhost', 'root', '', 'login_credentials');

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
        $query = "SELECT * FROM admins WHERE EmailId='$email' AND password='$password'";
        $results = mysqli_query($db, $query);
        
        if (mysqli_num_rows($results) == 1) {
            // Fetch the corresponding name from the 'admins' table
            $name_query = "SELECT Name FROM admins WHERE EmailId='$email' LIMIT 1";
            $name_result = mysqli_query($db, $name_query);
            
            if ($name_result && mysqli_num_rows($name_result) > 0) {
                $name_row = mysqli_fetch_assoc($name_result);
                $username = $name_row['Name'];
                $_SESSION['username'] = $username; // Set username in the session
            } else {
                array_push($errors, "Name not found");
            }

            $_SESSION['EmailId'] = $email;
            $_SESSION['success'] = "You are now logged in";
            header('location: admins.php');
        } else {
            array_push($errors, "Wrong EmailId/password combination");
        }
    }
}
?>

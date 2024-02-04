<?php
session_start();

$email = "";
$errors = array();

$db = mysqli_connect('localhost', 'root', '', 'login_credentials');

$userEmail = isset($_SESSION['EmailId']) ? $_SESSION['EmailId'] : '';
$username = isset($_SESSION['username']) ? $_SESSION['username'] : '';

if (isset($_POST['login_user'])) {
    $email = mysqli_real_escape_string($db, $_POST['EmailId']);
    $points = mysqli_real_escape_string($db, $_POST['POINTS']);

    if (empty($email)) {
        array_push($errors, "EmailId is required");
    }
    if (empty($points)) {
        array_push($errors, "Points is required");
    }

    if (count($errors) == 0) {
        
        $user_query = "SELECT activitypoints, Name FROM credentials WHERE EmailId='$email' LIMIT 1";
        $user_result = mysqli_query($db, $user_query);

        if ($user_result && mysqli_num_rows($user_result) > 0) {
            $user = mysqli_fetch_assoc($user_result);
            $currentPoints = $user['activitypoints'];
            $username = $user['Name'];

            $newPoints = $currentPoints + $points;

            $update_query = "UPDATE credentials SET activitypoints='$newPoints' WHERE EmailId='$email'";
            mysqli_query($db, $update_query);

            $_SESSION['success'] = "Points updated successfully";
            $_SESSION['username'] = $username;
            // Clear form fields and display a message
            echo '<script>alert("Points updated successfully");';
            echo 'document.getElementById("emailId").value = "";';
            echo 'document.getElementById("points").value = "";';
            echo '</script>';
        } else {
            array_push($errors, "User not found");
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <style>
      body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

nav {
    background-color: #333;
    color: #fff;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav h3 {
    margin: 0;
}

nav a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    margin-right: 20px;
}

.form {
    margin-top: 50px;
}

form {
    max-width: 400px;
    margin: auto;
}

.email,
.Points {
    margin-bottom: 20px;
}

.input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.cut {
    height: 20px;
    border-bottom: 2px solid #333;
    margin-bottom: -2px;
}

.placeholder {
    position: absolute;
    top: 10px;
    left: 15px;
    font-size: 14px;
    color: #333;
    transition: all 0.2s ease-in-out;
}

.Points .placeholder {
    top: -5px;
}

.btn {
    background-color: #333;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.success-message {
    color: green;
    margin-top: 10px;
}
    </style>
    <script src="https://cdn.jsdelivr.net/npm/web3@1.3.6/dist/web3.min.js" defer></script>
</head>

<body>
    <nav>
        <h3 id="welcome-message"></h3>
        <a href="adminlogin.php" style="margin-right:10px;">logout </a>
    </nav>
    <div class="form">
        <?php
        if (isset($_SESSION['success'])) {
            echo '<p style="color: green;">' . $_SESSION['success'] . '</p>';
            unset($_SESSION['success']);
        }
        ?>
        <form method="post" action="" id="points-form">
            <div class="email">
                <input id="emailId" class="input" name="EmailId" type="text" placeholder="Email-Id of the Student" />
                <div class="cut"></div>
                <label name="email" class="placeholder"></label>
            </div>
            <div class="Points">
                <input id="points" class="input" name="POINTS" type="text" placeholder="Points Awarded" />
                <div class="cut"></div>
                <label name="points" class="placeholder">points</label>
            </div>
            <button type="submit" class="btn" name="login_user">Submit</button>
        </form>
    </div>

    <script>
        const userEmail = "<?php echo $userEmail; ?>";
const username = "<?php echo $username; ?>";

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('welcome-message').innerText = "Welcome, " + username;

    const web3 = new Web3('HTTP://127.0.0.1:7545');
    
    const init = async () => {
        const response = await fetch('./src/abis/ACTPOINTSMGMT.json');
        const jsonText = await response.text();

        const MyContract = JSON.parse(jsonText);

        const id = await web3.eth.net.getId();
        const deployedNetwork = MyContract.networks[id];

        const contract = new web3.eth.Contract(
            MyContract.abi,
            deployedNetwork.address
        );

        
        document.getElementById('points-form').addEventListener('submit', async function (event) {
            event.preventDefault();

            const pointsInput = document.getElementById('points').value;
            const emailInput = document.getElementById('emailId').value;
            const points = web3.utils.toBN(pointsInput);

            const result = await contract.methods.getStudentInfo(emailInput).call();
            console.log("Initial points:", result['points']);

            const res = await contract.methods.updateStudentInfo(emailInput, points).send({
                from: '0xb297EA13117d76b6ca84683Bff3Ab32c6Ac40B6F'
            });
            console.log(res);

            if (res.status) {
                const result2 = await contract.methods.getStudentInfo(emailInput).call();
                console.log("Updated points:", result2['points']);
                $newPoints = $currentPoints + $points;
                $update_query = "UPDATE credentials SET activitypoints='$newPoints' WHERE EmailId='$email'";
                mysqli_query($db, $update_query);
            } else {
                console.log("Transaction failed");
            }
          $_SESSION['success'] = "Points updated successfully";
          $_SESSION['username'] = $username;

            alert("Points updated successfully");
            document.getElementById("emailId").value = "";
            document.getElementById("points").value = "";
        });
    };

    init();
});
    </script>
</body>

</html>
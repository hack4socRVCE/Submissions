<?php
error_reporting(0);
ini_set('display_errors', 0);
session_start();
include('server.php'); 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team CipherHex</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #ffe53b;
            background-image: linear-gradient(147deg, #eedecf 0%, #009e6d 74%);
            min-height: 100vh;
            font-family: 'Open Sans', sans-serif;
            display: flex;
            flex-direction: column;
        }

        nav {
            background-color: #333;
            color: #fff;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            width: 100%;
            z-index: 1000;
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

        .content {
            margin-top: 160px;
            text-align: center;
        }

        .blog-slider {
            width: 95%;
            position: relative;
            max-width: 800px;
            margin: auto;
            background: #fff;
            box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
            padding: 25px;
            border-radius: 25px;
            height: 400px;
            display: flex; /* Added */
            align-items: center; /* Added */
            justify-content: center; /* Added */
            transition: all 0.3s;
        }

        .blog-slider__wrp {
            display: flex;
        }

        .blog-slider__item {
            width: 100%;
        }

        .blog-slider__img {
            width: 50%;
            height: 100%;
            overflow: hidden;
        }

        .blog-slider__content {
            width: 50%;
            padding-right: 25px;
            display: flex; /* Added */
            align-items: center; /* Added */
            justify-content: center; /* Added */
        }

        @media screen and (max-width: 768px) {
            .blog-slider__wrp {
                flex-direction: column;
            }

            .blog-slider__item {
                width: 100%;
            }

            .blog-slider__content {
                width: 100%;
                padding: 0;
                margin-top: 20px;
            }
        }

        @media screen and (max-width: 576px) {
            .blog-slider {
                height: auto;
            }

            .blog-slider__img {
                width: 100%;
                height: 200px;
            }
        }

        .blog-slider__content > * {
            opacity: 0;
            transform: translateY(25px);
            transition: all 0.4s;
        }

        .blog-slider__code {
            color: #7b7992;
            margin-bottom: 15px;
            display: block;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <nav>
        <script>
            <?php
              $userEmail = isset($_SESSION['EmailId']) ? $_SESSION['EmailId'] : '';
              $username = isset($_SESSION['username']) ? $_SESSION['username'] : '';
            ?>
            const userEmail = "<?php echo $userEmail; ?>";
            const username = "<?php echo $username; ?>";
        </script>
        <h3><script>document.write("Welcome,"+username)</script></h3>
        <a href="login.php" style="margin-right:50px;">logout </a>
    </nav>
    <div class="content">
        <div class="blog-slider">
            <?php
                $query = "SELECT activitypoints FROM credentials WHERE EmailId='$userEmail' LIMIT 1";
                $result = mysqli_query($db, $query);
                
                if ($result && mysqli_num_rows($result) > 0) {
                    $user = mysqli_fetch_assoc($result);
                    $activityPoints = $user['activitypoints'];
                    echo "<h2>Your Activity Points are: $activityPoints</h2>";
                } else {
                    echo "<h2>No Activity Points found for the user</h2>";
                }
            ?>
        </div>
    </div>
</body>
</html>

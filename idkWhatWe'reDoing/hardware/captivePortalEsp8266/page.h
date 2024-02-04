const char MAIN_page[] = R"=====(

<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<head>
  <title>LIFEBOUY</title>
</head>

<body>

  <div class="title">
    <h1>LIFEBOUY</h1>
  </div>
  <form action="/get">
    <div>
      <div class="help">
        <h2>HELP PRIORITY</h2>
        <input type="checkbox" id="medical" name="medical">
        <label for="medical"> Medical Emergency</label>
        <br>
        <input type="checkbox" id="food" name="food">
        <label for="food"> Food and Necessity</label>
        <br>
        <input type="checkbox" id="otherReq" name="other">
        <label for="otherReq"> Other Requirements</label>
        <br>
        <br>
      </div>
      <div class="info">
        <h2>More Information</h2>

        <label for="quantity">Number of people with you:</label>
        <input type="number" id="quantity" name="quantity" min="0" max="1000">

        <input type="checkbox" id="women" name="women">
        <label for="women"> Women</label>
        <br>
        <input type="checkbox" id="children" name="children">
        <label for="children"> Children</label>
        <br>
        <input type="checkbox" id="disabled" name="disabled">
        <label for="disabled"> Disabled</label>
        <br>
        <input type="checkbox" id="injured" name="injured">
        <label for="injured"> Injured</label>
        <br>
        <br>
        <div>
          <label for="chall">Any other challenges</label>
          <br>
          <input class="textbox" type="text" id="chall" name="chall">
          <br>
        </div>
      </div>
      <br>
      <input type="hidden" id="lat" name="lat" value="12.923311">
      <input type="hidden" id="lon" name="lon" value="77.497898">
      <input class="btn" type="submit" value="Submit">

  </form>
  <form action="/beep">  
      <div class="SOS">
        <h4> Stay Calm!! If any undesirable challenges, press the SOS button</h4>
          <input class="btn" type="submit" value="SOS">
      </div>
  </form>
</body>

<style>
  * {
    padding: 5px;
    margin: 5px;
  }

  body {
    background-color: #FFF5E4;
    font-family: 'Roboto', sans-serif;
  }


  .info {
    border: 5px solid;
    border-radius: 10px;
    border-color: #850000;
    margin-bottom: 10px;
  }

  .help {
    border-radius: 10px;
    border: 5px solid;
    border-color: #850000;
    margin-bottom: 10px;
  }

  .title {
    margin-top: -20px;
    margin-left: -20px;
    margin-right: -20px;
    text-align: center;
    color: whitesmoke;
    background-color: #850000;
    border-bottom: solid 4px rgb(48, 48, 48);
    font-size: xx-large;
  }

  .textbox {
    padding: 8px;
    border-radius: 4px;
    box-shadow: 1px 2px black;
  }

  .btn {
    box-shadow: 1px 2px black;
    padding: 20px 10px;
    border-radius: 12px;
    width: 100%;
    font-size: xx-large;
  }
</style>

</html>


)=====";
const jwt = require('jsonwebtoken');


const Logout = (req, res) => {
    //console.log('L');
    const cookies = req.headers.cookie;
    let prevToken;
    if(cookies) {prevToken = cookies.split("=")[1];}
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${user.id}`);
      //req.cookies[`${user.id}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    });
}

module.exports = Logout;

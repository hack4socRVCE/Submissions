import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { LoggedState } from "../context/auth";
import LoginImage from "./images/meditation1.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const motivationalQuotes = [
  "Recovery is not for people who need it, it's for people who want it.",
  "Your strength is greater than your struggle.",
  "Every accomplishment starts with the decision to try.",
  "Believe you can, and you're halfway there. - Theodore Roosevelt",
  "The first step towards getting somewhere is to decide that you are not going to stay where you are.",
  "You don't have to see the whole staircase, just take the first step. - Martin Luther King Jr.",
  "The road to recovery may be tough, but it's worth it. You're worth it.",
  "Your past does not define your future. You have the power to change your story.",
  "Strength grows in the moments when you think you can't go on but you keep going anyway.",
  "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Reconnect
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const { CurrentUser, setisLoggedIn, setUser } = LoggedState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(CurrentUser);

  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Generate a random quote when the component mounts
    const randomQuote = getRandomQuote();
    setQuote(randomQuote);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please Fill all the Feilds", {
        duration: 3000,
      });
      return;
    }

    try {
      const { data } = await axios.post("/api/login", {
        username,
        password,
      });

      if (data.User) toast.success("Logged in SuccessFully");
      else {
        toast.error("User Not Found");
        return;
      }

      console.log(data.User);
      setUser(data.User);
      localStorage.setItem("user", JSON.stringify(data.User));
      setisLoggedIn(true);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      toast.error("Error Occured . Check UserName and PassWord ");
    }
  };
  return (
    <Layout title={"Login Page"}>
      <Box
        className="loginPage"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#1c1c2c",
          color: "#f0f0f0",
          display: "flex",
        }}
      >
        <Box
          className="loginPageLeft"
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              margin: "50px 20px 0 20px",
              width: "90%",
              fontFamily: "Arial, sans-serif",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#cccccc",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              lineHeight: "1.6",
              letterSpacing: "0.5px",
            }}
          >
            {quote}
          </Typography>
          <img
            src={LoginImage}
            style={{ width: "75%", margin: "0 auto", marginBottom: "20px" }}
          />
        </Box>
        <Box
          className="loginPageRight"
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            className="loginFormContainer"
            sx={{
              width: "80%",
              maxWidth: "500px",
              padding: "20px",
              backgroundColor: "rgba(16,47,84, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px #102f54",
              margin: "20px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#cccccc",
              }}
            >
              Login
            </Typography>
            <form
              className="loginForm"
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                className="form-group"
                style={{ width: "95%", marginBottom: "20px" }}
              >
                <label
                  htmlFor="email"
                  style={{
                    color: "#d9d9d9",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  Email Address
                </label>
                <TextField
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Username or Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  fullWidth
                  InputProps={{
                    style: {
                      marginTop: "5px",
                      backgroundColor: "rgba(13,52,100, 0.3)",
                      borderRadius: "5px",
                      color: "#d9d9d9",
                      border: " .5px solid #102f54",
                    },
                    inputProps: {
                      style: {
                        color: "#d9d9d9",
                      },
                    },
                    placeholder: "abc@gmail.com",
                  }}
                />
              </div>
              <div
                className="form-group"
                style={{ width: "95%", marginBottom: "20px" }}
              >
                <label
                  htmlFor="password"
                  style={{
                    color: "#d9d9d9",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  Password
                </label>
                <TextField
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  InputProps={{
                    style: {
                      marginTop: "5px",
                      backgroundColor: "rgba(13,52,100, 0.3)",
                      borderRadius: "5px",
                      color: "#d9d9d9",
                      border: " .5px solid #102f54",
                    },
                    inputProps: {
                      style: {
                        color: "#d9d9d9",
                      },
                    },
                    placeholder: "#*****Z",
                  }}
                />
              </div>
              <Button
                type="submit"
                className="btn"
                sx={{
                  opacity: 0.8,
                  width: "90%",
                  height: "40px",
                  padding: "10px",
                  backgroundColor: "#3f51b5",
                  color: "#ffffff",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  ":hover": {
                    transform: "translateY(-3px)",
                    transition: ".3s ease-in-out",
                    boxShadow:
                      "0 10px 10px rgba(0, 0,0,.09), 0 -10px 10px rgba(0, 0, 0, .08)",
                    backgroundColor: "#3f51b5",
                  },
                }}
              >
                Log In
              </Button>
              <Grid
                container
                sx={{
                  display: "block",
                  width: "50%",
                  margin: "0 auto",
                  marginTop: "20px",
                }}
              >
                <Grid item>
                  <Link
                    href="/register"
                    variant="body2"
                    className="link"
                    sx={{
                      color: "#3f51b5",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {"Don't have an account ? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;

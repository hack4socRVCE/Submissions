import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import font from url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap')

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      style={{ color: "#D7EDDB" }}
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/" sx={{
        textDecoration: "none",
        "&:hover":{textDecoration:"underline",cursor:"pointer"}
    }}>
        Reconnect
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Register = () => {
  const [isCounselor, setIsCounselor] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get("email") || !data.get("password") || !data.get("username")) {
      toast.error("Please Fill all the Feilds");
      return;
    }

    const register_ojt = {
      username: data.get("username"),
      phonenumber: JSON.parse(data.get("phonenumber")),
      email: data.get("email"),
      age: JSON.parse(data.get("age")),
      addictType: data.get("addictType"),
      gender: data.get("gender"),
      isCounselor,
      ...(isCounselor && {
        CounselorLicenseNumber: JSON.parse(data.get("counselorLicenseNumber")),
        Specialization: data.get("specialization"),
        Experience: JSON.parse(data.get("experience")),
        WorkingIn: data.get("workingIn"),
        Portfolio: data.get("portfolio"),
      }),
      PerDay: Number(data.get("perDay")),
      years: Number(data.get("years")),
      triedToGiveUp: Number(data.get("triedToGiveUp")),
      reason: data.get("reason"),
      password: data.get("password"),
    };

        console.log(register_ojt);


        try {
            const { data } = await axios.post("/api/register", register_ojt);
            console.log(data);
            if (data) {
                toast.success("Registered SuccessFully ..!")
            }
            setTimeout(() => {
                navigate("/login");
            }, 500);
        } catch (error) {
            toast.error("Registered Failed ...😂");
        }

    };

  return (
    <Box
      className="registerPage"
      sx={{
        backgroundColor: "#1c1c2c",
        color: "#f0f0f0",
        paddingTop: "0.5%",
        paddingBottom: "0.5%",
      }}
    >
      <Layout title={"Register Page"}>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 4,
                // boxShadow: "0px 0px 10px #102f54",
                // backgroundColor: "rgba(16,47,84, 0.1)",
                // backdropFilter: "blur(10px)",
                // borderRadius: "10px",
                display: "flex",
                // backgroundColor: "#1c1c2c",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>

              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  marginBottom: "20px",
                  color: "#cccccc",
                }}
              >
                Register
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={10} width={"70vw"}>
                  <Grid item xs={12} sm={6}>
                    <div
                      className="form-group"
                      style={{ width: "95%", marginBottom: "20px" }}
                    >
                      <label
                        htmlFor="username"
                        style={{
                          color: "#d9d9d9",
                          fontSize: "20px",
                          fontFamily: '-moz-initial',
                          fontWeight: "bold",
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        User Name
                      </label>

                      <TextField
                        id="username"
                        type="text"
                        name="username"
                        placeholder="user Name"
                        required
                        fullWidth
                        autoFocus
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
                          placeholder: "abc",
                        }}
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ width: "95%", marginBottom: "20px" }}
                    >
                      <label
                        htmlFor="phoneNumber"
                        style={{
                          color: "#d9d9d9",
                          fontSize: "20px",
                          fontWeight: "bold",
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        Phone Number
                      </label>
                      <TextField
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
                          placeholder: "+91",
                        }}
                        required
                        fullWidth
                        id="phonenumber"
                        name="phonenumber"
                      />
                    </div>

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
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        Email Address
                      </label>

                      <TextField
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
                        required
                        fullWidth
                        id="email"
                        type="email"
                        name="email"
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ width: "95%", marginBottom: "20px" }}
                    >
                      <label
                        htmlFor="age"
                        style={{
                          color: "#d9d9d9",
                          fontSize: "20px",
                          fontWeight: "bold",
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        Age
                      </label>

                      <TextField
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
                          placeholder: "23",
                        }}
                        fullWidth
                        id="age"
                        name="age"
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ width: "95%", marginBottom: "20px" }}
                    >
                      <label
                        htmlFor="age"
                        style={{
                          color: "#d9d9d9",
                          fontSize: "20px",
                          fontWeight: "bold",
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        Gender
                      </label>

                      <TextField
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
                          placeholder: "male",
                        }}
                        fullWidth
                        id="gender"
                        name="gender"
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
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        Password
                      </label>

                      <TextField
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
                        required
                        fullWidth
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        // style={{marginLeft:'100px'}}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <div
                      className="form-group"
                      style={{ width: "95%", marginBottom: "20px" }}
                    >
                      <label
                        htmlFor="AddictType"
                        style={{
                          color: "#d9d9d9",
                          fontSize: "20px",
                          fontWeight: "bold",
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        Addict Type
                      </label>

                      <TextField
                        select
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
                          // placeholder: "abc@gmail.com",
                        }}
                        fullWidth
                        id="addictType"
                        name="addictType"
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="Alcohol">Alcohol</option>
                        <option value="Cigarettes">Cigarettes</option>
                        <option value="Mobile">Mobile</option>
                      </TextField>
                    </div>

                    <div
                      className="form-group"
                      style={{ width: "95%", marginBottom: "20px" }}
                    >
                      <label
                        htmlFor="perDay"
                        style={{
                          color: "#d9d9d9",
                          fontSize: "20px",
                          fontWeight: "bold",
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        Consumption Per Day
                      </label>

                      <TextField
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
                          placeholder: "7",
                        }}
                        fullWidth
                        id="perDay"
                        name="perDay"
                        type="number"
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ width: "95%", marginBottom: "20px" }}
                    >
                      <label
                        htmlFor="years"
                        style={{
                          color: "#d9d9d9",
                          fontSize: "20px",
                          fontWeight: "bold",
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        Years of addiction
                      </label>

                      <TextField
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
                          placeholder: "2",
                        }}
                        fullWidth
                        id="years"
                        name="years"
                        type="number"
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ width: "95%", marginBottom: "20px" }}
                    >
                      <label
                        htmlFor="triedToGiveUp"
                        style={{
                          color: "#d9d9d9",
                          fontSize: "20px",
                          fontWeight: "bold",
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        Number of Times Tried to Give Up
                      </label>

                      <TextField
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
                          placeholder: "5",
                        }}
                        fullWidth
                        id="triedToGiveUp"
                        name="triedToGiveUp"
                        type="number"
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ width: "95%", marginBottom: "20px" }}
                    >
                      <label
                        htmlFor="reason"
                        style={{
                          color: "#d9d9d9",
                          fontSize: "20px",
                          fontWeight: "bold",
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        Reason for Addiction
                      </label>

                      <TextField
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
                          placeholder: "stress, anxity",
                        }}
                        fullWidth
                        id="reason"
                        name="reason"
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ width: "95%", marginBottom: "20px" }}
                    >
                      <label
                        htmlFor="avgMoney"
                        style={{
                          color: "#d9d9d9",
                          fontSize: "20px",
                          fontWeight: "bold",
                          fontFamily: '-moz-initial',
                          marginBottom: "5px",
                        }}
                      >
                        Average Money Spent per Week on Addiction
                      </label>

                      <TextField
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
                          placeholder: "500",
                        }}
                        fullWidth
                        id="avgMoney"
                        name="avgMoney"
                        type="number"
                      />
                    </div>
                  </Grid>

                  <Box paddingLeft={"8%"}>
                    <Box display={"flex"} paddingBottom={"30px"}>
                      <FormControlLabel
                        control={
                          <>
                            <Checkbox
                              checked={isCounselor}
                              onChange={(e) => setIsCounselor(e.target.checked)}
                              label="I am a Counselor"
                            />
                            <Typography fontSize={"20px"}>
                              I am a counselor
                            </Typography>
                          </>
                        }
                      />
                    </Box>
                    {isCounselor && (
                      <>
                        <div
                          className="form-group"
                          style={{ width: "95%", marginBottom: "20px" }}
                        >
                          <label
                            htmlFor="counselorLicenseNumber"
                            style={{
                              color: "#d9d9d9",
                              fontSize: "20px",
                              fontWeight: "bold",
                              fontFamily: '-moz-initial',
                              marginBottom: "5px",
                            }}
                          >
                            counselor License Number
                          </label>

                          <TextField
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
                              placeholder: "XX-00000-XX",
                            }}
                            fullWidth
                            id="counselorLicenseNumber"
                            name="counselorLicenseNumber"
                          />
                        </div>

                        <div
                          className="form-group"
                          style={{ width: "95%", marginBottom: "20px" }}
                        >
                          <label
                            htmlFor="specialization"
                            style={{
                              color: "#d9d9d9",
                              fontSize: "20px",
                              fontWeight: "bold",
                              fontFamily: '-moz-initial',
                              marginBottom: "5px",
                            }}
                          >
                            specialization
                          </label>

                          <TextField
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
                              placeholder: "psychology",
                            }}
                            fullWidth
                            id="specialization"
                            name="specialization"
                          />
                        </div>

                        <div
                          className="form-group"
                          style={{ width: "95%", marginBottom: "20px" }}
                        >
                          <label
                            htmlFor="experience"
                            style={{
                              color: "#d9d9d9",
                              fontSize: "20px",
                              fontWeight: "bold",
                              fontFamily: '-moz-initial',
                              marginBottom: "5px",
                            }}
                          >
                            experience (years)
                          </label>

                          <TextField
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
                              placeholder: "4 Years",
                            }}
                            fullWidth
                            id="experience"
                            name="experience"
                            type="number"
                          />
                        </div>

                        <div
                          className="form-group"
                          style={{ width: "95%", marginBottom: "20px" }}
                        >
                          <label
                            htmlFor="workingIn"
                            style={{
                              color: "#d9d9d9",
                              fontSize: "20px",
                              fontWeight: "bold",
                              fontFamily: '-moz-initial',
                              marginBottom: "5px",
                            }}
                          >
                            Working in (Hospital, Clinic etc.)
                          </label>
                          <TextField
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
                              placeholder: "Hospital, Clinic, etc.",
                            }}
                            fullWidth
                            id="workingIn"
                            name="workingIn"
                          />
                        </div>

                        <div
                          className="form-group"
                          style={{ width: "95%", marginBottom: "20px" }}
                        >
                          <label
                            htmlFor="portfolio"
                            style={{
                              color: "#d9d9d9",
                              fontSize: "20px",
                              fontWeight: "bold",
                              fontFamily: '-moz-initial',
                              marginBottom: "5px",
                            }}
                          >
                            Portfolio Link
                          </label>
                          <TextField
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
                              placeholder: "link",
                            }}
                            fullWidth
                            id="portfolio"
                            name="portfolio"
                          />
                        </div>
                      </>
                    )}
                  </Box>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    opacity: 0.8,
                    width: "95%",
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
                  Register
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/login" variant="body2" sx={{
                      color: "#3f51b5",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}>
                      {"Already Have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </Layout>
    </Box>
  );
};

export default Register;

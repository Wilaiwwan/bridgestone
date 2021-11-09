import React, { useState } from "react";
import "./login.css";
import { makeStyles } from "@mui/styles";
import {
  Paper,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import api from "../Component/api/api";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    minWidth: "100%",
    position: "fixed",
  },
  paper: {
    flexWrap: "wrap",
    "& > *": {
      width: 550,
      height: 450,
      borderRadius: 10,
      backgroundColor: "white",
    },
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  customBorderRadius: {
    borderRadius: 25,
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Err, setErr] = useState(false);

  const login = async () => {
    try {
      const result = await api.post("api/users/login", {
        username,
        password,
      });
      if (result.data.message !== "Success.") {
        setErr(true);
      }
      localStorage.setItem("token", result.data.results.accessToken);
      localStorage.setItem("EmpId", result.data.results.empId);

      handleRoute();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoute = () => {
    history.push("/AllSubject");
  };
  const handleChengeUserName = (e) => {
    setUsername(e.target.value);
    setErr(false);
  };
  const handleChengePass = (e) => {
    setPassword(e.target.value);
    setErr(false);
  };

  return (
    <div className="container">
      <div className={classes.root}>
        <div className={classes.paper}>
          <div className={classes.center}>
            <div>
              <img src="/images/Bridgestone.png" alt="" className="logo" />
              {Err ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error">
                    Username or Password is incorrect.
                  </Alert>
                </Stack>
              ) : null}
              <Paper
                elevation={2}
                style={{ minWidth: 300, minHeight: 37, marginTop: 25 }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    class="material-icons-outlined"
                    style={{ color: "gray", margin: 10 }}
                  >
                    email
                  </span>
                  <TextField
                    id="outlined-basic"
                    placeholder="Username or email"
                    // label="Username or email"
                    variant="standard"
                    size="medium"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    style={{
                      flexGrow: 1,
                    }}
                    onChange={handleChengeUserName}
                  />
                </div>
              </Paper>
              <Paper
                elevation={2}
                style={{ minWidth: 300, minHeight: 37, marginTop: 30 }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    class="material-icons-outlined"
                    style={{ color: "gray", margin: 10 }}
                  >
                    lock
                  </span>
                  <TextField
                    type="password"
                    variant="standard"
                    id="outlined-basic"
                    placeholder="Password"
                    // label="Password"
                    // variant="outlined"
                    size="medium"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    style={{
                      flexGrow: 1,
                    }}
                    onChange={handleChengePass}
                  />
                </div>
              </Paper>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 30,
                  marginBottom: 40,
                }}
              >
                <FormControlLabel control={<Checkbox />} label="Remember Me" />
                {/* <span style={{ alignSelf: "center" }}>Forgot Password ?</span> */}
              </div>

              <div className={classes.center}>
                <Button
                  variant="contained"
                  type="submit"
                  disableRipple
                  style={{
                    backgroundColor: "#FF0000",
                    color: "white",
                    // textTransform: "lowercase",
                  }}
                  onClick={login}
                >
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

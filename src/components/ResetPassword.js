import React, { useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../contexts/AuthContext";
import "../CSS Components/ResetPassword.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Memesfr
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: "48px",
  },
  orparent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  or: {
    display: "flex",
    justifySelf: "center",
    alignSelf: "center",
    textAlign: "center",
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState();

  const emailRef = useRef();

  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    setError(false);
    setSuccess(false);
    setErrorMessage("");
    e.preventDefault();
    var email = emailRef.current.value;
    resetPassword(email)
      .then(() => {
        setSuccess(true);
        console.log("Successfully sent your email");
      })
      .catch((error) => {
        setError(true);
        if (error.code === "auth/user-not-found") {
          setErrorMessage("This email doesn't have an active account");
        }
      });
  }

  const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const checkEmailError = (e) => {
    setError(false);
    setErrorMessage("");
    setEmail(e.target.value);
    if (e.target.value.match(emailRegEx)) {
      setEmailErrorMessage("");
      setEmailError(false);
    } else {
      setEmailErrorMessage("Invalid");
      setEmailError(true);
    }
  };

  const Success = () => {
    return (
      <>
        <div className="password-reset-container">
          <span className="password-reset-success-prompt">
            Password Successfully Reset
          </span>
          <span className="password-reset-prompt">Check your email</span>
          <Grid container justify="center">
            <Grid item>
              <Link href="#" variant="body2">
                Return to Memesfr
              </Link>
            </Grid>
          </Grid>
        </div>
      </>
    );
  };
  //When a user submits an email we need to check two things:
  // 1. Is that email already in use?
  // 2. If not, they need to confirm it's theirs by confirming via email

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {success ? (
          <Success />
        ) : (
          <>
            <Typography component="h1" style={{ padding: "1rem" }} variant="h5">
              Password Reset
            </Typography>
            <Typography
              component="h2"
              style={{ paddingTop: "1rem" }}
              variant="h5"
            >
              Enter your email below
            </Typography>

            {alert && (
              <span style={{ paddingTop: "1rem", color: "red" }}>
                {errorMessage}
              </span>
            )}
            <>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className={classes.form}
                noValidate
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      inputRef={emailRef}
                      variant="outlined"
                      required
                      fullWidth
                      value={email}
                      onChange={(e) => checkEmailError(e)}
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      helperText={emailErrorMessage}
                      error={emailError || error}
                    />
                  </Grid>
                </Grid>
                <Button
                  disabled={loading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Reset Password
                </Button>

                <div className={classes.social}></div>

                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </>
          </>
        )}
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

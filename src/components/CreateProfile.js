import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../CSS Components/CreateProfile.css";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useAuth } from "../contexts/AuthContext";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  username: {
    margin: 0,
    width: "100%",
  },
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="memesfr.com/">
        Memesfr
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function CreateProfile(props) {
  console.log(props);
  const classes = useStyles();
  const [taken, setTaken] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [availableMessage, setAvailableMessage] = useState("");
  const [error, setError] = useState(false);

  const [name, setName] = useState("");

  function handleChange(event) {
    console.log(event.target.value.length);
    setName(event.target.value);
    if (event.target.value.length < 5) {
      setAvailableMessage("");
      setError(true);
      setDisabled(true);
    } else if (name.length < 16) {
      checkUsernameAvailability(event.target.value).then((result) => {
        console.log(result);
        if (result == false) {
          console.log(
            "Username not available from correct functional component"
          );
          setAvailableMessage("Username taken");
          setDisabled(true);
          setError(true);
        } else {
          setAvailableMessage("Username Available");
          setError(false);
          console.log(
            "Username is available from correct functional component"
          );
          setDisabled(false);
        }
      });
    }
    //We cannot call this if the event.target.value is empty
  }
  const [viewPhoto, viewPhotoFunction] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [file, setFile] = useState("");
  const inputFile = useRef(null);
  const history = useHistory();
  const location = useLocation();
  console.log(location, location.state.update);

  const { checkUsernameAvailability, updateProfile, currentUser } = useAuth();

  function saveProfile() {
    console.log(name);
    updateProfile(name, file);
  }

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    console.log("Line 36");
  };
  const ImageThumb = ({ image }) => {
    console.log("Line 39");
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
  };

  function usernameTaken(test) {
    console.log(test);
    return test ? true : false;
  }
  if (location.state.verifiedUser) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <div className="create-profile">
              <h2>Your Profile!</h2>
              <div className="username">
                <span className="username-prompt">Choose a username below</span>

                <form className={classes.root} autoComplete="off">
                  <div>
                    <TextField
                      className={classes.username}
                      onChange={(e) => handleChange(e)}
                      required
                      error={error}
                      id="filled-error-helper-text"
                      label="username"
                      defaultValue=""
                      helperText={availableMessage}
                      variant="filled"
                    />
                  </div>
                </form>
              </div>
              <span>Upload an avatar?</span>
              <div className="create-avatar" onClick={onButtonClick}>
                <button className="upload-button">
                  Upload Here
                  <input
                    onChange={handleUpload}
                    id="file"
                    ref={inputFile}
                    type="file"
                    style={{ display: "none" }}
                  />
                </button>
                {file ? (
                  <div className="profile-image-preview">
                    <ImageThumb image={file} />
                  </div>
                ) : null}
              </div>
              <div className="submit-profile">
                <Button
                  disabled={disabled}
                  onClick={saveProfile}
                  variant="contained"
                  color="primary"
                >
                  Save Profile
                </Button>
              </div>
            </div>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </CssBaseline>
      </Container>
    );
  } else {
    history.push("/");
    return null;
  }
}

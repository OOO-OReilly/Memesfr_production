import React, { useState, useRef } from "react";

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
import { useHistory } from "react-router";

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
      <Link color="inherit" href="localhost:3000/">
        Memesfr
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function SelectUsername() {
  const classes = useStyles();
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);

  const [viewPhoto, viewPhotoFunction] = useState(false);
  const [file, setFile] = useState("");
  const inputFile = useRef(null);

  const { setProfilePicture, currentUser } = useAuth();

  function saveProfile() {
    if (file) {
      setProfilePicture(file);
    }
    history.push("/");
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Your profile
          </Typography>

          <div className="create-profile">
            <h2>{currentUser.displayName}</h2>

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
              <Button onClick={saveProfile} variant="contained" color="primary">
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
}

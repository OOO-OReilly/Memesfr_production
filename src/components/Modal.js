import React, { useState, useRef } from "react";
import ReactDom from "react-dom";
import x from "../Assets/SVGs/x.svg";
import Image from "../Assets/Icons/Image.svg";
import Video from "../Assets/Icons/Video.svg";
import Gif from "../Assets/Icons/Gif.svg";
import Upload from "../Assets/Icons/CloudUpload.svg";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  input: {
    marginBottom: ".5rem",
  },
}));
const accept = "images";
export default function Modal(props) {
  const classes = useStyles();
  const [name, setName] = useState("Use The Memes, Luke");
  const [viewPhoto, viewPhotoFunction] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [titleError, setTitleError] = useState(true);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [file, setFile] = useState("");
  const [fileType, setFileType] = useState("");
  const inputFile = useRef(null);
  const [uploaded, setUploaded] = useState(false);
  const [fileError, setFileError] = useState(false);

  const titleRef = useRef();

  const { uploadMeme } = useAuth();

  const uploadPost = (e) => {
    e.preventDefault();
    console.log(file);
    var image = file;
    var JSONfileType = JSON.stringify(fileType);
    var title = titleRef.current.value;
    uploadMeme(image, title, JSONfileType);
    setUploaded(true);
    props.createPostFunction(false);
  };

  const titleRegex = /(?=.*[!@#$%^&*])/;
  const checkTitleError = (e) => {
    setTitleError(false);

    if (e.target.value.match(titleRegex)) {
      setTitleError(true);
      setTitleErrorMessage("Can't have special characters'");
    }
    if (e.target.value == "") {
      setTitleError(true);
      setTitleErrorMessage("Cannot be empty");
    } else {
      setTitleErrorMessage("");
      setTitleError(false);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
    if (name !== "") {
      setDisabled(false);
    } else setDisabled(true);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const ImageThumb = ({ image }) => {
    setFileError("");
    const filesFormats = [
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/png",
      "video/mp4",
    ];
    const validFormat = filesFormats.includes(image.type);
    if (image.type == "video/mp4") {
      setFileType("video");
      return (
        <video
          className="video-file"
          src={URL.createObjectURL(image)}
          alt={image.name}
          autoPlay={true}
        ></video>
      );
    }

    if (validFormat) {
      setFileType("image");

      return <img src={URL.createObjectURL(image)} alt={image.name} />;
    } else {
      setFile("");
      var fileType = JSON.stringify(image.type);
      var fileEnding = fileType.slice(7, fileType.length - 1);
      setFileError(`😢 unsupported file type .${fileEnding}`);
      return null;
    }
  };

  console.log(props);
  return ReactDom.createPortal(
    <div className="expanded-file">
      {uploaded ? (
        <Loading />
      ) : (
        <>
          <div className="upper-section">
            <span>Upload Meme</span>
            <img onClick={props.openFilePrompt} src={x} />
          </div>
          <div className="upper-middle">
            <div className="group">
              <img src={Image}></img>
              <div className="details">
                <span className="title">Photos</span>
                <span className="description">PNG, JPG, GIF </span>
              </div>
            </div>
            <div className="group">
              <img src={Gif}></img>
              <div className="details">
                <span className="title">Gifs</span>
                <span className="description">800x600 or 400x300 </span>
              </div>
            </div>
            <div className="group">
              <img src={Video}></img>
              <div className="details">
                <span className="title">Videos</span>
                <span className="description">800x600 or 400x300 </span>
              </div>
            </div>
          </div>
        </>
      )}
      {file ? (
        <>
          <form className="main-section-form" onSubmit={uploadPost}>
            <div className="main-section">
              <div className="image-preview">
                {file && <ImageThumb image={file} />}
                <input
                  accept=".png, .jpeg, .jpg, .gif, .mp4, .avi"
                  type="image"
                  style={{ display: "none" }}
                  image={file}
                />
              </div>
              <div
                style={{
                  flex: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  width: "100%",
                  flexGrow: 0,
                }}
              >
                <TextField
                  inputRef={titleRef}
                  onChange={(e) => checkTitleError(e)}
                  required
                  className={classes.input}
                  id="outlined-name"
                  label="Title"
                  variant="outlined"
                  helperText={titleErrorMessage}
                  error={titleError}
                />
              </div>
            </div>
            <div className="lower-section">
              <span>
                By clicking upload you agree to abide by our Community Policy.
              </span>
              <button
                type="submit"
                disabled={titleError}
                onClick={onButtonClick}
              >
                <input
                  type="submit"
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                />
                Upload
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            draggable="true"
            className="main-section"
          >
            <>
              <img src={Upload}></img>
              <span>Drag Drop to upload or browse</span>
              {fileError ? (
                <span style={{ padding: "1rem", color: "red" }}>
                  {fileError}
                </span>
              ) : null}
            </>
          </div>

          <div className="lower-section">
            <>
              <button onClick={onButtonClick}>
                <input
                  onChange={handleUpload}
                  type="file"
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                />
                Browse
              </button>
            </>
          </div>
        </>
      )}
    </div>,
    document.getElementById("portal")
  );
}

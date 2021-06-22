import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();
  const [displayLogo, setDisplayLogo] = useState(true);

  useEffect(() => {
    let mount = true;
    {
      setTimeout(() => {
        if (mount === true) setDisplayLogo(false);
      }, 1000);
    }
    return () => (mount = false);
  }, []);

  return (
    <div className={classes.root}>
      {displayLogo ? <span>MemesFR</span> : <CircularProgress />}
    </div>
  );
}

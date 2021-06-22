import { React, useState } from "react";
import { ReactComponent as Settings } from "../Assets/SVGs/settings.svg";
import { ReactComponent as Left } from "../Assets/SVGs/arrowLeft.svg";
import "../CSS Components/DropDownMenu.css";
import { ReactComponent as AddFriend } from "../Assets/SVGs/userPlus.svg";
import { ReactComponent as Friends } from "../Assets/SVGs/users.svg";
import { ReactComponent as Doge } from "../Assets/doge.svg";
import { ReactComponent as Help } from "../Assets/SVGs/help.svg";
import { ReactComponent as Ball } from "../Assets/SVGs/pokeBall.svg";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useHistory } from "react-router";

export default function DropDownMenu() {
  const [open, openSettings] = useState(false);
  const [openFriends, manageFriends] = useState(false);
  const [openFile, expandFileSubmit] = useState(false);
  const { currentUser, signOut, UpdateProfilePicture } = useAuth();
  const { updateDoge, doge } = useTheme();

  const discLink = "https://discord.gg/234DDJUQpD";

  function activateDoge() {
    updateDoge();
  }

  function DropDownItem(props) {
    return (
      <a href="#" style={props.style} className="menu-item">
        <span style={props.style} className="icon-button">
          {props.IconText}
          {props.Icon}{" "}
        </span>
        {props.children}
      </a>
    );
  }

  const ExpandFriends = () => {
    return (
      <div style={{ whiteSpace: "nowrap" }}>
        <DropDownItem Icon={<AddFriend />} IconText="Add Friend" />

        <DropDownItem IconText="Friend List" />
        <DropDownItem IconText="Remove Friends" />
        <div onClick={() => manageFriends(!openFriends)}>
          <DropDownItem style={{ paddingLeft: "7px" }} Icon={<Left />} />
        </div>
      </div>
    );
  };

  function SecondaryOptions() {
    const RedirectToDisc = (props) => {
      return (
        <a
          className="discord-link menu-item"
          href={discLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span style={props.style} className="icon-button">
            {props.IconText}
            {props.Icon}{" "}
          </span>

          {props.children}
        </a>
      );
    };
    return (
      <div style={{ whiteSpace: "nowrap" }}>
        <div onClick={activateDoge}>
          <DropDownItem
            Icon={<Doge />}
            IconText={doge ? "Deactivate Doge" : "Activate Doge"}
          />
        </div>
        <RedirectToDisc IconText="Join our Discord server"></RedirectToDisc>

        <DropDownItem IconText="Catch em all" Icon={<Ball />} />
        <div onClick={() => openSettings(!open)}>
          <DropDownItem style={{ paddingLeft: "7px" }} Icon={<Left />} />
        </div>
      </div>
    );
  }

  function UserSecondaryOptions() {
    const history = useHistory();
    return (
      <div style={{ whiteSpace: "nowrap" }}>
        <div onClick={activateDoge}>
          <DropDownItem
            Icon={<Doge />}
            IconText={doge ? "Deactivate Doge" : "Activate Doge"}
          />
        </div>

        <div onClick={() => history.push("/edit")}>
          <DropDownItem IconText="Change Profile Picture" />
        </div>
        <DropDownItem IconText="Change Password" />
        <div onClick={() => openSettings(!open)}>
          <DropDownItem style={{ paddingLeft: "7px" }} Icon={<Left />} />
        </div>
      </div>
    );
  }
  function PrimaryOptions() {
    const history = useHistory();
    return (
      <>
        <div onClick={() => history.push("/help")}>
          <DropDownItem
            Icon={<Help style={{ stroke: "white" }} />}
            IconText="Help"
          />
        </div>
        <div onClick={() => openSettings(!open)}>
          <DropDownItem IconText="Settings" Icon={<Settings />}></DropDownItem>
        </div>
        <div onClick={() => history.push("/login")}>
          <DropDownItem IconText="Log In / Sign Up" />
        </div>
      </>
    );
  }
  function UserPrimaryOptions() {
    return (
      <>
        <div onClick={signOut}>
          <DropDownItem IconText="Sign Out" />
        </div>
        <div onClick={() => manageFriends(!openFriends)}>
          <DropDownItem Icon={<Friends />} IconText="Friends (disabled 😔)" />
        </div>
        <div onClick={() => openSettings(!open)}>
          <DropDownItem IconText="Settings" Icon={<Settings />}></DropDownItem>
        </div>
      </>
    );
  }
  if (currentUser == null) {
    return (
      <div className="dropdown">
        <div className="menu">
          {openFile ? (
            <UpdateProfilePicture />
          ) : null || open ? (
            <SecondaryOptions />
          ) : openFriends ? (
            <ExpandFriends />
          ) : (
            <PrimaryOptions />
          )}
        </div>
      </div>
    );
  } else if (currentUser)
    return (
      <div className="dropdown">
        <div className="menu">
          {openFile ? (
            <UpdateProfilePicture />
          ) : null || open ? (
            <UserSecondaryOptions />
          ) : openFriends ? (
            <ExpandFriends />
          ) : (
            <UserPrimaryOptions />
          )}
        </div>
      </div>
    );
}

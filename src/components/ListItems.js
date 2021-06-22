import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from "@material-ui/icons/Home";
import TrendingIcon from "@material-ui/icons/TrendingUp";
import PeopleIcon from "@material-ui/icons/Whatshot";
import RecentIcon from "@material-ui/icons/AccessTime";
import LayersIcon from "@material-ui/icons/Casino";
import { useAuth } from "../contexts/AuthContext";

import AssignmentIcon from "@material-ui/icons/Assignment";

export default function MainListItems(props) {
  console.log(props);

  return (
    <div>
      <ListItem onClick={props.homeFilter} button>
        <ListItemIcon>
          <HomeIcon style={props.active == 0 ? { color: "red" } : null} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem onClick={props.trendingFilter} button>
        <ListItemIcon>
          <TrendingIcon style={props.active == 1 ? { color: "red" } : null} />
        </ListItemIcon>
        <ListItemText primary="Trending" />
      </ListItem>
      <ListItem onClick={props.popularFilter} button>
        <ListItemIcon>
          <PeopleIcon style={props.active == 2 ? { color: "red" } : null} />
        </ListItemIcon>
        <ListItemText primary="Popular" />
      </ListItem>
      <ListItem onClick={props.recentFilter} button>
        <ListItemIcon>
          <RecentIcon style={props.active == 3 ? { color: "red" } : null} />
        </ListItemIcon>
        <ListItemText primary="Recent" />
      </ListItem>
      <ListItem onClick={props.randomFilter} button>
        <ListItemIcon>
          <LayersIcon style={props.active == 4 ? { color: "red" } : null} />
        </ListItemIcon>
        <ListItemText primary="Random meme" />
      </ListItem>
    </div>
  );
}

export function SecondaryListItems() {
  const { currentUser } = useAuth();
  var username = currentUser.displayName;

  return (
    <div>
      <ListSubheader inset>{username}'s lists</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItem>
    </div>
  );
}

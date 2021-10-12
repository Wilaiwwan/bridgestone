import React from "react";
import Sidebar from "../Sidebar/index";
import Header from "../Component/Header";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  container: {
    width: "100%",
    // padding: theme.spacing(3),
  },
  contentContainer: {
    width: "100%",
    overflow: "auto",
  },
  content: {
    flexGrow: 1,

    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    marginLeft: 0,
  },
}));

export default function AuthLayout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useMediaQuery({ query: `(max-width: 768px)` }, undefined, (matches) => {
    matches ? handleDrawerClose() : handleDrawerOpen();
  });

  return (
    <div className={classes.root}>
      <Sidebar open={open} onDrawerClose={handleDrawerClose} />

      <div
        id="page-content-wrapper"
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Header open={open} onDrawerToggle={handleDrawerToggle} />
        <Container className={classes.container} maxWidth={false}>
          <div className={classes.contentContainer}>
            {props.children} {/* render component */}
          </div>
        </Container>
      </div>
    </div>
  );
}

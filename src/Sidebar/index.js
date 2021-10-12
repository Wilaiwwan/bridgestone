import React, { useState, useEffect } from "react";
import "./css/styles.css";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import { NavLink } from "react-router-dom";

const drawerHeight = "100%";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    height: drawerHeight,
    backgroundColor: "#AFF",
  },
}));
export default function Index(props) {
  const classes = useStyles();

  const [OpenNews, setOpenNews] = useState(false);
  const toggleNews = () => setOpenNews(!OpenNews);
  const [OpenReward, setOpenReward] = useState(false);
  const toggleReward = () => setOpenReward(!OpenReward);
  const [Open360, setOpen360] = useState(false);
  const toggle360 = () => setOpen360(!Open360);
  const [OpenConnect, setOpenConnect] = useState(false);
  const toggleConnect = () => setOpenConnect(!OpenConnect);
  const [OpenAdmin, setOpenAdmin] = useState(false);
  const toggleAdmin = () => setOpenAdmin(!OpenAdmin);
  const handleDrawerClose = () => {
    props.onDrawerClose();
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        // "& .MuiDrawer-paper": {
        //   width: drawerWidth,
        //   boxSizing: "border-box",
        // },
      }}
      variant="permanent"
      anchor="left"
    >
      <div
      // className="sideNav"
      >
        {/* Core theme CSS (includes Bootstrap)*/}
        <link href="css/styles.css" rel="stylesheet" />
        <div className="d-flex" id="wrapper">
          {/* Sidebar*/}
          <div className="border-end bg-white" id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom bg-light">
              <img
                src="/images/Bridgestone.png"
                alt="logo"
                id="logo"
                className="size"
              />
              {/* <span
                id="sidebarToggle"
                class="material-icons-outlined btn"
                onClick={handleDrawerClose}
              >
                menu
              </span> */}
            </div>
            <div className="list-group list-group-flush">
              <a
                style={{ display: "flex", flexDirection: "row" }}
                className="list-group-item list-group-item-action list-group-item-light p-3"
                href="#!"
                onClick={() => toggleNews(!OpenNews)}
              >
                <span
                  style={{ marginRight: 10 }}
                  className="material-icons-outlined"
                >
                  campaign
                </span>
                News/Announcement
                {OpenNews ? (
                  <span
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "end",
                    }}
                    className="material-icons-outlined"
                  >
                    expand_more
                  </span>
                ) : (
                  <span
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "end",
                    }}
                    class="material-icons-outlined"
                  >
                    chevron_right
                  </span>
                )}
              </a>
              {OpenNews ? (
                <div>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/AllSubject"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    เรื่องทั้งหมด
                  </NavLink>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/Information"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    เขียนเรื่องใหม่
                  </NavLink>
                </div>
              ) : null}
              <a
                style={{ display: "flex", flexDirection: "row" }}
                className="list-group-item list-group-item-action list-group-item-light p-3"
                href="#!"
                onClick={() => toggleReward(!OpenReward)}
              >
                <span
                  style={{ marginRight: 10 }}
                  className="material-icons-outlined"
                >
                  emoji_events
                </span>
                B-Reward
                {OpenReward ? (
                  <span
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "end",
                    }}
                    className="material-icons-outlined"
                  >
                    expand_more
                  </span>
                ) : (
                  <span
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "end",
                    }}
                    class="material-icons-outlined"
                  >
                    chevron_right
                  </span>
                )}
              </a>
              {OpenReward ? (
                <div>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/AllReward"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    ของรางวัลทั้งหมด
                  </NavLink>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/AddNewReward"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    เพิ่มของรางวัลใหม่
                  </NavLink>
                </div>
              ) : null}
              <a
                style={{ display: "flex", flexDirection: "row" }}
                className="list-group-item list-group-item-action list-group-item-light p-3"
                href="#!"
                onClick={() => toggle360(!Open360)}
              >
                <span
                  style={{ marginRight: 10 }}
                  className="material-icons-outlined"
                >
                  face_retouching_natural
                </span>
                B-360
                {Open360 ? (
                  <span
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "end",
                    }}
                    className="material-icons-outlined"
                  >
                    expand_more
                  </span>
                ) : (
                  <span
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "end",
                    }}
                    class="material-icons-outlined"
                  >
                    chevron_right
                  </span>
                )}
              </a>
              {Open360 ? (
                <div>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/Members"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    รายชื่อพนักงานดีเด่น
                  </NavLink>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/AddMember"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    เพิ่มพนักงานดีเด่น
                  </NavLink>
                </div>
              ) : null}
              <a
                style={{ display: "flex", flexDirection: "row" }}
                className="list-group-item list-group-item-action list-group-item-light p-3"
                href="#!"
                onClick={() => toggleConnect(!OpenConnect)}
              >
                <span
                  style={{ marginRight: 10 }}
                  className="material-icons-outlined"
                >
                  add_link
                </span>
                B-Connect
                {OpenConnect ? (
                  <span
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "end",
                    }}
                    className="material-icons-outlined"
                  >
                    expand_more
                  </span>
                ) : (
                  <span
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "end",
                    }}
                    class="material-icons-outlined"
                  >
                    chevron_right
                  </span>
                )}
              </a>
              {OpenConnect ? (
                <div>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/AllLink"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    ลิงค์ทั้งหมด
                  </NavLink>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/AddLink"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    เพิ่มลิงค์ใหม่
                  </NavLink>
                </div>
              ) : null}
              <a
                style={{ display: "flex", flexDirection: "row" }}
                className="list-group-item list-group-item-action list-group-item-light p-3"
                href="#!"
                onClick={() => toggleAdmin(!OpenAdmin)}
              >
                <span
                  style={{ marginRight: 10 }}
                  className="material-icons-outlined"
                >
                  admin_panel_settings
                </span>
                B-Admin
                {OpenAdmin ? (
                  <span
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "end",
                    }}
                    className="material-icons-outlined"
                  >
                    expand_more
                  </span>
                ) : (
                  <span
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "end",
                    }}
                    class="material-icons-outlined"
                  >
                    chevron_right
                  </span>
                )}
              </a>
              {OpenAdmin ? (
                <div>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/AllUser"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    ผู้ใช้ทั้งหมด
                  </NavLink>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/ManagePermissions"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    จัดการสิทธิ์
                  </NavLink>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/SetPermissions"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    กำหนดสิทธิ์
                  </NavLink>
                  <NavLink
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    exact={true}
                    activeClassName="is-active"
                    to="/Role"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    บทบาท
                  </NavLink>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

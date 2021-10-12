import React from "react";
import {
  Paper,
  InputBase,
  Checkbox,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const drawerHeight = "100%";
const drawerwidth = "100%";
const useStyles = makeStyles((theme) => ({
  root: {
    height: drawerHeight,
    width: drawerwidth,
    marginTop: 20,
  },
  width: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  Padding: {
    paddingTop: "2%",
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingBottom: "2%",
  },
  subject: {
    width: "20%",
  },
}));

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#FF0000",
    "&:hover": {
      backgroundColor: alpha("#FF0000", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#FF0000",
  },
}));

export default function AddLink() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Connect</p>
          <h3>เพิ่มลิงค์ใหม่</h3>
          <div className={classes.width}>
            <p className={classes.subject}>ชื่อหัวข้อ</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="ปฏิทินทำงาน ปีพศ. 2564"
              ></TextField>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>ไอคอน</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <div
                style={{
                  border: "4px dotted #FF0000 ",
                  width: 150,
                  height: 150,
                  borderRadius: 10,
                }}
              ></div>
              <span style={{ color: "gray" }}>Image 512 x 512 pixels</span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>กลุ่ม</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField size="small" placeholder=""></TextField>
            </div>
          </div>

          <div className={classes.width}>
            <p className={classes.subject}>ลิงค์ปลายทาง</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                placeholder="https://s3-ap-southeast-1.amazonaws.com/share.mybtmt.com
                /files/BTMT-Working-Calendar-2021-for-Line-36hr.pdf"
                style={{ flexGrow: 1, borderColor: "#dbdbdb" }}
              />
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>สถานะ</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <GreenSwitch defaultChecked />
            </div>
          </div>
          <div
            style={{
              width: "70%",
              paddingLeft: "14%",
              marginTop: 50,
            }}
          >
            <Button
              variant="outlined"
              style={{
                color: "black",
                backgroundColor: "#F8F9FA",
                borderColor: "transparent",
                marginRight: 10,
                width: 120,
              }}
            >
              กลับ
            </Button>
            <Button
              variant="outlined"
              style={{
                color: "white",
                backgroundColor: "#FF0000",
                borderColor: "transparent",
                marginRight: 10,
                width: 120,
              }}
            >
              บันทึก
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

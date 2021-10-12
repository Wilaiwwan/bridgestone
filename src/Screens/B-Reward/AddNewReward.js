import React, { useState } from "react";
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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

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
export default function AddNewReward() {
  const classes = useStyles();
  const [value, setValue] = useState(null);

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Reward</p>
          <h3>เพิ่มของรางวัลใหม่</h3>
          <div className={classes.width}>
            <p className={classes.subject}>ชื่อของรางวัล</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="Bridgestone Jacket 2020"
              ></TextField>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>รูปของรางวัล</p>
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
              <span style={{ color: "gray" }}>Image 1920x700 pixels</span>
            </div>
          </div>
          {/* <div className={classes.width}>
            <p className={classes.subject}>รายละเอียด</p>
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
                placeholder="แจ็คเก็ตลำลอง ผลิตจากวัสดุและเส้นใยคุณภาพดี เย็บตัดต่อ 3 สี ขาว / แดง / ดำ
                ปัก logo Bridgestone มีกระเป๋าหน้า ทรงสวย สวมใส่สบายทุกสภาพอากาศ"
                style={{ flexGrow: 1, borderColor: "#dbdbdb" }}
              />
            </div>
          </div>
           */}
          <div className={classes.width}>
            <p className={classes.subject}>จำนวนของรางวัลในคลัง</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField size="small" placeholder="15"></TextField>
            </div>
          </div>

          <div className={classes.width}>
            <p className={classes.subject}>คะแนนแลก</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField size="small" placeholder="1500"></TextField>
              <span style={{ color: "gray" }}>
                จำนวนคะแนนเพื่อใช้แลกของรางวัล
              </span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>วันที่เริ่ม</p>
            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  // label="Basic example"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>วันที่สิ้นสุด</p>
            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  // label="Basic example"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
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

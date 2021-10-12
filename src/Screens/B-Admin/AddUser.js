import React from "react";
import { Paper, InputBase, Checkbox, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";

const drawerHeight = "100%";
const drawerwidth = "100%";
const useStyles = makeStyles((theme) => ({
  root: {
    height: drawerHeight,
    width: drawerwidth,
    marginTop: 20,
  },
  search: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e0e0e0",
    width: "20%",
    marginRight: 20,
  },
  Padding: {
    paddingTop: "2%",
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingBottom: "2%",
  },
  widthInput: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    marginTop: 50,
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

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  //   "label + &": {
  //     marginTop: theme.spacing(3),
  //   },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
}));

export default function AddUser() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Admin</p>
          <h3>เพิ่มผู้ใช้</h3>
          <div className={classes.widthInput}>
            <p className={classes.subject}>รหัสพนักงาน</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField size="small" placeholder="รหัสพนักงาน"></TextField>
            </div>
          </div>
          <div className={classes.widthInput}>
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
          <div className={classes.widthInput}>
            <p className={classes.subject}>ชื่อ</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField size="small" placeholder="ชื่อ"></TextField>
            </div>
          </div>
          <div className={classes.widthInput}>
            <p className={classes.subject}>นามสกุล</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField size="small" placeholder="นามสกุล"></TextField>
            </div>
          </div>
          <div className={classes.widthInput}>
            <p className={classes.subject}>บทบาท</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <FormControl variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">
                  Age
                </InputLabel>
                <NativeSelect
                  id="demo-customized-select-native"
                  value={age}
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </NativeSelect>
              </FormControl>
            </div>
          </div>
          <div className={classes.widthInput}>
            <p className={classes.subject}>แผนก</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField size="small" placeholder="แผนก"></TextField>
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

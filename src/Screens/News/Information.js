import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Paper, InputBase, TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./information.css";
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
    // alignItems: "center",
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

ClassicEditor.create(document.querySelector("#editor"))
  .then((editor) => {
    editor.ui.view.editable.element.style.height = "250px";
  })
  .catch((error) => {
    console.error(error);
  });

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

export default function Information() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [value, setValue] = useState(null);

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>News/Announcement</p>
          <h3>เขียนเรื่องใหม่</h3>
          <div className={classes.width}>
            <p className={classes.subject}>หัวข้อเรื่อง</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField size="small" placeholder="หัวข้อเรื่อง"></TextField>
              <span style={{ color: "gray" }}>
                หัวข้อเรื่องที่ปรากฏในหน้าข่าวประกาศ
              </span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>รูปประจำเรื่อง</p>
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
              <span style={{ color: "gray" }}>รูป 1920 x 700 พิกเซล</span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>ชนิดของเรื่อง</p>
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
              <span style={{ color: "gray" }}>
                Information คือ คอนเทนต์ประเภทบทความ, Bookview คือคอนเทนต์ประเภท
                PDF File
              </span>
            </div>
          </div>

          <div className={classes.width}>
            <p className={classes.subject}>เกริ่นนำ</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField size="small" placeholder="หัวข้อเรื่อง"></TextField>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>รายละเอียด</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <CKEditor
                id="editor"
                editor={ClassicEditor}
                data=""
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>หมวดหมู่</p>
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
              <span style={{ color: "gray" }}>หมวดหมู่ของข่าวประกาศ</span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>หมวดหมู่รอง</p>
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
              <span style={{ color: "gray" }}>หมวดหมู่รองของข่าวประกาศ</span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>คะแนนของรางวัล</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField size="small" placeholder="คะแนน"></TextField>
              <span style={{ color: "gray" }}>คะแนนเมื่อกดอ่านข่าวเสร็จ</span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>อัปโหลด PDF</p>
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
              <span style={{ color: "gray" }}>ขนาดไฟล์ไม่เกิน 1 MB.</span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>
              อัปโหลดไฟล์ <br />
              (รายชื่อพนักงาน)
            </p>
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
              <span style={{ color: "gray" }}>(.xls) สนับสนุน</span>
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
                color: "black",
                borderColor: "transparent",
                backgroundColor: "#F8F9FA",
                marginRight: 10,
                width: 120,
              }}
            >
              บันทึกฉบับร่าง
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
              เผยแพร่
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

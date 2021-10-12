import React from "react";
import { Paper, InputBase, Checkbox, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const drawerHeight = "100%";
const drawerwidth = "100%";
const useStyles = makeStyles((theme) => ({
  root: {
    height: drawerHeight,
    width: drawerwidth,
    marginTop: 20,
  },
  Padding: {
    paddingTop: "2%",
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingBottom: "2%",
  },
  haft: { width: "45%" },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  Margin: {
    marginTop: 10,
  },
}));
export default function ManagePermissions() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "#FF0000", fontSize: 18 }}>B-Admin</p>
          <h3>จัดการสิทธิ์</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              marginBottom: 30,
            }}
          >
            <Button
              variant="outlined"
              size="large"
              style={{
                color: "#FF0000",
                backgroundColor: "transparent",
                borderColor: "#FF0000",
                width: 120,
                textTransform: "lowercase",
              }}
            >
              Download
            </Button>
            <Button
              variant="outlined"
              size="large"
              style={{
                color: "white",
                backgroundColor: "#FF0000",
                borderColor: "transparent",
                marginLeft: 10,
                width: 120,
                textTransform: "lowercase",
              }}
            >
              Upload
            </Button>
          </div>
          <div className={classes.row}>
            <div className={classes.haft}>
              <p style={{ color: "#FF0000" }}>Category</p>
              <div className={classes.Margin}>
                <div className={classes.row}>
                  <span>News/Announcement</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
                <div
                  className={classes.row}
                  style={{
                    backgroundColor: "#FAFBFD",
                    borderBottom: "1px solid #e0e0e0",
                    paddingLeft: 30,
                  }}
                >
                  <span>เรื่องทั้งหมด</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
                <div
                  className={classes.row}
                  style={{
                    backgroundColor: "#FAFBFD",
                    borderBottom: "1px solid #e0e0e0",
                    paddingLeft: 30,
                  }}
                >
                  <span>เขียนเรื่องใหม่</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
              </div>

              <div className={classes.Margin}>
                <div className={classes.row}>
                  <span>B-Reward</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
                <div
                  className={classes.row}
                  style={{
                    backgroundColor: "#FAFBFD",
                    borderBottom: "1px solid #e0e0e0",
                    paddingLeft: 30,
                  }}
                >
                  <span>ของรางวัลทั้งหมด</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
                <div
                  className={classes.row}
                  style={{
                    backgroundColor: "#FAFBFD",
                    borderBottom: "1px solid #e0e0e0",
                    paddingLeft: 30,
                  }}
                >
                  <span>เพิ่มของรางวัลใหม่</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
              </div>

              <div className={classes.Margin}>
                <div className={classes.row}>
                  <span>B-360</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
                <div
                  className={classes.row}
                  style={{
                    backgroundColor: "#FAFBFD",
                    borderBottom: "1px solid #e0e0e0",
                    paddingLeft: 30,
                  }}
                >
                  <span>รายชื่อพนักงานดีเด่น</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
                <div
                  className={classes.row}
                  style={{
                    backgroundColor: "#FAFBFD",
                    borderBottom: "1px solid #e0e0e0",
                    paddingLeft: 30,
                  }}
                >
                  <span>เพิ่มพนักงานดีเด่น</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
              </div>

              <div className={classes.Margin}>
                <div className={classes.row}>
                  <span>B-Connect</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
                <div
                  className={classes.row}
                  style={{
                    backgroundColor: "#FAFBFD",
                    borderBottom: "1px solid #e0e0e0",
                    paddingLeft: 30,
                  }}
                >
                  <span>ลิงค์ทั้งหมด</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
                <div
                  className={classes.row}
                  style={{
                    backgroundColor: "#FAFBFD",
                    borderBottom: "1px solid #e0e0e0",
                    paddingLeft: 30,
                  }}
                >
                  <span>เพิ่มลิงค์ใหม่</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#2DCE98" }}
                    >
                      add
                    </span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.haft}>
              <p style={{ color: "#FF0000" }}>Action</p>
              <div className={classes.Margin}>
                <div
                  className={classes.row}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 5,
                  }}
                >
                  <span>สร้างข่าวประกาศ</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
                <div
                  className={classes.row}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 5,
                  }}
                >
                  <span>ลบข่าวประกาศ</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
                <div
                  className={classes.row}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 5,
                  }}
                >
                  <span>แก้ไขข่าวประกาศ</span>
                  <div>
                    <span class="material-icons">edit</span>
                    <span
                      class="material-icons-outlined"
                      style={{ color: "#FF0000" }}
                    >
                      close
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}

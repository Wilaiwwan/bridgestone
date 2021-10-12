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
export default function Role() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "#FF0000", fontSize: 18 }}>B-Admin</p>
          <h3>บทบาท</h3>
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
              เพิ่ม
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
              บันทึก
            </Button>
          </div>
          <div className={classes.row}>
            <div className={classes.haft}>
              <div className={classes.Margin}>
                <div
                  className={classes.row}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 5,
                  }}
                >
                  <span>Developer</span>
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
                  <span>Adminnistrator</span>
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
                  <span>Viewer</span>
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
                  <span>User</span>
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

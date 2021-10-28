import React from "react";
import { Paper, InputBase, Checkbox, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { red } from "@mui/material/colors";

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
  },
  Padding: {
    paddingTop: "2%",
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingBottom: "2%",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
    backgroundColor: theme.palette.action.hover,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AddMember() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-360</p>
          <h3>เพิ่มพนักงานดีเด่น</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              marginBottom: 30,
            }}
          >
            <div className={classes.search}>
              <SearchIcon style={{ margin: 10 }} />
              <InputBase multiline fullWidth placeholder="ค้นหาพนักงาน" />
            </div>
            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "#FF0000",
                borderColor: "transparent",
                marginLeft: 10,
                width: 120,
              }}
            >
              เพิ่ม
            </Button>
          </div>

          <TableContainer
          // component={Paper}
          >
            <Table
              sx={{ minWidth: 700 }}
              size="small"
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">#</StyledTableCell>
                  <StyledTableCell align="center">รหัสพนักงาน</StyledTableCell>
                  <StyledTableCell align="center">ชื่อ</StyledTableCell>
                  <StyledTableCell align="center">แผนก</StyledTableCell>
                  <StyledTableCell align="center">แก้ไข</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key="">
                  <StyledTableCell align="center">1</StyledTableCell>
                  <StyledTableCell align="center">000001</StyledTableCell>
                  <StyledTableCell align="left">
                    Kanchana Sasithorn
                  </StyledTableCell>
                  <StyledTableCell align="center">แผนกการผลิต</StyledTableCell>
                  <StyledTableCell align="center">
                    <span class="material-icons" style={{ color: "#FF0000" }}>
                      cancel
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
              <TableBody>
                <StyledTableRow key="">
                  <StyledTableCell align="center">1</StyledTableCell>
                  <StyledTableCell align="center">000001</StyledTableCell>
                  <StyledTableCell align="left">
                    Kanchana Sasithorn
                  </StyledTableCell>
                  <StyledTableCell align="center">แผนกการผลิต</StyledTableCell>
                  <StyledTableCell align="center">
                    <span class="material-icons" style={{ color: "#FF0000" }}>
                      cancel
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
              <TableBody>
                <StyledTableRow key="">
                  <StyledTableCell align="center">1</StyledTableCell>
                  <StyledTableCell align="center">000001</StyledTableCell>
                  <StyledTableCell align="left">
                    Kanchana Sasithorn
                  </StyledTableCell>
                  <StyledTableCell align="center">แผนกการผลิต</StyledTableCell>
                  <StyledTableCell align="center">
                    <span class="material-icons" style={{ color: "#FF0000" }}>
                      cancel
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
              <TableBody>
                <StyledTableRow key="">
                  <StyledTableCell align="center">1</StyledTableCell>
                  <StyledTableCell align="center">000001</StyledTableCell>
                  <StyledTableCell align="left">
                    Kanchana Sasithorn
                  </StyledTableCell>
                  <StyledTableCell align="center">แผนกการผลิต</StyledTableCell>
                  <StyledTableCell align="center">
                    <span class="material-icons" style={{ color: "#FF0000" }}>
                      cancel
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
              <TableBody>
                <StyledTableRow key="">
                  <StyledTableCell align="center">1</StyledTableCell>
                  <StyledTableCell align="center">000001</StyledTableCell>
                  <StyledTableCell align="left">
                    Kanchana Sasithorn
                  </StyledTableCell>
                  <StyledTableCell align="center">แผนกการผลิต</StyledTableCell>
                  <StyledTableCell align="center">
                    <span class="material-icons" style={{ color: "#FF0000" }}>
                      cancel
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </div>
  );
}

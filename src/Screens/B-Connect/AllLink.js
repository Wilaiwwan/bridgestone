import React, { useState } from "react";
import { Paper, InputBase, Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

const options = ["ดูรายละเอียด"];
const ITEM_HEIGHT = 48;

export default function AllLink() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Connect</p>
          <h3>ลิงค์ทั้งหมด</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 30,
            }}
          >
            <div className={classes.search}>
              <SearchIcon style={{ margin: 10 }} />
              <InputBase multiline fullWidth placeholder="ค้นหาพนักงาน" />
            </div>
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
                  <StyledTableCell align="center">ลำดับ</StyledTableCell>
                  <StyledTableCell align="center">ชื่อ</StyledTableCell>
                  <StyledTableCell align="center">ลิงค์ปลายทาง</StyledTableCell>
                  <StyledTableCell align="center">กลุ่ม</StyledTableCell>
                  <StyledTableCell align="center">ผู้เขียน</StyledTableCell>
                  <StyledTableCell align="center">แอคชั่น</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key="">
                  <StyledTableCell align="center">1</StyledTableCell>
                  <StyledTableCell align="center">
                    สายด่วนบีทีเอ็มที
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    https://line.btmt.co.th/page/addressbook
                  </StyledTableCell>
                  <StyledTableCell align="center">กลุ่ม</StyledTableCell>
                  <StyledTableCell align="center">Nakron</StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls="long-menu"
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          // width: "20ch",
                        },
                      }}
                    >
                      {options.map((option) => (
                        <MenuItem
                          key={option}
                          selected={option === "Pyxis"}
                          onClick={handleClose}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
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

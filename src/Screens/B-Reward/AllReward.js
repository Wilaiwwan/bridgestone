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

export default function AllReward() {
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
          <p style={{ color: "red" }}>B-Reward</p>
          <h3>ของรางวัลทั้งหมด</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 30,
            }}
          >
            <div className={classes.search}>
              <SearchIcon style={{ margin: 10 }} />
              <InputBase multiline fullWidth placeholder="ค้นหารางวัล" />
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
                  <StyledTableCell align="center">วันที่เริ่ม</StyledTableCell>
                  <StyledTableCell align="center">
                    วันที่สิ้นสุด
                  </StyledTableCell>
                  <StyledTableCell align="center">Reward</StyledTableCell>
                  <StyledTableCell align="center">จำนวน</StyledTableCell>
                  <StyledTableCell align="center">คะแนนแลก</StyledTableCell>
                  <StyledTableCell align="center">ผู้เขียน</StyledTableCell>
                  <StyledTableCell align="center">แอคชั่น</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key="">
                  <StyledTableCell align="center">04/06/2021</StyledTableCell>
                  <StyledTableCell align="center">04/06/2021</StyledTableCell>
                  <StyledTableCell align="center">
                    Bridgestone Jacket 2020
                  </StyledTableCell>
                  <StyledTableCell align="center">5</StyledTableCell>
                  <StyledTableCell align="center">1500</StyledTableCell>
                  <StyledTableCell align="left">Nakron</StyledTableCell>
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

import React, { useState, useEffect } from "react";
import { Paper, InputBase, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useHistory, Link } from "react-router-dom";
import qs from "qs";
import api from "../../Component/api/api";

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
    fontSize: 18,
    // backgroundColor: theme.palette.action.hover,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AllLink() {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [keyword, setKeyword] = useState("");
  const [BconnectID, setBconnectID] = useState("");
  const [BconnectList, setBconnectList] = useState([]);

  const fetchBconnectList = async () => {
    try {
      const params = qs.stringify({
        ...(keyword && { keyword }),
        ...(BconnectID && { BconnectID }),
      });

      const result = await api.get(
        `${process.env.REACT_APP_BASE_API_DEV}api/bconnect/list?${params}`
      );
      const _result = result.data.results;
      setBconnectList(_result);
      console.log(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBconnectList();
    } else {
      history.push("/login");
    }
  }, [keyword]);

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
              <InputBase
                multiline
                fullWidth
                placeholder="ค้นหาชื่อ"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>

          <TableContainer sx={{ maxHeight: "62vh" }}>
            <Table stickyHeader size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ลำดับ</StyledTableCell>
                  <StyledTableCell align="center">ชื่อ</StyledTableCell>
                  <StyledTableCell width="10%" align="center">
                    ลิงค์ปลายทาง
                  </StyledTableCell>
                  <StyledTableCell align="center">กลุ่ม</StyledTableCell>
                  <StyledTableCell align="center">ผู้เขียน</StyledTableCell>
                  <StyledTableCell align="center">แก้ไข</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {BconnectList.map((Data, index) => {
                  return (
                    <StyledTableRow key={Data.bconnectID}>
                      <StyledTableCell align="center">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {Data.bconnectName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <a>{Data.url}</a>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {Data.typeConnectName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {Data.createName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Link
                          to={{
                            pathname: `/EditLink/${Data.bconnectID}`,
                          }}
                        >
                          <Button
                            variant="contained"
                            style={{
                              color: "white",
                              backgroundColor: "#FF0000",
                              borderColor: "transparent",
                              marginRight: 10,
                              width: 80,
                            }}
                          >
                            เพิ่มเติม
                          </Button>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </div>
  );
}

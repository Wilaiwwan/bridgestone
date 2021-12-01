import React, { useState, useEffect } from "react";
import {
  Paper,
  InputBase,
  Button,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
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
import api from "../../Component/api/api";
import qs from "qs";

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

export default function AllUser() {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [keyword, setKeyword] = useState("");
  const [EmpList, setEmpList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [RoleList, setRoleList] = useState([]);
  const [RoleId, setRoleId] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchEmpList = async () => {
    try {
      const params = qs.stringify({
        ...(keyword && { keyword }),
        ...(RoleId && { RoleId }),
      });

      const result = await api.get(`/api/employee/list?${params}`);
      const _result = result.data.results;
      setEmpList(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchRoleList = async () => {
    try {
      const result = await api.get("api/setting/role/list");
      const _result = result.data.results;
      setRoleList(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    fetchRoleList();
  }, []);

  useEffect(() => {
    if (token) {
      fetchEmpList();
    } else {
      history.push("/login");
    }
  }, [keyword, RoleId]);

  return (
    <div className={classes.root}>
      <Paper elevation={1} style={{ height: "88vh" }}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Admin</p>
          <h3>ผู้ใช้ทั้งหมด</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <FormControl
              size="small"
              sx={{
                width: "15%",
                marginRight: 5,
              }}
            >
              <Select
                style={{ marginTop: 5 }}
                value={RoleId}
                onChange={(e) => setRoleId(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                disableUnderline
              >
                <MenuItem value="">
                  <em>บทบาททั้งหมด</em>
                </MenuItem>
                {RoleList.filter((x) => x.roleId !== "1").map((Data) => (
                  <MenuItem value={Data.roleId}>{Data.roleName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={classes.search}>
              <SearchIcon style={{ margin: 10 }} />
              <InputBase
                multiline
                fullWidth
                placeholder="ค้นหา"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            {/* <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "#FF0000",
                borderColor: "transparent",
                marginRight: 10,
                width: 120,
              }}
              onClick={handleRoute}
            >
              เพิ่มผู้ใช้งาน
            </Button> */}
          </div>

          <TableContainer
            // component={Paper}
            sx={{ maxHeight: "59vh", minHeight: "59vh" }}
          >
            <Table stickyHeader size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell width="20%" align="center">
                    รหัสพนักงาน
                  </StyledTableCell>
                  <StyledTableCell width="35%" align="center">
                    ชื่อผู้ใช้
                  </StyledTableCell>
                  <StyledTableCell width="15%" align="center">
                    แผนก
                  </StyledTableCell>
                  <StyledTableCell width="15%" align="center">
                    บทบาท
                  </StyledTableCell>
                  <StyledTableCell width="15%" align="center">
                    แก้ไข
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? EmpList.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : EmpList
                )
                  // .filter((i, index) => index < 100)
                  .map((Data, index) => {
                    return (
                      <StyledTableRow key={Data.empId}>
                        <StyledTableCell align="center">
                          {Data.empNo}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {Data.fistName} <span>&nbsp;&nbsp;</span>
                          {Data.lastName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.orgname}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.roleName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Link
                            to={{
                              pathname: `/EditUser/${Data.empId}`,
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
          <TablePagination
            rowsPerPageOptions={[15, 45, 105]}
            component="div"
            count={EmpList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Paper, InputBase, Button, TablePagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useHistory, Link } from "react-router-dom";
import qs from "qs";
import moment from "moment";
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

export default function AllSubject() {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const history = useHistory();

  const [keyword, setKeyword] = useState("");
  const [ContentMainId, setContentMainId] = useState("");
  const [AdminContentList, setAdminContentList] = useState([]);
  const [Status, setStatus] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  

  const fetchAdminContentList = async () => {
    try {
      const params = qs.stringify({
        ...(keyword && { keyword }),
        ...(ContentMainId && { ContentMainId }),
      });

      const result = await api.get(`/api/admin/content/list?${params}`);
      const _result = result.data.results;
      setAdminContentList(_result);
      console.log(result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminContentList();
    } else {
      history.push("/login");
    }
  }, [keyword]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} style={{ height: "88vh" }}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>News/Announcement</p>
          <h3>เรื่องทั้งหมด</h3>
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
                placeholder="ค้นหาเรื่อง"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>

          <TableContainer sx={{ maxHeight: "58vh",height: "58vh" }}>
            <Table stickyHeader size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">วันที่เริ่ม</StyledTableCell>
                  <StyledTableCell align="center">
                    วันที่สิ้นสุด
                  </StyledTableCell>
                  <StyledTableCell width="25%" align="center">
                    ชื่อเรื่อง
                  </StyledTableCell>
                  <StyledTableCell align="center">หมวดหมู่</StyledTableCell>
                  <StyledTableCell align="center">หมวดหมู่ย่อย</StyledTableCell>
                  <StyledTableCell align="center">ผู้เขียน</StyledTableCell>
                  <StyledTableCell align="center">สถานะ</StyledTableCell>
                  <StyledTableCell align="center">แก้ไข</StyledTableCell>
                </TableRow>
              </TableHead>
              {AdminContentList.length > 0 ? (
                <TableBody>
                  {(rowsPerPage > 0
                    ? AdminContentList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : AdminContentList
                  ).map((Data, index) => {
                    return (
                      <StyledTableRow key={Data.contentMainId}>
                        <StyledTableCell align="center">
                          {moment(Data.startDate).format("DD-MM-YYYY")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(Data.endDate).format("DD-MM-YYYY")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.contentTitle}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.catalogyName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.subCatalogyName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {Data.createName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.status === "C"
                            ? "Cancel"
                            : Data.status === "D"
                            ? "Draff"
                            : "Publish"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Link
                            to={{
                              pathname: `/EditInformation/${Data.contentMainId}`,
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
              ) : null}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[15, 45, 105]}
            component="div"
            count={AdminContentList.length}
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

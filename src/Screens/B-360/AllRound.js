import React, { useState, useEffect } from "react";
import { Paper, InputBase, Button, TablePagination, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useHistory, Link } from "react-router-dom";
import qs from "qs";
import moment from "moment";
import api from "../../Component/api/api";
import "moment/locale/th";

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
    width: "100%",
  },
  Padding: {
    paddingTop: "2%",
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingBottom: "2%",
  },
  Row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  subject: {
    width: "30%",
  },
  widthContent: {
    marginTop: 20,
    width: 250,
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

export default function AllRound() {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const history = useHistory();

  const [keyword, setKeyword] = useState("");
  const [RoundList, setRoundList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  moment.locale("th");

  const fetchRoundList = async () => {
    try {
      const params = qs.stringify({
        ...(keyword && { keyword }),
      });

      const result = await api.get(`/api/excellent/head/list?${params}`);
      const _result = result.data.results;
      setRoundList(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRoundList();
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
          <p style={{ color: "red" }}>B-360</p>
          <h3>พนักงานดีเด่น</h3>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: { sm: "right" }, marginBottom: 2 }}
            rowSpacing={1}
          >
            <Grid
              item
              xs={7}
              sm={2.5}
              lg={1}
              sx={{ marginRight: { md: 2 } }}
            >
              <Button
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#FF0000",
                  borderColor: "transparent",
                  width: 80,
                }}
                onClick={() => history.push("/AddMember")}
              >
                เพิ่มรอบ
              </Button>
            </Grid>
            <Grid item xs={7} sm={4} lg={3}>
              <div className={classes.search}>
                <SearchIcon style={{ margin: 10 }} />
                <InputBase
                  multiline
                  fullWidth
                  placeholder="ค้นหาเรื่อง"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>

          <TableContainer sx={{ maxHeight: "58vh", height: "58vh" }}>
            <Table stickyHeader size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ปี</StyledTableCell>
                  <StyledTableCell align="center">เดือน</StyledTableCell>
                  <StyledTableCell align="center">ชื่อรอบ</StyledTableCell>
                  <StyledTableCell align="center">
                    จำนวนพนักงานดีเด่น
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">สถานะ</StyledTableCell> */}
                  <StyledTableCell align="center">แก้ไข</StyledTableCell>
                </TableRow>
              </TableHead>
              {RoundList.length > 0 ? (
                <TableBody>
                  {(rowsPerPage > 0
                    ? RoundList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : RoundList
                  ).map((Data, index) => {
                    return (
                      <StyledTableRow key={Data.contentMainId}>
                        <StyledTableCell align="center">
                          {moment(Data.year).format("YYYY")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(Data.month).format("MMMM")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.excellentTitle}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.staffCount}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">
                        {Data.status ? "เปิด" : "ปิด"}
                      </StyledTableCell> */}
                        <StyledTableCell align="center">
                          <Link
                            to={{
                              pathname: `/EditRound/${Data.excellId}`,
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
            count={RoundList.length}
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

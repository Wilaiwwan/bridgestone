import React, { useState, useEffect } from "react";
import { Paper, InputBase, Button, TablePagination } from "@mui/material";
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
import moment from "moment";

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

export default function AllReward() {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [RewardList, setRewardList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const fetchBRewardList = async () => {
    try {
      const params = qs.stringify({
        isBackend: true,
        ...(keyword && { keyword }),
      });

      const result = await api.get(`/api/bpoint/item/list?${params}`);
      const _result = result.data.results;
      setRewardList(_result);
      console.log(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBRewardList();
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
              <InputBase
                multiline
                fullWidth
                placeholder="ค้นหา"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>

          <TableContainer sx={{ maxHeight: "58vh", height: "58vh" }}>
            <Table stickyHeader size="small" aria-label="customized table">
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
                  <StyledTableCell align="center">แก้ไข</StyledTableCell>
                </TableRow>
              </TableHead>
              {RewardList.length > 0 ? (
                <TableBody>
                  {(rowsPerPage > 0
                    ? RewardList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : RewardList
                  ).map((Data, index) => {
                    return (
                      <StyledTableRow key={Data.itemId}>
                        <StyledTableCell align="center">
                          {moment(Data.startDate).format("DD-MM-YYYY")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(Data.endDate).format("DD-MM-YYYY")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.itemName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.stock}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.point}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {Data.createName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Link
                            to={{
                              pathname: `/EditReward/${Data.itemId}`,
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
            count={RewardList.length}
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

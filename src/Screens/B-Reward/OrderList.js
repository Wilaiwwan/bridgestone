import React, { useState, useEffect } from "react";
import {
  Paper,
  InputBase,
  Button,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  CircularProgress,
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
  dialogPaper: {
    height: "450px",
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

export default function OrderList() {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [OrderList, setOrderList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [openAdd, setOpenAdd] = useState(false);
  const [Remark, setRemark] = useState(null);
  const [saleNo, setSaleNo] = useState(null);
  const [Name, setName] = useState(null);
  const [item, setItem] = useState(null);
  const [SalesHeadId, setSalesHeadId] = useState(null);
  const [ItemId, setItemId] = useState(null);
  const [Qty, setQty] = useState(null);
  const [open, setOpen] = useState(false);

  const [LoadingC, setLoadingC] = useState(false);
  const [LoadingN, setLoadingN] = useState(false);

  const fetchOrderList = async () => {
    try {
      const params = qs.stringify({
        isBackend: true,
        ...(keyword && { keyword }),
      });

      const result = await api.get(`/api/bpoint/salehead/list?${params}`);
      const _result = result.data.results;
      setOrderList(_result);
      console.log(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };
  const upDateSale = async () => {
    setLoadingN(true);
    const body = {
      SalesHeadId,
      Status: "D",
      Remark: !Remark ? null : Remark,
      ItemId,
      Qty,
    };
    try {
      const result = await api.post("/api/bpoint/salehead/update", body);
      setOpen(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
      fetchOrderList();
    } catch (error) {
      console.log("error => ", error);
      setLoadingN(false);
    }
  };
  const cancelSale = async () => {
    setLoadingC(true);
    const body = {
      SalesHeadId,
      Status: "N",
      Remark: !Remark ? null : Remark,
      ItemId,
      Qty,
    };
    try {
      const result = await api.post("/api/bpoint/salehead/update", body);
      setOpen(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
      fetchOrderList();
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrderList();
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

  const handleEdit = (results) => {
    setRemark(results.remark);
    setSaleNo(results.salesheadNo);
    setSalesHeadId(results.salesHeadId);
    setItemId(results.itemId);
    setQty(results.qty);
    setOpenAdd(true);
    setName(results.firstname + " " + results.lastname);
    setItem(results.itemName);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAdd(false);
    setSaleNo("");
    setSalesHeadId("");
    setItemId("");
    setQty("");
    setRemark("");
    setLoadingC(false);
    setLoadingN(false);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} style={{ height: "88vh" }}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Reward</p>
          <h3>รายการของที่สั่งทั้งหมด</h3>
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
                  <StyledTableCell align="center">วันที่</StyledTableCell>
                  <StyledTableCell align="center">เลขที่</StyledTableCell>
                  <StyledTableCell align="center">ชื่อ-สกุล</StyledTableCell>
                  <StyledTableCell align="center">สินค้า</StyledTableCell>
                  <StyledTableCell align="center">จำนวน</StyledTableCell>
                  <StyledTableCell align="center">สถานะ</StyledTableCell>
                  <StyledTableCell align="center">แก้ไข</StyledTableCell>
                </TableRow>
              </TableHead>
              {OrderList.length > 0 ? (
                <TableBody>
                  {(rowsPerPage > 0
                    ? OrderList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : OrderList
                  ).map((Data, index) => {
                    return (
                      <StyledTableRow key={Data.itemId}>
                        <StyledTableCell align="center">
                          {moment(Data.salesDate).format("DD-MM-YYYY")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.salesheadNo}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {Data.firstname}
                          <span>&nbsp;&nbsp;</span>
                          {Data.lastname}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.itemName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.totalPoint}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.statusName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button
                            onClick={() => handleEdit(Data)}
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
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              ) : null}
            </Table>
          </TableContainer>
          <Dialog
            open={openAdd}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="sm"
          >
            <DialogTitle>
              <h4>
                เลขที่{" "}
                <span style={{ color: "red", marginLeft: 10 }}>{saleNo}</span>
              </h4>
              <h4>
                ชื่อ{" "}
                <span style={{ color: "red", marginLeft: 10 }}>{Name}</span>
              </h4>
              <h4>
                สินค้า{" "}
                <span style={{ color: "red", marginLeft: 10 }}>{item}</span>
              </h4>
            </DialogTitle>
            <DialogContent>
              <div className={classes.Row}>
                <p>ตอบกลับ</p>

                <div
                  style={{
                    display: "flex",
                    flexGrow: 1,
                  }}
                >
                  <TextareaAutosize
                    aria-label="minimum height"
                    maxRows={4}
                    minRows={4}
                    placeholder="..."
                    style={{ flexGrow: 1, borderColor: "#dbdbdb" }}
                    onChange={(e) => setRemark(e.target.value)}
                    value={Remark}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <Button
                variant="contained"
                style={{
                  color: "black",
                  borderColor: "transparent",
                  backgroundColor: "#F8F9FA",
                  width: 80,
                }}
                onClick={handleClose}
              >
                ปิด
              </Button>
              <Button
                variant="outlined"
                style={{
                  color: "#FF0000",
                  borderColor: "#FF0000",
                  width: 80,
                }}
                onClick={() => cancelSale()}
              >
                {LoadingC ? (
                  <CircularProgress
                    sx={{
                      color: "#FF0000",
                    }}
                    size={24}
                  />
                ) : (
                  "ยกเลิก"
                )}
              </Button>
              <Button
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#FF0000",
                  borderColor: "transparent",
                  marginRight: 10,
                  width: 80,
                }}
                onClick={() => upDateSale()}
              >
                {LoadingN ? (
                  <CircularProgress
                    sx={{
                      color: "white",
                    }}
                    size={24}
                  />
                ) : (
                  "จัดส่ง"
                )}
              </Button>
            </DialogActions>
          </Dialog>
          <TablePagination
            rowsPerPageOptions={[15, 45, 105]}
            component="div"
            count={OrderList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Dialog
            open={open}
            fullWidth={true}
            maxWidth="xs"
            classes={{ paper: classes.dialogPaper }}
          >
            <DialogContent
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <span
                style={{ fontSize: 100, color: "#FF0000" }}
                class="material-icons-outlined"
              >
                task_alt
              </span>

              <p
                style={{
                  alignItems: "center",
                  fontSize: 28,
                  color: "#FF0000",
                }}
              >
                success
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </Paper>
    </div>
  );
}

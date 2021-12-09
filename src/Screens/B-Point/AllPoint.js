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
  TextField,
} from "@mui/material";
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
import Grid from "@mui/material/Grid";
import FileUploadService from "../../Services/FileUploadService";

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
    flexDirection: "column",
  },
  subject: {
    width: "30%",
  },
  widthContent: {
    marginTop: 20,
    width: 250,
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

export default function AllPoint() {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const history = useHistory();

  const [keyword, setKeyword] = useState("");
  const [PointList, setPointList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  moment.locale("th");

  const [openAdd, setOpenAdd] = useState(false);
  const [Remark, setRemark] = useState(null);
  const [EmpId, setEmpId] = useState(null);
  const [Point, setPoint] = useState(null);
  const [Sum, setSum] = useState("");
  const [Points, setPoints] = useState(null);
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [openUp, setOpenUp] = useState(false);
  const [messageErr, setMessageErr] = useState("");
  const [ErrList, setErrList] = useState([]);

  const Input = styled("input")({
    display: "none",
  });

  const fetchPointList = async () => {
    try {
      const params = qs.stringify({
        ...(keyword && { keyword }),
      });

      const result = await api.get(`/api/bpoint/employee/point/list?${params}`);
      const _result = result.data.results;
      setPointList(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const Save = async () => {
    setLoading(true);
    const body = {
      Point: parseInt(Point, 10),
      EmpId,
      Remark: !Remark ? null : Remark,
    };
    try {
      const result = await api.post("/api/bpoint/employee/point/add", body);
      setOpen(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
      fetchPointList();
    } catch (error) {
      console.log("error => ", error);
      setLoading(false);
    }
  };

  const Download = async () => {
    try {
      const result = await api({
        url: "api/bpoint/employee/point/example",
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Point_Excel.xlsx");
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const Upload = async () => {
    try {
      const result = await FileUploadService.uploadExcel(files);
      setMessageErr(result.data.message);
      setErrList(result.data.results);
    } catch (error) {
      console.log("Could not upload the file!", error);
      setFiles([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPointList();
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
    setOpenAdd(true);
    setPoints(results.balancePoint);
    setEmpId(results.empId);
    // setRemark(results.)
  };

  const handleSum = (e) => {
    setPoint(e.target.value);
    var point = Points + parseInt(e.target.value, 10);
    if (point) {
      setSum(point);
    } else {
      setSum("");
    }
  };

  const handleFileUpload = (event) => {
    let currentFiles = event.target.files[0];

    setFile(currentFiles);

    event.target.value = null;
  };

  const setFile = (file) => {
    setFiles([...files, file]);
    setOpenUp(true);
  };

  const handleClose = () => {
    setOpenUp(false);
    setPoints("");
    setOpenAdd(false);
    setEmpId(null);
    setPoint(null);
    setSum("");
    setRemark(null);
    setLoading(false);
    setOpen(false);
    setFiles([]);
    setMessageErr("");
    setErrList([]);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} style={{ height: "88vh" }}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Point</p>
          <h3>คะแนนทั้งหมด</h3>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: { sm: "right" }, marginBottom: 2,marginTop:4 }}
            rowSpacing={1}
          >
            <Grid item xs={7} sm={8} lg={9}>
              <Button
                variant="outlined"
                style={{
                  color: "#FF0000",
                  borderColor: "#FF0000",
                  width: 80,
                  marginRight: 20,
                }}
                onClick={() => Download()}
              >
                ดาวน์โหลด
              </Button>
              <label htmlFor="contained-button-file">
                <Input
                  accept="xlsx/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleFileUpload}
                />
                <Button
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "#FF0000",
                    borderColor: "transparent",
                    width: 80,
                    justifyContent: "right",
                  }}
                  component="span"
                >
                  อัปโหลด
                </Button>
              </label>
              <Dialog
                open={openUp}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="xs"
              >
                <DialogContent>
                  <p>{messageErr}</p>
                  {files?.map((x, index) => {
                    return (
                      <p>
                        {index + 1 + "." + " "}
                        {x.name}
                      </p>
                    );
                  })}
                  {ErrList?.length > 0 ? (
                    <div
                      style={{
                        maxHeight: 300,
                        minHeight: 300,
                        overflow: "auto",
                      }}
                    >
                      <table
                        style={{
                          backgroundColor: "#F1F3F9",
                          position: "sticky",
                          top: 0,
                          border: "1px solid #e0e0e0",
                          zIndex: 1,
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        <thead>
                          <tr>
                            <th style={{ width: "50%" }}>ชื่อคอลัมน์</th>
                            <th style={{ width: "50%" }}>สถานะ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ErrList?.map((Data, index) => {
                            return (
                              <tr>
                                <td>{Data.columnName}</td>
                                <td>{Data.statusName}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
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

                  {ErrList?.length > 0 || messageErr ? null : (
                    <Button
                      variant="contained"
                      style={{
                        color: "white",
                        backgroundColor: "#FF0000",
                        borderColor: "transparent",
                        marginRight: 10,
                        width: 80,
                      }}
                      onClick={() => Upload()}
                    >
                      {Loading ? (
                        <CircularProgress
                          sx={{
                            color: "white",
                          }}
                          size={24}
                        />
                      ) : (
                        "ตกลง"
                      )}
                    </Button>
                  )}
                </DialogActions>
              </Dialog>
            </Grid>

            <Grid item xs={7} sm={4} lg={3}>
              <div className={classes.search}>
                <SearchIcon style={{ margin: 10 }} />
                <InputBase
                  multiline
                  fullWidth
                  placeholder="ค้นหา"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>

          <TableContainer sx={{ maxHeight: "56vh", height: "56vh" }}>
            <Table stickyHeader size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">รหัสพนักงาน</StyledTableCell>
                  <StyledTableCell align="center">ชื่อ-สกุล</StyledTableCell>
                  <StyledTableCell align="center">แผนก</StyledTableCell>
                  <StyledTableCell align="center">คะแนนคงเหลือ</StyledTableCell>
                  <StyledTableCell align="center">แก้ไข</StyledTableCell>
                </TableRow>
              </TableHead>
              {PointList.length > 0 ? (
                <TableBody>
                  {(rowsPerPage > 0
                    ? PointList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : PointList
                  ).map((Data, index) => {
                    return (
                      <StyledTableRow key={Data.contentMainId}>
                        <StyledTableCell align="center">
                          {Data.empNo}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {Data.fistName}
                          <span>&nbsp;&nbsp;</span>
                          {Data.lastName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.orgname}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Data.balancePoint}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button
                            variant="contained"
                            style={{
                              color: "white",
                              backgroundColor: "#FF0000",
                              borderColor: "transparent",
                              marginRight: 10,
                              width: 80,
                            }}
                            onClick={() => handleEdit(Data)}
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
            maxWidth="xs"
          >
            <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
              <h3>เพิ่มคะแนน</h3>
            </DialogTitle>
            <DialogContent>
              <div className={classes.Row}>
                <p>คะแนนปัจจุบัน</p>

                <TextField
                  size="small"
                  style={{
                    display: "flex",
                    flexGrow: 1,
                  }}
                  disabled
                  value={Points}
                />
              </div>
              <div className={classes.Row}>
                <p style={{ marginTop: 10 }}>คะแนน</p>

                <TextField
                  type="number"
                  size="small"
                  style={{
                    display: "flex",
                    flexGrow: 1,
                  }}
                  onChange={(e) => handleSum(e)}
                />
              </div>
              <div className={classes.Row}>
                <p style={{ marginTop: 10 }}>ผลรวม</p>

                <TextField
                  disabled
                  size="small"
                  style={{
                    display: "flex",
                    flexGrow: 1,
                  }}
                  value={Sum}
                />
              </div>
              <div className={classes.Row}>
                <p style={{ marginTop: 10 }}>เหตุผล</p>

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
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#FF0000",
                  borderColor: "transparent",
                  marginRight: 10,
                  width: 80,
                }}
                onClick={() => Save()}
              >
                {Loading ? (
                  <CircularProgress
                    sx={{
                      color: "white",
                    }}
                    size={24}
                  />
                ) : (
                  "ตกลง"
                )}
              </Button>
            </DialogActions>
          </Dialog>
          <TablePagination
            rowsPerPageOptions={[15, 45, 105]}
            component="div"
            count={PointList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Dialog
            open={open}
            onClose={handleClose}
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

import React, { useState, useEffect } from "react";
import {
  Paper,
  Checkbox,
  FormControlLabel,
  Button,
  TablePagination,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  TextareaAutosize,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useHistory, useParams, Link } from "react-router-dom";
import api from "../../Component/api/api";
import qs from "qs";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";

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
  width: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    marginTop: 30,
  },
  Padding: {
    paddingTop: "2%",
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingBottom: "2%",
  },
  subject: {
    width: "20%",
  },
  Row: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  dialogPaper: {
    height: "450px",
  },
  menuPaper: {
    maxHeight: 70,
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
const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#FF0000",
    "&:hover": {
      backgroundColor: alpha("#FF0000", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#FF0000",
  },
}));

export default function AddMember() {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const excellId = id;

  const [keyword, setKeyword] = useState("");
  const [EmpList, setEmpList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [Status, setStatus] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [DeletedR, setDeletedR] = useState(true);
  const [ExcellentTitle, setExcellentTitle] = useState("");
  const [Year, setYear] = useState("");
  const [Month, setMonth] = useState("");
  const STY = Year.toString();
  const STM = Month.toString();
  const DateParams = STM + "-" + "02" + "-" + STY;
  const [EmpId, setEmpId] = useState("");
  const [Remark, setRemark] = useState("");
  const [DeletedM, setDeletedM] = useState(false);
  const [ExcellDetailId, setExcellDetailId] = useState("");
  const [RoundList, setRoundList] = useState([]);
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [OpenSuccess, setOpenSuccess] = useState(false);
  const [ExcelNameErr, setExcelNameErr] = useState(false);
  const [YearErr, setYearErr] = useState(false);
  const [MonthErr, setMonthErr] = useState(false);

  const [itemsY, setItemsY] = useState(
    Array.from({ length: 80 }, (_, i) => ({
      value:
        parseInt(
          new Date().getFullYear().toLocaleString("en-US").replace(",", "")
        ) - i,
      label: (
        parseInt(
          new Date().getFullYear().toLocaleString("en-US").replace(",", "")
        ) - i
      ).toString(),
    }))
  );

  const handleRoute = () => {
    history.push("/RoundList");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
    setEmpId("");
    setRemark("");
  };

  const handleChangeEmp = (Data) => {
    setEmpId(Data.empId);
    setFName(Data.fistName);
    setLName(Data.lastName);
  };

  const handleSetMember = () => {
    if (EmpId) {
      setRoundList([
        ...RoundList,
        {
          ExcellDetailId: null,
          EmpId,
          Remark,
          ExcellId: null,
          deleted: DeletedM,
          fistName: FName,
          lastName: LName,
        },
      ]);
    }
    setOpenAdd(false);
    setEmpId("");
    setRemark("");
  };

  const delItems = (emp, checked) => {
    emp.selected = checked;
    setRoundList([...RoundList]);

    // const upDateEmp = RoundList.filter((item) => {
    //   return item.empId !== EmpId;
    // });
  };

  const delStaff = (id, index) => {
    console.log(id);
    const StaffList = [...RoundList];
    const _StaffList = StaffList.find(({ empId }) => empId === id);
    if (id) {
      _StaffList.deleted = true;
      _StaffList.empId = null;
      setRoundList([...RoundList]);
    } else {
      const StaffList = RoundList.filter((_, i) => i !== index);
      setRoundList(StaffList);
    }
  };

  const delStaff2 = (emp, index) => {
    console.log(emp);
    if (emp) {
      emp.deleted = true;
      emp.empId = null;
      setRoundList([...RoundList]);
    } else {
      const StaffList = RoundList.filter((_, i) => i !== index);
      setRoundList(StaffList);
    }
  };

  const handleDeleteAllStaff = () => {
    const selectedEmp = RoundList.filter((x) => x.selected === true);
    // const _selectedEmp = selectedEmp.map((x) => {
    //   return x;
    // });

    // 1. map แบบไม่มี return
    // const _selectedEmp =  selectedEmp.map((x) => ({ ...x, deleted: true }));

    // 2. map แบบมี return
    // selectedEmp.map((x) => {
    //   return { ...x, deleted: true };
    // });

    selectedEmp.forEach((x) => {
      x.deleted = true;
      x.selected = false;
    });

    setRoundList([...RoundList]);

    // setRoundList(selectedEmp);
    // console.log(_selectedEmp);

    // console.log(selectedEmp);

    // console.log(RoundList);

    // const body = selectedEmp.map(x => {
    //   return {...x, deleted: true, selected: undefined}
    // })
    // console.log(body);
  };

  const getFirstAndLastDayOfMonth = () => {
    const Dval = new Date(DateParams);
    const lastDate = new Date(Dval.getFullYear(), Dval.getMonth() + 1, 0);
    const firstDate = new Date(Dval.getFullYear(), Dval.getMonth(), 1);
    if (firstDate && lastDate) {
      console.log(firstDate, lastDate, "Set Value");
    }
    AddRound(firstDate, lastDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExcelNameErr(false);
    setYearErr(false);
    setMonthErr(false);

    if (!ExcellentTitle) {
      setExcelNameErr(true);
    }
    if (!Year) {
      setYearErr(true);
    }
    if (!Month) {
      setMonthErr(true);
    }
  };

  const fetchEmpList = async () => {
    try {
      const params = qs.stringify({
        ...(keyword && { keyword }),
      });

      const result = await api.get(`/api/employee/list?${params}`);
      const _result = result.data.results;
      setEmpList(_result);
      console.log(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchRoundList = async () => {
    try {
      const params = qs.stringify({
        ...(excellId && { excellId }),
      });

      const result = await api.get(`/api/excellent/head/list?${params}`);
      const _result = result.data.results[0];
      setRoundList(_result.staffList);
      setExcellentTitle(_result.excellentTitle);
      setYear(_result.year);
      setMonth(_result.month);
      setDeletedR(_result.deleted === false ? true : false);
      console.log(result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const AddRound = async (F, L) => {
    const _excellId = id === undefined ? null : id;
    const First = moment(F).format("YYYY-MM-DD");
    const Last = moment(L).format("YYYY-MM-DD");
    if (ExcelNameErr === false || YearErr === false || MonthErr === false) {
      try {
        const result = await api.post("api/excellent/head/add", {
          ExcellId: _excellId,
          ExcellentTitle,
          StartDate: First,
          EndDate: Last,
          Status: null,
          Deleted: DeletedR === false ? true : false,
        });
        setOpenSuccess(true);
        setTimeout(() => {
          history.push(`/RoundList`);
        }, 2000);

        AddMember(result.data.results);
        console.log(result);
      } catch (error) {
        console.log("error => ", error);
      }
    }
  };
  const AddMember = async (RoundId) => {
    // const _ExcellDetailId= ExcellDetailId===undefined?null:id
    const updateMembers = RoundList.map((M) =>
      M.ExcellId === null ? { ...M, ExcellId: RoundId } : M
    );

    if (RoundId) {
      try {
        const result = await api.post(
          "api/excellent/detail/add",
          updateMembers
        );
        setOpenSuccess(true);
        setTimeout(() => {
          history.push(`/RoundList`);
        }, 2000);
        console.log("result", result);
      } catch (error) {
        console.log("error => ", error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchEmpList();
      fetchRoundList();
    } else {
      history.push("/login");
    }
  }, [keyword]);

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Paper elevation={1} style={{ height: "88vh" }}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-360</p>
          <h3>เพิ่มพนักงานดีเด่น</h3>
          <div className={classes.width}>
            <p className={classes.subject}>ชื่อรอบ</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                // placeholder=""
                onChange={(e) => setExcellentTitle(e.target.value)}
                value={ExcellentTitle}
                required
                error={ExcelNameErr}
              />
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>ปี</p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <FormControl size="small">
                <Select
                  value={Year}
                  onChange={(e) => setYear(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disableUnderline
                  MenuProps={{ classes: { paper: classes.menuPaper } }}
                  required
                  error={YearErr}
                >
                  {itemsY.map((Y) => (
                    <MenuItem value={Y.value}>{Y.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>เดือน</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <FormControl size="small">
                <Select
                  value={Month}
                  onChange={(e) => setMonth(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disableUnderline
                  required
                  error={MonthErr}
                >
                  <MenuItem value={"0" + 1}>มกราคม</MenuItem>
                  <MenuItem value={"0" + 2}>กุมภาพันธ์</MenuItem>
                  <MenuItem value={"0" + 3}>มีนาคม</MenuItem>
                  <MenuItem value={"0" + 4}>เมษายน</MenuItem>
                  <MenuItem value={"0" + 5}>พฤษภาคม</MenuItem>
                  <MenuItem value={"0" + 6}>มิถุนายน</MenuItem>
                  <MenuItem value={"0" + 7}>กรกฎาคม</MenuItem>
                  <MenuItem value={"0" + 8}>สิงหาคม</MenuItem>
                  <MenuItem value={"0" + 9}>กันยายน</MenuItem>
                  <MenuItem value={10}>ตุลาคม</MenuItem>
                  <MenuItem value={11}>พฤศจิกายน</MenuItem>
                  <MenuItem value={12}>ธันวาคม</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>สถานะ</p>

            <GreenSwitch
              checked={DeletedR}
              onChange={(e) => setDeletedR(e.target.checked)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            <Button
              variant="outlined"
              style={{
                color: "#FF0000",
                borderColor: "#FF0000",
                marginRight: 10,
                padding: 10,
                width: 120,
              }}
              onClick={handleDeleteAllStaff}
            >
              - ลบที่เลือก
            </Button>

            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "#FF0000",
                borderColor: "transparent",
                marginRight: 10,
                padding: 10,
                width: 120,
              }}
              onClick={() => handleClickOpen()}
            >
              + เพิ่มพนักงาน
            </Button>
            <Dialog
              open={openAdd}
              onClose={handleClose}
              fullWidth={true}
              maxWidth="xs"
              classes={{ paper: classes.dialogPaper }}
            >
              <DialogTitle
                style={{ display: "flex", justifyContent: "center" }}
              >
                <h3>เพิ่มพนักงาน</h3>
              </DialogTitle>
              <DialogContent>
                <div className={classes.Row}>
                  <p>ค้นหาพนักงาน</p>
                  <div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Autocomplete
                        style={{ flexGrow: 1 }}
                        disablePortal
                        id="Emp"
                        options={EmpList.filter(
                          ({ empId }) =>
                            !RoundList.map((x) => x.empId).includes(empId)
                        )}
                        sx={{ width: 350 }}
                        getOptionLabel={(option) => {
                          //filter value
                          return `${option.empNo}: ${option.fistName} ${option.lastName}`;
                        }}
                        onChange={(e, newValue) => {
                          if (newValue) {
                            handleChangeEmp(newValue);
                          } else {
                            setEmpId("");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            placeholder="เพิ่มบุคคล"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className={classes.Row}>
                  <p>เหตุผล</p>

                  <div
                    style={{
                      display: "flex",
                      flexGrow: 1,
                    }}
                  >
                    <TextareaAutosize
                      aria-label="minimum height"
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
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    color: "black",
                    borderColor: "transparent",
                    backgroundColor: "#F8F9FA",
                    padding: 10,
                    marginRight: 10,
                    width: 80,
                  }}
                  onClick={handleClose}
                >
                  ยกเลิก
                </Button>
                <Button
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "#FF0000",
                    borderColor: "transparent",
                    padding: 10,
                    marginRight: 10,
                    width: 80,
                  }}
                  onClick={handleSetMember}
                >
                  ตกลง
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <TableContainer sx={{ maxHeight: "20vh", height: "20vh" }}>
            <Table stickyHeader size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center">ชื่อ</StyledTableCell>
                  <StyledTableCell align="center">หมายเหตุ</StyledTableCell>
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
                  )
                    .filter((x) => x.deleted === false)
                    .map((Data, index) => {
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="center">
                            <FormControlLabel
                              style={{
                                width: 50,
                              }}
                              control={
                                <Checkbox
                                  sx={{
                                    color: "#FF0000",
                                    "&.Mui-checked": {
                                      color: "#FF0000",
                                    },
                                  }}
                                  id={"chkEmp" + index}
                                  name={"chkEmp" + index}
                                  // name={Data}
                                  checked={Data?.selected}
                                  onChange={(e) =>
                                    delItems(Data, e.target.checked)
                                  }
                                />
                              }
                              label=""
                              // checked={IsPublic}
                              // onChange={handleCheckBoxPublic}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {Data.fistName}
                            <span>&nbsp;&nbsp;</span>
                            {Data.lastName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {Data.remark}
                          </StyledTableCell>

                          <StyledTableCell
                            align="center"
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              style={{
                                borderWidth: 0,
                                backgroundColor: "transparent",
                              }}
                            >
                              <span
                                class="material-icons"
                                style={{
                                  color: "#FF0000",
                                  fontSize: 25,
                                }}
                                onClick={() => delStaff(Data.empId, index)}
                                // onClick={() => delStaff2(Data, index)}
                              >
                                cancel
                              </span>
                            </Button>
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
          <div
            style={{
              width: "70%",
              paddingLeft: "14%",
              marginTop: 45,
            }}
          >
            <Button
              variant="contained"
              style={{
                color: "black",
                backgroundColor: "#F8F9FA",
                borderColor: "transparent",
                marginRight: 10,
                padding: 10,
                width: 120,
              }}
              onClick={handleRoute}
            >
              กลับ
            </Button>

            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "#FF0000",
                borderColor: "transparent",
                marginRight: 10,
                padding: 10,
                width: 120,
              }}
              onClick={() => getFirstAndLastDayOfMonth()}
              type="submit"
            >
              บันทึก
            </Button>
            <Dialog
              open={OpenSuccess}
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
        </div>
      </Paper>
    </form>
  );
}

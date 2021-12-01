import React, { useState, useEffect } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Autocomplete, Paper, TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import qs from "qs";
import api from "../../Component/api/api";
import { useHistory } from "react-router-dom";
import "./Report.css";

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
  input: {
    padding: 10,
    margin: 5,
  },
}));

export default function ReportExcel() {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const history = useHistory();

  const [LoadingSearch, setLoadingSearch] = useState(false);
  const [LoadingData, setLoadingData] = useState(true);
  const [ReportList, setReportList] = useState([]);
  const [sdate, setSdate] = useState(null);
  const [edate, setEdate] = useState(null);
  const [EmpId, setEmpId] = useState("");
  const [keyword, setkeyword] = useState("");
  const [EmpList, setEmpList] = useState([]);

  const fetchReportList = async () => {
    setLoadingData(true);
    setLoadingSearch(true);
    try {
      const params = qs.stringify({
        ...(sdate && { sdate }),
        ...(edate && { edate }),
        ...(EmpId && { EmpId }),
        ...(keyword && { keyword }),
      });

      const result = await api.get(`/api/breport/point/data?${params}`);
      const _result = result.data.results;
      setReportList(_result);
      setLoadingData(false);
      setLoadingSearch(false);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const Download = async () => {
    try {
      const params = qs.stringify({
        ...(sdate && { sdate }),
        ...(edate && { edate }),
        ...(EmpId && { EmpId }),
        ...(keyword && { keyword }),
      });

      const result = await api({
        url: `/api/breport/point/excel?${params}`,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.xlsx");
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchEmpList = async () => {
    try {
      const result = await api.get("/api/employee/list?");
      const _result = result.data.results;
      setEmpList(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchReportList();
      fetchEmpList();
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <div className={classes.root}>
      <Paper elevation={1} style={{ height: "88vh" }}>
        <div
          style={{
            width: "100%",
            padding: 20,
            display: "flex",
            flexDirection: "row",
          }}
          className={classes.wrapRow}
        >
          <table
            id="table_Button"
            style={{
              border: "1px solid #e0e0e0",
              width: "100%",
              minWidth: "100%",
              height: "83vh",
            }}
          >
            <td
              style={{
                border: "1px solid #e0e0e0",
                width: "15%",
              }}
            >
              <tr
                style={{
                  borderBottom: "1px solid #e0e0e0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    margin: 10,
                    fontSize: 18,
                  }}
                >
                  ตัวกรอง
                </span>
              </tr>
              <tr>
                <div className={classes.input}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="วันที่เริ่ม"
                      inputFormat="dd-MM-yyyy"
                      value={sdate}
                      onChange={(newValue) => {
                        setSdate(moment(newValue).format("YYYY-MM-DD"));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </tr>
              <tr>
                <div className={classes.input}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="วันที่สิ้นสุด"
                      inputFormat="dd-MM-yyyy"
                      value={edate}
                      onChange={(newValue) => {
                        setEdate(moment(newValue).format("YYYY-MM-DD"));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </tr>
              <tr>
                <div className={classes.input}>
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="Emp"
                    options={EmpList}
                    sx={{ width: "100%" }}
                    getOptionLabel={(option) => {
                      //filter value
                      return `${option.fistName} ${option.lastName}`;
                    }}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setEmpId(newValue.empId);
                      } else {
                        setEmpId("");
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="ชื่อพนักงาน"
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </div>
              </tr>
              <tr>
                <div className={classes.input}>
                  <TextField
                    size="small"
                    placeholder="คำสำคัญ"
                    onChange={(e) => setkeyword(e.target.value)}
                    value={keyword}
                  />
                </div>
              </tr>
              <tr>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    style={{
                      color: "#FF0000",
                      width: 210,
                      borderColor: "#FF0000",
                      margin: 5,
                    }}
                    onClick={() => fetchReportList()}
                  >
                    {LoadingSearch ? (
                      <CircularProgress color="error" size={25} />
                    ) : (
                      "ค้นหา"
                    )}
                  </Button>
                </td>
              </tr>
            </td>
            <td>
              <tr
                style={{
                  borderBottom: "1px solid #e0e0e0",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "#FF0000",
                    borderColor: "transparent",
                    width: 80,
                  }}
                  onClick={() => Download()}
                >
                  ดาวน์โหลด
                </Button>
              </tr>
              <tr>
                <div className="containerTable">
                  {ReportList?.length > 0 ? (
                    <table id="report" className="table">
                      <thead
                        style={{
                          backgroundColor: "#F1F3F9",
                          position: "sticky",
                          top: 0,
                          zIndex: 1,
                          textAlign: "center",
                        }}
                      >
                        <tr>
                          <th className="layoutTable">#</th>
                          <th className="layoutTable2">วันที่</th>
                          <th className="layoutTable3">ชื่อ-นามสกุล</th>
                          <th className="layoutTable4">รายละเอียด</th>
                          <th className="layoutTable2">คะแนน</th>
                          <th className="layoutTable2">คะแนนคงเหลือ</th>
                        </tr>
                      </thead>

                      <tbody style={{ textAlign: "center" }}>
                        {LoadingData ? (
                          <CircularProgress
                            color="error"
                            size={25}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              width: "100%",
                              marginTop: 20,
                            }}
                          />
                        ) : (
                          ReportList.map((ReportData, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {moment(ReportData.createDate).format(
                                    "DD-MM-YYYY"
                                  )}
                                </td>
                                <td>
                                  {ReportData.empFirstname}
                                  <span>&nbsp;&nbsp;</span>
                                  {ReportData.empLastname}
                                </td>
                                <td>{ReportData.description}</td>
                                <td>{ReportData.point}</td>
                                <td>{ReportData.balancePoint}</td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: 20,
                      }}
                    >
                      Not found
                    </p>
                  )}
                </div>
              </tr>
            </td>
          </table>
        </div>
      </Paper>
    </div>
  );
}

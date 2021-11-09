import React, { useState, useEffect } from "react";
import { Paper, Dialog, DialogContent, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useHistory, useParams } from "react-router-dom";
import qs from "qs";
import api from "../../Component/api/api";
import { useDropzone } from "react-dropzone";
import png from "../../images/png.png";
import doc from "../../images/doc.png";
import jpg from "../../images/jpg.png";
import pdf from "../../images/pdf.png";
import xls from "../../images/xls.png";
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
    width: "20%",
    marginRight: 20,
  },
  Padding: {
    paddingTop: "2%",
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingBottom: "2%",
  },
  widthInput: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    marginTop: 50,
  },
  subject: {
    width: "20%",
  },
  imgFileType: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  dialogPaper: {
    height: "380px",
  },
  Row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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

export default function EditUser() {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const empId = id;

  const [EmpNo, setEmpNo] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [DepartmentId, setDepartmentId] = useState("");
  const [Orgname, setOrgname] = useState("");
  const [RoleList, setRoleList] = useState([]);
  const [RoleId, setRoleId] = useState("");
  const [FileId, setFileId] = useState("");
  const [Status, setStatus] = useState(true);
  const [open, setOpen] = useState(false);
  const [Path, setPath] = useState("");
  const [ShowInput, setShowInput] = useState(false);
  console.log(FileId);
  const [Files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    // accept: "image/*",
    onDrop: async (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      const _files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      try {
        const result = await FileUploadService.upload(_files);
        const _result = result.data.results.fileId;
        setFileId(_result);
        console.log(result);
      } catch (error) {
        console.log("Could not upload the file!");
        setFiles([]);
      }
    },
  });

  const Del = (index) => {
    console.log(index);
    setFiles([]);
    setFileId(null);
    setPath("");
    // const filteredArray = Files.filter((_, i) => i !== index);
    // setFiles(filteredArray);
  };

  const images = Files.map((file, index) => (
    <div key={index} className={classes.Row}>
      {console.log(file.type)}

      {/* <img src={file.preview} style={{ width: "150px" }} alt="preview" /> */}
      {file.type == "image/png" ? (
        <img className={classes.imgFileType} src={png} alt="png" />
      ) : file.type == "text/plain" ? (
        <img className={classes.imgFileType} src={doc} alt="doc" />
      ) : file.type == "image/jpeg" ? (
        <img className={classes.imgFileType} src={jpg} alt="jpg" />
      ) : file.type == "application/pdf" ? (
        <img className={classes.imgFileType} src={pdf} alt="pdf" />
      ) : file.type == "application/vnd.ms-excel" ? (
        <img className={classes.imgFileType} src={xls} alt="xls" />
      ) : (
        <img className={classes.imgFileType} src={png} alt="etc" />
      )}
      <div className={classes.Row}>
        {file.name}
        <button
          style={{
            borderWidth: 0,
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            class="material-icons-outlined"
            onClick={() => Del()}
            style={{ color: "#FF0000" }}
          >
            delete
          </span>
        </button>
      </div>
    </div>
  ));

  const handleRoute = () => {
    history.push("/AllUser");
  };

  const fetchEmpData = async () => {
    try {
      const params = qs.stringify({
        ...(empId && { empId }),
      });

      const result = await api.get(
        `/api/employee/list?${params}`
      );
      const _result = result.data.results[0];
      setEmpNo(_result.empNo);
      setFirstName(_result.fistName);
      setLastName(_result.lastName);
      setDepartmentId(_result.departmentId);
      setOrgname(_result.orgname);
      setRoleId(_result.roleId);
      setFileId(_result.fileId);
      setStatus(_result.status);
      setPath(_result.path);
      console.log(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const roleData = async () => {
    try {
      const result = await api.get("api/setting/role/list");
      const _result = result.data.results;
      setRoleList(_result);
      console.log(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const save = async () => {
    const EmpId = id;
    const FistName = FirstName;
    console.log(
      EmpId,
      EmpNo,
      FistName,
      LastName,
      DepartmentId,
      Orgname,
      RoleId,
      FileId,
      Status
    );
    try {
      const result = await api.post("api/employee/update", {
        EmpId,
        EmpNo,
        FistName,
        LastName,
        DepartmentId,
        Orgname,
        RoleId,
        FileId,
        Status,
      });
      setOpen(true);
      setTimeout(() => {
        history.push(`/AllUser`);
      }, 2000);
      console.log(result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEmpData();
      roleData();
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Admin</p>
          <h3>แก้ไขผู้ใช้</h3>
          <div className={classes.widthInput}>
            <p className={classes.subject}>รหัสพนักงาน</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="รหัสพนักงาน"
                onChange={(e) => setEmpNo(e.target.value)}
                value={EmpNo}
              />
            </div>
          </div>

          <div className={classes.widthInput}>
            <p className={classes.subject}>ชื่อ</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="ชื่อ"
                onChange={(e) => setFirstName(e.target.value)}
                value={FirstName}
              />
            </div>
          </div>
          <div className={classes.widthInput}>
            <p className={classes.subject}>นามสกุล</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="นามสกุล"
                onChange={(e) => setLastName(e.target.value)}
                value={LastName}
              />
            </div>
          </div>
          <div className={classes.widthInput}>
            <p className={classes.subject}>บทบาท</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <FormControl size="small">
                <Select
                  value={RoleId}
                  onChange={(e) => setRoleId(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disableUnderline
                >
                  {RoleList.map((Role) => (
                    <MenuItem value={Role.roleId}>{Role.roleName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.widthInput}>
            <p className={classes.subject}>แผนก</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="แผนก"
                onChange={(e) => setOrgname(e.target.value)}
                value={Orgname}
              />
            </div>
          </div>
          <div className={classes.widthInput}>
            <p className={classes.subject}>รูปภาพ</p>
            <div>
              {Path && !ShowInput ? (
                <div className={classes.Row}>
                  <img
                    src={Path}
                    alt=""
                    className="image"
                    style={{ maxWidth: 150, maxHeight: 150 }}
                  />
                  <div className={classes.Row} style={{ marginLeft: 30 }}>
                    <button
                      style={{
                        borderWidth: 0,
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        class="material-icons-outlined"
                        onClick={() => Del()}
                        style={{ color: "#FF0000" }}
                      >
                        delete
                      </span>
                    </button>
                    <button
                      style={{
                        borderWidth: 0,
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        class="material-icons-outlined"
                        onClick={() => setShowInput(true)}
                      >
                        upgrade
                      </span>
                    </button>
                  </div>
                </div>
              ) : null}

              {Path && !ShowInput ? null : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {Files.length > 0 || !Path ? null : (
                    <button
                      style={{
                        borderWidth: 0,
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: "start",
                      }}
                    >
                      <span
                        class="material-icons-outlined"
                        style={{ color: "#FF0000" }}
                        onClick={() => setShowInput(false)}
                      >
                        reply
                      </span>
                    </button>
                  )}
                  <div {...getRootProps()}>
                    <input
                      {...getInputProps()}
                      // type="file"
                    />
                    {Files.length > 0 ? (
                      <div>{images}</div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            border: "4px dotted #FF0000 ",
                            width: 150,
                            height: 150,
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{ color: "#FF0000", fontSize: 50 }}
                            class="material-icons-outlined"
                          >
                            add
                          </span>
                        </div>
                        <span style={{ color: "gray" }}>
                          รูปภาพ 512 x 512 พิกเซล
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={classes.widthInput}>
            <p className={classes.subject}>สถานะ</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <GreenSwitch
                checked={Status}
                onChange={(e) => setStatus(e.target.checked)}
              />
            </div>
          </div>
          <div
            style={{
              width: "70%",
              paddingLeft: "14%",
              marginTop: 50,
            }}
          >
            <Button
              variant="contained"
              style={{
                color: "black",
                backgroundColor: "#F8F9FA",
                borderColor: "transparent",
                marginRight: 10,
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
                width: 120,
              }}
              onClick={() => save()}
            >
              บันทึก
            </Button>
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
        </div>
      </Paper>
    </div>
  );
}

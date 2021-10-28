import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  TextareaAutosize,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
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
  width: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
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

export default function AddLink() {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const BconnectID = id;

  const [TypeConnectID, setTypeConnectID] = useState("");
  const [BconnectName, setBconnectName] = useState("");
  const [url, setURL] = useState("");
  const [FileId, setFileId] = useState(null);
  const [Deleted, setDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [TypeConnectList, setTypeConnectList] = useState([]);
  const [ShowInput, setShowInput] = useState(false);
  const [Path, setPath] = useState("");

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

  const fetchBconnectList = async () => {
    try {
      const params = qs.stringify({
        ...(BconnectID && { BconnectID }),
      });

      const result = await api.get(
        `${process.env.REACT_APP_BASE_API_DEV}api/bconnect/list?${params}`
      );
      const _result = result.data.results[0];
      setBconnectName(_result.bconnectName);
      setURL(_result.url);
      setTypeConnectID(_result.typeConnectID);
      setPath(_result.path);
      setFileId(_result.fileId);
      console.log(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchTypConnectList = async () => {
    try {
      const params = qs.stringify({
        TypeConnect: true,
      });

      const result = await api.get(
        `${process.env.REACT_APP_BASE_API_DEV}api/master/list?${params}`
      );
      const _result = result.data.results.typeConnect;
      setTypeConnectList(_result);
      console.log(result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const save = async () => {
    const BconnectID = undefined ? null : id;
    const URL = url;
    try {
      const result = await api.post("api/bconnect/add", {
        BconnectID,
        BconnectName,
        URL,
        TypeConnectID,
        FileId,
        Deleted,
      });
      setOpen(true);
      setTimeout(() => {
        history.push(`/AllLink`);
      }, 2000);
      console.log(result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTypConnectList();
      if (BconnectID) {
        fetchBconnectList();
      }
    } else {
      history.push("/login");
    }
  }, []);

  const handleRoute = () => {
    history.push("/AllLink");
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Connect</p>
          <h3>เพิ่มลิงค์ใหม่</h3>
          <div className={classes.width}>
            <p className={classes.subject}>ชื่อหัวข้อ</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="ปฏิทินทำงาน ปีพศ. 2564"
                onChange={(e) => setBconnectName(e.target.value)}
                value={BconnectName}
              />
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>ไอคอน</p>
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
          <div className={classes.width}>
            <p className={classes.subject}>กลุ่ม</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <FormControl size="small">
                <Select
                  value={TypeConnectID}
                  onChange={(e) => setTypeConnectID(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disableUnderline
                >
                  {TypeConnectList.map((Type) => (
                    <MenuItem value={Type.typeConnectID}>
                      {Type.typeConnectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className={classes.width}>
            <p className={classes.subject}>ลิงค์ปลายทาง</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                placeholder="https://s3-ap-southeast-1.amazonaws.com/share.mybtmt.com
                /files/BTMT-Working-Calendar-2021-for-Line-36hr.pdf"
                style={{ flexGrow: 1, borderColor: "#dbdbdb" }}
                onChange={(e) => setURL(e.target.value)}
                value={url}
              />
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>ใช้งาน</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <GreenSwitch
                checked={Deleted}
                onChange={(e) => setDeleted(e.target.checked)}
              />
            </div>
          </div>
          <div
            style={{
              width: "70%",
              paddingLeft: "14%",
              marginTop: 50,
              display: "flex",
              flexDirection: "row",
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
            {/* <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexGrow: 1,
              }}
            >
              <Button
                onClick={() => setDeleted(true)}
                variant="contained"
                style={{
                  color: "black",
                  backgroundColor: "#F8F9FA",
                  borderColor: "transparent",
                  marginRight: 10,
                  width: 120,
                }}
              >
                ลบ
              </Button>
              <Dialog open={Deleted} onClose={handleClose}>
                <DialogTitle>ต้องการลบ {BconnectName}?</DialogTitle>
                <DialogActions>
                  <Button onClick={() => save()}>ตกลง</Button>
                  <Button onClick={handleClose}>ยกเลิก</Button>
                </DialogActions>
              </Dialog>
            </div> */}
          </div>
        </div>
      </Paper>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  TextareaAutosize,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
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
  Padding: {
    paddingTop: "2%",
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingBottom: "2%",
    maxHeight: "88vh",
    overflow: "auto",
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
  const [Deleted, setDeleted] = useState(true);
  const [open, setOpen] = useState(false);
  const [TypeConnectList, setTypeConnectList] = useState([]);
  const [ShowInput, setShowInput] = useState(false);
  const [Path, setPath] = useState("");
  const [NameErr, setNameErr] = useState(false);
  const [GroupErr, setGroupErr] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Seq, setSeq] = useState(0);

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
      } catch (error) {
        console.log("Could not upload the file!");
        setFiles([]);
      }
    },
  });

  const Del = (index) => {
    setFiles([]);
    setFileId(null);
    setPath("");
    // const filteredArray = Files.filter((_, i) => i !== index);
    // setFiles(filteredArray);
  };

  const images = Files.map((file, index) => (
    <div key={index} className={classes.Row}>

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

      const result = await api.get(`/api/bconnect/list?${params}`);
      const _result = result.data.results[0];
      setBconnectName(_result.bconnectName);
      setURL(_result.url);
      setTypeConnectID(_result.typeConnectID);
      setPath(_result.path);
      setFileId(_result.fileId);
      setDeleted(_result.deleted === false ? true : false);
      setSeq(_result.seq);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchTypConnectList = async () => {
    try {
      const params = qs.stringify({
        TypeConnect: true,
      });

      const result = await api.get(`/api/master/list?${params}`);
      const _result = result.data.results.typeConnect;
      setTypeConnectList(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const save = async () => {
    setLoading(true);
    const BId = BconnectID === undefined ? null : id;
    const URL = url;
    try {
      const result = await api.post("api/bconnect/add", {
        BconnectID: BId,
        BconnectName,
        URL,
        TypeConnectID,
        FileId,
        Deleted: Deleted === false ? true : false,
        Seq: parseInt(Seq, 10),
      });
      setOpen(true);
      setTimeout(() => {
        history.push(`/AllLink`);
      }, 2000);
    } catch (error) {
      console.log("error => ", error);
      setLoading(false);
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

  const handleSubmit = (e) => {
    setNameErr(false);
    setGroupErr(false);

    if (!BconnectName) {
      setNameErr(true);
    }
    if (!TypeConnectID) {
      setGroupErr(true);
    }
    if (BconnectName && TypeConnectID) {
      save();
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Connect</p>
          <h3>เพิ่มลิงค์ใหม่</h3>
          <Grid container sx={{ marginBottom: 5, marginTop: 5 }}>
            <Grid item xs={12} sm={2.5} lg={2}>
              <p>ชื่อหัวข้อ</p>
            </Grid>
            <Grid item xs={12} sm={9.5} lg={7}>
              <TextField
                sx={{ width: "100%" }}
                size="small"
                onChange={(e) => setBconnectName(e.target.value)}
                value={BconnectName}
                required
                error={NameErr}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: 5, marginTop: 5 }}>
            <Grid item xs={12} sm={2.5} lg={2}>
              <p>ไอคอน</p>
            </Grid>
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
          </Grid>
          <Grid container sx={{ marginBottom: 5, marginTop: 5 }}>
            <Grid item xs={12} sm={2.5} lg={2}>
              <p>กลุ่ม</p>
            </Grid>
            <Grid item xs={12} sm={9.5} lg={7}>
              <FormControl size="small" sx={{ width: "100%" }}>
                <Select
                  value={TypeConnectID}
                  onChange={(e) => setTypeConnectID(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disableUnderline
                  required
                  error={GroupErr}
                >
                  {TypeConnectList.map((Type) => (
                    <MenuItem value={Type.typeConnectID}>
                      {Type.typeConnectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container sx={{ marginBottom: 5, marginTop: 5 }}>
            <Grid item xs={12} sm={2.5} lg={2}>
              <p>ลิงค์ปลายทาง</p>
            </Grid>
            <Grid item xs={12} sm={9.5} lg={7}>
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
                  // sx={{ flexGrow: 1, borderColor: "#dbdbdb" }}
                  onChange={(e) => setURL(e.target.value)}
                  value={url}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: 5, marginTop: 5 }}>
            <Grid item xs={12} sm={2.5} lg={2}>
              <p>ใช้งาน</p>
            </Grid>
            <Grid item xs={12} sm={9.5} lg={7}>
              <GreenSwitch
                checked={Deleted}
                onChange={(e) => setDeleted(e.target.checked)}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginBottom: 5 }}>
            <Grid item xs={12} sm={2.5} lg={2} />

            <Grid item xs={12} sm={9.5} lg={6}>
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
                onClick={() => handleSubmit()}
                type="submit"
              >
                {Loading ? (
                  <CircularProgress
                    sx={{
                      color: "#FFFFFF",
                    }}
                    size={24}
                  />
                ) : (
                  "บันทึก"
                )}
              </Button>
            </Grid>
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
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

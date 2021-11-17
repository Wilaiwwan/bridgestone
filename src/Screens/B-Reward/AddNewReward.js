import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
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
    maxHeight: "88vh",
    overflow: "auto",
  },
  subject: {
    width: "20%",
  },
  imgFileType: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  Row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  dialogPaper: {
    height: "380px",
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
export default function AddNewReward() {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const itemId = id;

  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [ItemName, setItemName] = useState("");
  const [GroupItemId, setGroupItemId] = useState(null);
  const [Point, setPoint] = useState(0);
  const [Stock, setStock] = useState("");
  const [Description, setDescription] = useState(null);
  const [FileId, setFileId] = useState(null);
  const [Status, setStatus] = useState(true);
  const [Deleted, setDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [ShowInput, setShowInput] = useState(false);
  const [Path, setPath] = useState(null);
  const [ItemNameErr, setItemNameErr] = useState(false);
  const [PointErr, setPointErr] = useState(false);
  const [Loading, setLoading] = useState(false);

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

  const save = async () => {
    setLoading(true);
    const _ItemId = itemId === undefined ? null : id;
    try {
      const result = await api.post("api/breward/add", {
        ItemId: _ItemId,
        ItemName,
        GroupItemId,
        Point,
        Stock,
        StartDate,
        EndDate,
        Description,
        FileId,
        Status,
        Deleted,
      });
      setOpen(true);
      setTimeout(() => {
        history.push(`/AllReward`);
      }, 2000);
      console.log(result);
    } catch (error) {
      console.error("error => ", error);
      setLoading(false);
    }
  };

  const Del = (index) => {
    setFiles([]);
    setFileId(null);
    setPath("");
    // const filteredArray = Files.filter((_, i) => i !== index);
    // setFiles(filteredArray);
  };

  const fetchBRewardList = async () => {
    try {
      const params = qs.stringify({
        isBackend: true,
        ...(itemId && { itemId }),
      });

      const result = await api.get(`/api/bpoint/item/list?${params}`);
      const _result = result.data.results[0];
      setItemName(_result.itemName);
      setGroupItemId(_result.groupItemId);
      setPoint(_result.point);
      setStock(_result.stock);
      setStartDate(_result.startDate);
      setEndDate(_result.endDate);
      setFileId(_result.fileId);
      setStatus(_result.status);
      setPath(_result.path);
      setDescription(_result.description);

      console.log(result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    if (token) {
      if (itemId) {
        fetchBRewardList();
      }
    } else {
      history.push("/login");
    }
  }, []);

  const handleRoute = () => {
    history.push("/AllReward");
  };

  const handleSave = (e) => {
    setItemNameErr(false);
    setPointErr(false);

    if (!ItemName) {
      setItemNameErr(true);
    }
    if (!Point) {
      setPointErr(true);
    }
    if (ItemName && Point) {
      save();
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} style={{ height: "88vh" }}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Reward</p>
          <h3>เพิ่มของรางวัลใหม่</h3>
          <div className={classes.width}>
            <p className={classes.subject}>ชื่อของรางวัล</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                onChange={(e) => setItemName(e.target.value)}
                value={ItemName}
                required
                error={ItemNameErr}
              ></TextField>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>รูปของรางวัล</p>
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
                          รูปภาพ 1920x700 พิกเซล
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={classes.width}>
            <p className={classes.subject}>จำนวนของรางวัลในคลัง</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                type="number"
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              ></TextField>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>รายละเอียด</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                // placeholder="15"
                onChange={(e) => setDescription(e.target.value)}
                value={Description}
              ></TextField>
            </div>
          </div>

          <div className={classes.width}>
            <p className={classes.subject}>คะแนนแลก</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="1500"
                onChange={(e) => setPoint(e.target.value)}
                value={Point}
                type="number"
                required
                error={PointErr}
              />
              <span style={{ color: "gray" }}>
                จำนวนคะแนนเพื่อใช้แลกของรางวัล
              </span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>วันที่เริ่ม</p>
            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  // label="Basic example"
                  value={StartDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>วันที่สิ้นสุด</p>
            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  // label="Basic example"
                  value={EndDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className={classes.width}>
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
              onClick={() => handleSave()}
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

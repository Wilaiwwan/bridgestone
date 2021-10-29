import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Paper,
  InputBase,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogContent,
  Autocomplete,
  Stack,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./information.css";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useDropzone } from "react-dropzone";
import { useHistory, useParams } from "react-router-dom";
import qs from "qs";
import api from "../../Component/api/api";
import png from "../../images/png.png";
import doc from "../../images/doc.png";
import jpg from "../../images/jpg.png";
import pdf from "../../images/pdf.png";
import xls from "../../images/xls.png";
import FileUploadService from "../../Services/FileUploadService";
import { height } from "@mui/system";

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
    // alignItems: "center",
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
  Row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  dialogPaper: {
    height: "380px",
  },
}));

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    xhr.open(
      "POST",
      `${process.env.REACT_APP_BASE_API_DEV}/api/upload/file`,
      true
    );
    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    xhr.responseType = "json";
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      console.log(response);
      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      resolve({
        default: response?.results?.path,
      });
    });

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest(file) {
    // Prepare the form data.
    const data = new FormData();

    data.append("file_upload", file);

    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    this.xhr.send(data);
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  //   "label + &": {
  //     marginTop: theme.spacing(3),
  //   },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
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

export default function Information() {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const ContentMainId = id;

  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [ShowInput, setShowInput] = useState(false);
  const [FileId, setFileId] = useState("");
  const [Path, setPath] = useState("");
  const [ContentTitle, setContentTitle] = useState("");
  const [CatalogyId, setCatalogyId] = useState("");
  const [SubCatalogyId, setSubCatalogyId] = useState("");
  const [isHighlight, setisHighlight] = useState(Boolean);
  const [TypeContentId, setTypeContentId] = useState("");
  const [GalleryFileId, setGalleryFileId] = useState("");
  const [Point, setPoint] = useState("");
  const [TextShort, setTextShort] = useState("");
  const [Detail, setDetail] = useState("");
  const [UrlLink, setUrlLink] = useState("");
  const [Deleted, setDeleted] = useState(Boolean);
  const [IsPublic, setIsPublic] = useState(Boolean);
  const [EmployeesAccess, setEmployeesAccess] = useState([]);
  const [RolesAccess, setRolesAccess] = useState([]);
  const [Status, setStatus] = useState(true);
  const [TypeContentList, setTypeContentList] = useState([]);
  const [CatalogyList, setCatalogyList] = useState([]);
  const [empId, setEmpId] = useState("");
  const [EmpList, setEmpList] = useState([]);
  const [RoleList, setRoleList] = useState([]);

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

  const fetchAdminContentList = async () => {
    console.log(ContentMainId);
    try {
      const params = qs.stringify({
        ...(ContentMainId && { ContentMainId }),
      });

      const result = await api.get(
        `${process.env.REACT_APP_BASE_API_DEV}api/admin/content/list?${params}`
      );
      const _result = result.data.results[0];
      setContentTitle(_result.contentTitle);
      setCatalogyId(_result.catalogyId);
      setSubCatalogyId(_result.subCatalogyId);
      setStartDate(_result.startDate);
      setEndDate(_result.endDate);
      setStatus(_result.status);
      setisHighlight(_result.isHighlight);
      setTypeContentId(_result.typeContentId);
      setGalleryFileId(_result.galleryFileId);
      setFileId(_result.fileId);
      setPoint(_result.point);
      setTextShort(_result.textShort);
      setDetail(_result.detail);
      setUrlLink(_result.urlLink);
      setDeleted(_result.deleted);
      setPath(_result.path);
      setIsPublic(_result.isPublic);
      setEmployeesAccess(_result.employeesAccess);
      setRolesAccess(_result.rolesAccess);
      console.log(result, "==> content");
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchTypContentList = async () => {
    try {
      const params = qs.stringify({
        TypeContent: true,
      });

      const result = await api.get(
        `${process.env.REACT_APP_BASE_API_DEV}api/master/list?${params}`
      );
      const _result = result.data.results.typeContent;
      setTypeContentList(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchCatalogyList = async () => {
    try {
      const params = qs.stringify({
        Catalogy: true,
      });

      const result = await api.get(
        `${process.env.REACT_APP_BASE_API_DEV}api/master/list?${params}`
      );
      const _result = result.data.results.catalogy;
      setCatalogyList(_result);
      console.log(result, "==> catagoly");
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchEmpList = async () => {
    try {
      const params = qs.stringify({
        ...(empId && { empId }),
      });

      const result = await api.get(
        `${process.env.REACT_APP_BASE_API_DEV}api/employee/list?${params}`
      );
      const _result = result.data.results;
      setEmpList(_result);
      console.log(result, "Emp");
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchRoleList = async () => {
    try {
      const result = await api.get(
        `${process.env.REACT_APP_BASE_API_DEV}api/setting/role/list`
      );
      const _result = result.data.results;
      setRoleList(_result);
      console.log(result, "==> Role");
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const a = CatalogyList.map((x) => x.subCatalogys).filter(
    (x) => x.catalogyId === CatalogyId
  );
  // console.log(a, CatalogyId);

  const Del = (index) => {
    setFiles([]);
    setFileId(null);
    // const filteredArray = Files.filter((_, i) => i !== index);
    // setFiles(filteredArray);
  };

  useEffect(() => {
    if (token) {
      fetchTypContentList();
      fetchCatalogyList();
      fetchEmpList();
      fetchRoleList();
      if (ContentMainId) {
        fetchAdminContentList();
      }
    } else {
      history.push("/login");
    }
  }, []);

  const handleRoute = () => {
    history.push("/AllSubject");
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>News/Announcement</p>
          <h3>เขียนเรื่องใหม่</h3>
          <div className={classes.width}>
            <p className={classes.subject}>หัวข้อเรื่อง</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="หัวข้อเรื่อง"
                onChange={(e) => setContentTitle(e.target.value)}
                value={ContentTitle}
              />
              <span style={{ color: "gray" }}>
                หัวข้อเรื่องที่ปรากฏในหน้าข่าวประกาศ
              </span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>รูปประจำเรื่อง</p>
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
            <p className={classes.subject}>ชนิดของเรื่อง</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <FormControl size="small">
                <Select
                  value={TypeContentId}
                  onChange={(e) => setTypeContentId(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disableUnderline
                >
                  {TypeContentList.map((Type) => (
                    <MenuItem value={Type.typeContentId}>
                      {Type.typeContent}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <span style={{ color: "gray" }}>
                Information คือ คอนเทนต์ประเภทบทความ, Bookview คือคอนเทนต์ประเภท
                PDF File
              </span>
            </div>
          </div>

          <div className={classes.width}>
            <p className={classes.subject}>เกริ่นนำ</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="หัวข้อเรื่อง"
                onChange={(e) => setTextShort(e.target.value)}
                value={TextShort}
              />
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
              <CKEditor
                id="editor"
                editor={ClassicEditor}
                data={Detail}
                config={{
                  extraPlugins: [MyCustomUploadAdapterPlugin],
                }}
                // plugins={[ CKFinder]}

                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDetail(data);
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>หมวดหมู่</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <FormControl size="small">
                <Select
                  value={CatalogyId}
                  onChange={(e) => setCatalogyId(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disableUnderline
                >
                  {CatalogyList.map((Cata) => (
                    <MenuItem value={Cata.catalogyId}>
                      {Cata.catalogyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <span style={{ color: "gray" }}>หมวดหมู่ของข่าวประกาศ</span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>หมวดหมู่รอง</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <FormControl size="small">
                <Select
                  value={SubCatalogyId}
                  onChange={(e) => setSubCatalogyId(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disableUnderline
                >
                  {CatalogyList.map((x) => x.subCatalogys)
                    .filter((x) => x.catalogyId === CatalogyId)
                    .map((sub) => (
                      <MenuItem value={sub.subCatalogyId}>
                        {sub.subcatalogyName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <span style={{ color: "gray" }}>หมวดหมู่รองของข่าวประกาศ</span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>คะแนนของรางวัล</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                placeholder="คะแนน"
                onChange={(e) => setPoint(e.target.value)}
                value={Point}
              />
              <span style={{ color: "gray" }}>คะแนนเมื่อกดอ่านข่าวเสร็จ</span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>เว็บไซต์</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                // placeholder="คะแนน"
                onChange={(e) => setUrlLink(e.target.value)}
                value={UrlLink}
              />
            </div>
          </div>

          {/* <div className={classes.width}>
            <p className={classes.subject}>อัปโหลด PDF</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <div {...getRootProps()}>
                <input
                  {...getInputProps()}
                  // type="file"
                />
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
              </div>
              <div>{images}</div>
              <span style={{ color: "gray" }}>ขนาดไฟล์ไม่เกิน 1 MB.</span>
            </div>
          </div> */}

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
            <p className={classes.subject}>โชว์บนสไลด์</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <GreenSwitch
                checked={isHighlight}
                onChange={(e) => setisHighlight(e.target.checked)}
              />
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
              <span>
                {Status === "C"
                  ? "Cancel"
                  : Status === "D"
                  ? "Draff"
                  : "Publish"}
              </span>
            </div>
          </div>
          <div className={classes.width}>
            <div className={classes.subject}></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "space-between",
                height: 180,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#FF0000",
                      "&.Mui-checked": {
                        color: "#FF0000",
                      },
                    }}
                  />
                }
                label="เห็นได้ทุกคน"
                checked={IsPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />

              <div className={classes.Row}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#FF0000",
                        "&.Mui-checked": {
                          color: "#FF0000",
                        },
                      }}
                    />
                  }
                  label="ระบุตำแหน่ง"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexGrow: 1,
                  }}
                >
                  <Stack
                    style={{
                      maxWidth: 600,
                      width: 600,
                    }}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={RoleList}
                      getOptionLabel={(option) => option.roleName}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </Stack>
                </div>
              </div>

              <div className={classes.Row}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#FF0000",
                        "&.Mui-checked": {
                          color: "#FF0000",
                        },
                      }}
                    />
                  }
                  label="ระบุรายบุคคล"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexGrow: 1,
                  }}
                >
                  <Stack
                    style={{
                      maxWidth: 600,
                      width: 600,
                    }}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={EmpList}
                      getOptionLabel={(option) => option.fistName}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </Stack>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "70%",
              paddingLeft: "14%",
              marginTop: 100,
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
                color: "black",
                backgroundColor: "#F8F9FA",
                borderColor: "transparent",
                marginRight: 10,
                width: 120,
              }}
              onClick={handleRoute}
            >
              ยกเลิก
            </Button>
            <Button
              variant="contained"
              style={{
                color: "black",
                borderColor: "transparent",
                backgroundColor: "#F8F9FA",
                marginRight: 10,
                width: 120,
              }}
            >
              บันทึกฉบับร่าง
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
            >
              เผยแพร่
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

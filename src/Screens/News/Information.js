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
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import {default  as xxx}  from "@ckeditor/ckeditor5-source-editing/src/sourceediting";
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
import moment from "moment";
import Grid from "@mui/material/Grid";
import { Title } from "@mui/icons-material";

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
    xhr.open("POST", `//api/upload/file`, true);
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
  const [FileId, setFileId] = useState(null);
  const [Path, setPath] = useState("");
  const [ContentTitle, setContentTitle] = useState("");
  const [CatalogyId, setCatalogyId] = useState(
    "f2689a16-1224-4149-853d-9679a7c75ecc"
  );
  const [SubCatalogyId, setSubCatalogyId] = useState(
    "1525287c-06cd-4714-9683-e192f12a7036"
  );
  const [isHighlight, setisHighlight] = useState(true);
  const [TypeContentId, setTypeContentId] = useState("SL");
  const [GalleryFileId, setGalleryFileId] = useState(null);
  const [Point, setPoint] = useState(0);
  const [TextShort, setTextShort] = useState("");
  const [Detail, setDetail] = useState("");
  const [UrlLink, setUrlLink] = useState(null);
  const [Deleted, setDeleted] = useState(false);
  const [IsPublic, setIsPublic] = useState(true);
  const [EmployeesAccess, setEmployeesAccess] = useState([]);
  const [RolesAccess, setRolesAccess] = useState([]);
  const [Status, setStatus] = useState("");
  const [TypeContentList, setTypeContentList] = useState([]);
  const [CatalogyList, setCatalogyList] = useState([]);
  const [empId, setEmpId] = useState("");
  const [EmpList, setEmpList] = useState([]);
  const [RoleList, setRoleList] = useState([]);
  const [NameRole, setNameRole] = useState("");
  const [EmpFName, setEmpFName] = useState("");
  const [EmpLName, setEmpLName] = useState("");
  const [RoleId, setRoleId] = useState("");
  const [EmpID, setEmpID] = useState("");
  const [TitleErr, setTitleErr] = useState(false);
  const [PointErr, setPointErr] = useState(false);

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
    try {
      const params = qs.stringify({
        ...(ContentMainId && { ContentMainId }),
      });

      const result = await api.get(`/api/admin/content/list?${params}`);
      const _result = result.data.results[0];
      setContentTitle(_result.contentTitle);
      setCatalogyId(_result.catalogyId);
      setSubCatalogyId(_result.subCatalogyId);
      setStartDate(_result.startDate);
      setEndDate(_result.endDate);
      setStatus(_result.status);
      setisHighlight(_result.isHighlight);
      setTypeContentId(_result.typeContentId);
      // setGalleryFileId(_result.galleryFileId);
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

      const result = await api.get(`/api/master/list?${params}`);
      const _result = result.data.results.typeContent;
      setTypeContentList(_result);
      console.log(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchCatalogyList = async () => {
    try {
      const params = qs.stringify({
        Catalogy: true,
      });

      const result = await api.get(`/api/master/list?${params}`);
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

      const result = await api.get(`/api/employee/list?${params}`);
      const _result = result.data.results;
      setEmpList(_result);
      console.log(result, "Emp");
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchRoleList = async () => {
    try {
      const result = await api.get(`/api/setting/role/list`);
      const _result = result.data.results;
      setRoleList(_result);
      console.log(result, "==> Role");
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const save = async () => {
    const mainId = ContentMainId === undefined ? null : id;
    const _status = "P";
    const body = {
      ContentMainId: mainId,
      ContentTitle,
      CatalogyId,
      SubCatalogyId,
      StartDate: moment(StartDate).format("YYYY-MM-DD"),
      EndDate: moment(EndDate).format("YYYY-MM-DD"),
      Status: _status,
      isHighlight,
      TypeContentId,
      GalleryFileId,
      FileId,
      Point,
      TextShort,
      Detail,
      UrlLink,
      Deleted: false,
      IsPublic,
      EmployeesAccess,
      RolesAccess,
    };
    if (TitleErr || PointErr) {
      try {
        const result = await api.post("api/admin/content/add", body);
        setOpen(true);
        setTimeout(() => {
          history.push(`/AllSubject`);
        }, 2000);
        console.log(result);
      } catch (error) {
        console.log("error => ", error);
      }
    } else {
      console.log("not data");
    }
  };
  const Draff = async () => {
    const mainId = ContentMainId === undefined ? null : id;
    const _status = "D";
    const body = {
      ContentMainId: mainId,
      ContentTitle,
      CatalogyId,
      SubCatalogyId,
      StartDate: moment(StartDate).format("YYYY-MM-DD"),
      EndDate: moment(EndDate).format("YYYY-MM-DD"),
      Status: _status,
      isHighlight,
      TypeContentId,
      GalleryFileId,
      FileId,
      Point,
      TextShort,
      Detail,
      UrlLink,
      Deleted: false,
      IsPublic,
      EmployeesAccess,
      RolesAccess,
    };
    if (TitleErr || PointErr) {
      try {
        const result = await api.post("api/admin/content/add", body);
        setOpen(true);
        setTimeout(() => {
          history.push(`/AllSubject`);
        }, 2000);
        console.log(result);
      } catch (error) {
        console.log("error => ", error);
      }
    } else {
      console.log("not data");
    }
  };

  const Cancel = async () => {
    const mainId = ContentMainId === undefined ? null : id;
    const _status = "C";
    const body = {
      ContentMainId: mainId,
      ContentTitle,
      CatalogyId,
      SubCatalogyId,
      StartDate: moment(StartDate).format("YYYY-MM-DD"),
      EndDate: moment(EndDate).format("YYYY-MM-DD"),
      Status: _status,
      isHighlight,
      TypeContentId,
      GalleryFileId,
      FileId,
      Point,
      TextShort,
      Detail,
      UrlLink,
      Deleted: false,
      IsPublic,
      EmployeesAccess,
      RolesAccess,
    };
    if (TitleErr || PointErr) {
      try {
        const result = await api.post("api/admin/content/add", body);
        setOpen(true);
        setTimeout(() => {
          history.push(`/AllSubject`);
        }, 2000);
        console.log(result);
      } catch (error) {
        console.log("error => ", error);
      }
    } else {
      console.log("not data");
    }
  };

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

  const handleCheckBoxPublic = (e) => {
    setIsPublic(e.target.checked);

    const modifyEmp = EmployeesAccess.map((e) => ({
      empAccessId: null ? null : e.empAccessId,
      empId: e.empId,
      deleted: true,
    }));
    const modifyRole = RolesAccess.map((r) => ({
      roleAccessId: null ? null : r.roleAccessId,
      roleId: r.roleId,
      deleted: true,
    }));
    setEmployeesAccess(modifyEmp);
    setRolesAccess(modifyRole);
  };

  const handleChangeRole = (event, newValue) => {
    setIsPublic(false);
    setRoleId(event.target.value);
    setNameRole(newValue.props.children);
  };

  const handleChangeEmp = (newValue) => {
    console.log(newValue);
    if (newValue) {
      setIsPublic(false);
      setEmpID(newValue.empId);
      setEmpFName(newValue.fistName);
      setEmpLName(newValue.lastName);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleErr(false);
    setPointErr(false);

    if (ContentTitle === "") {
      setTitleErr(true);
    }
    if (Point === 0) {
      setPointErr(true);
      console.log("OO");
    }
  };

  const SetRolesAccess = () => {
    if (RoleId) {
      setRolesAccess([
        ...RolesAccess,
        {
          roleAccessId: null,
          roleId: RoleId,
          deleted: false,
          roleName: NameRole,
        },
      ]);
      setRoleId("");
    }
  };

  const SetEmpAccess = () => {
    if (EmpID) {
      setEmployeesAccess([
        ...EmployeesAccess,
        {
          empAccessId: null,
          empId: EmpID,
          deleted: false,
          empFirstName: EmpFName,
          empLastName: EmpLName,
        },
      ]);
      setEmpID("");
    }
  };

  const delRole = (id, index) => {
    const roles = [...RolesAccess];
    const _role = roles.find(({ roleAccessId }) => roleAccessId === id);
    if (id) {
      _role.deleted = true;
      _role.roleId = null;
      setRolesAccess([...RolesAccess]);
    } else {
      const role = RolesAccess.filter((_, i) => i !== index);
      setRolesAccess(role);
    }
  };

  const delEmp = (id, index) => {
    const Emps = [...EmployeesAccess];
    const _Emp = Emps.find(({ empAccessId }) => empAccessId === id);
    if (id) {
      _Emp.deleted = true;
      _Emp.empId = null;
      setEmployeesAccess([...EmployeesAccess]);
    } else {
      const Emp = EmployeesAccess.filter((_, i) => i !== index);
      setEmployeesAccess(Emp);
    }
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
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
                required
                error={TitleErr}
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
                  // plugins: [xxx],
                  // toolbar: ["sourceEditing"],
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
                  onChange={(e) => {
                    setCatalogyId(e.target.value);

                    const subs = CatalogyList.find(
                      (x) => x.catalogyId === e.target.value
                    )?.subCatalogys;

                    if (subs.length > 0) {
                      setSubCatalogyId(subs[0].subCatalogyId);
                    }
                  }}
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
                  {/* {CatalogyList.map((x) => x.subCatalogys)
                    .filter((x) => x.catalogyId === CatalogyId)
                    .map((sub) => (
                      <MenuItem value={sub.subCatalogyId}>
                        {sub.subcatalogyName}
                      </MenuItem>
                    ))} */}

                  {CatalogyList.find(
                    (x) => x.catalogyId === CatalogyId
                  )?.subCatalogys.map((sub) => (
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
                type="number"
                required
                error={PointErr}
              />
              <span style={{ color: "gray" }}>คะแนนเมื่อกดอ่านข่าวเสร็จ</span>
            </div>
          </div>
          {TypeContentId === "URL" ? (
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
          ) : null}

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
                {Status
                  ? Status === "C"
                    ? "Cancel"
                    : Status === "D"
                    ? "Draff"
                    : Status === "P"
                    ? "Publish"
                    : "Draff"
                  : null}
              </span>
            </div>
          </div>
          <div className={classes.width}>
            <p className={classes.subject}>เห็นได้ทุกคน</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
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
                  />
                }
                label=""
                checked={IsPublic}
                onChange={handleCheckBoxPublic}
              />
            </div>
          </div>

          <div className={classes.width}>
            <p className={classes.subject}>ระบุตำแหน่ง</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControl size="small" sx={{ width: 250 }}>
                <Select
                  value={RoleId}
                  onChange={handleChangeRole}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disableUnderline
                >
                  <MenuItem value="">
                    <span style={{ color: "#b3b3b3" }}>เพิ่มตำแหน่ง</span>
                  </MenuItem>
                  {RoleList.filter(
                    ({ roleId }) =>
                      !RolesAccess.map((x) => x.roleId).includes(roleId)
                  ).map((R) => (
                    <MenuItem value={R.roleId}>{R.roleName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button
                style={{
                  borderWidth: 0,
                  backgroundColor: "transparent",
                }}
              >
                <span
                  class="material-icons-outlined"
                  style={{ color: "#FF0000", fontSize: 30, marginLeft: 5 }}
                  onClick={() => SetRolesAccess()}
                >
                  add
                </span>
              </button>
            </div>
          </div>
          {RolesAccess.length > 0 ? (
            <div className={classes.width}>
              <div className={classes.subject}></div>

              <table
                id="Role"
                style={{
                  border: "1px solid #e0e0e0",
                  textAlign: "center",
                  fontWeight: "normal",
                }}
              >
                <thead
                  style={{
                    backgroundColor: "#F1F3F9",
                  }}
                >
                  <th style={{ width: 250 }}>ตำแหน่ง</th>
                  <th style={{ width: 200 }}>ลบ</th>
                </thead>
                <tbody>
                  {RolesAccess.filter((x) => x.deleted === false).map(
                    (r, index) => {
                      return (
                        <tr key={index}>
                          <td>{r.roleName}</td>
                          <td>
                            <button
                              style={{
                                borderWidth: 0,
                                backgroundColor: "transparent",
                              }}
                            >
                              <span
                                class="material-icons-outlined"
                                onClick={() => delRole(r.roleAccessId, index)}
                                style={{ color: "#FF0000" }}
                              >
                                delete
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          ) : null}

          <div className={classes.width}>
            <p className={classes.subject}>ระบุรายบุคคล</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Autocomplete
                disablePortal
                id="Emp"
                options={EmpList.filter(
                  ({ empId }) =>
                    !EmployeesAccess.map((x) => x.empId).includes(empId)
                )}
                sx={{ width: 350 }}
                getOptionLabel={(option) => {
                  //filter value
                  return `${option.empNo}: ${option.fistName} ${option.lastName}`;
                }}
                onChange={(e, newValue) => {
                  console.log(e);
                  console.log(newValue);

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
              <button
                style={{
                  borderWidth: 0,
                  backgroundColor: "transparent",
                }}
              >
                <span
                  class="material-icons-outlined"
                  style={{ color: "#FF0000", fontSize: 30, marginLeft: 5 }}
                  onClick={() => SetEmpAccess()}
                >
                  add
                </span>
              </button>
            </div>
          </div>
          {EmployeesAccess.length > 0 ? (
            <div className={classes.width}>
              <div className={classes.subject}></div>

              <table
                id="Emp"
                style={{
                  border: "1px solid #e0e0e0",
                  textAlign: "center",
                  fontWeight: "normal",
                }}
              >
                <thead
                  style={{
                    backgroundColor: "#F1F3F9",
                  }}
                >
                  <th style={{ width: 250 }}>พนักงาน</th>
                  <th style={{ width: 200 }}>ลบ</th>
                </thead>
                <tbody>
                  {EmployeesAccess.filter((x) => x.deleted === false).map(
                    (E, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ textAlign: "left", paddingLeft: 5 }}>
                            {E.empFirstName}
                            <span>&nbsp;&nbsp;</span>
                            {E.empLastName}
                          </td>
                          <td>
                            <button
                              style={{
                                borderWidth: 0,
                                backgroundColor: "transparent",
                              }}
                            >
                              <span
                                class="material-icons-outlined"
                                onClick={() => delEmp(E.empAccessId, index)}
                                style={{ color: "#FF0000" }}
                              >
                                delete
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          ) : null}

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
            {ContentMainId ? (
              <Button
                variant="contained"
                style={{
                  color: "black",
                  backgroundColor: "#F8F9FA",
                  borderColor: "transparent",
                  marginRight: 10,
                  width: 120,
                }}
                onClick={() => Cancel()}
              >
                ยกเลิก
              </Button>
            ) : null}
            <Button
              variant="contained"
              style={{
                color: "black",
                borderColor: "transparent",
                backgroundColor: "#F8F9FA",
                marginRight: 10,
                width: 120,
              }}
              onClick={() => Draff()}
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
              onClick={() => save()}
              type="submit"
            >
              เผยแพร่
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
    </form>
  );
}

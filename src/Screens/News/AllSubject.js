import React, { useState, useEffect } from "react";
import {
  Paper,
  InputBase,
  Button,
  TablePagination,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  CircularProgress,
  MenuItem,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { alpha, styled } from "@mui/material/styles";
import { useHistory, Link } from "react-router-dom";
import qs from "qs";
import moment from "moment";
import api from "../../Component/api/api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

export default function AllSubject() {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const history = useHistory();

  const [keyword, setKeyword] = useState("");
  const [ContentMainId, setContentMainId] = useState("");
  const [AdminContentList, setAdminContentList] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [CatalogyId, setCatalogyId] = useState("");
  const [Loading, setLoading] = useState(false);
  const [CatalogyList, setCatalogyList] = useState([]);
  const [selectAdmin, setSelectAdmin] = useState([]);

  const fetchAdminContentList = async () => {
    try {
      const params = qs.stringify({
        ...(keyword && { keyword }),
        ...(ContentMainId && { ContentMainId }),
        ...(isActive && { isActive }),
        ...(CatalogyId && { CatalogyId }),
      });

      const result = await api.get(`/api/admin/content/list?${params}`);
      const _result = result.data.results;

      var sortedData = [..._result].sort((a, b) => a.seq - b.seq);

      setAdminContentList(sortedData);
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
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const save = async () => {
    setLoading(true);
    const detail = AdminContentList.map((x, index) => ({
      contentMainId: x.contentMainId,
      seq: index + 1,
    }));

    const data = {
      detail: detail,
    };
    try {
      const result = await api.post("api/admin/content/seq/edit", data);
      fetchAdminContentList();
      setLoading(false);
    } catch (error) {
      console.log("error => ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogyList();
  }, []);

  useEffect(() => {
    if (token) {
      fetchAdminContentList();
    } else {
      history.push("/login");
    }
  }, [keyword, isActive, CatalogyId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      AdminContentList,
      result.source.index,
      result.destination.index
    );

    setAdminContentList(items);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} style={{ height: "88vh" }}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>News/Announcement</p>
          <h3>เรื่องทั้งหมด</h3>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: { sm: "right" }, marginBottom: 2 }}
            rowSpacing={1}
          >
            <Grid item xs={7} sm={2.5} lg={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#FF0000",
                      "&.Mui-checked": {
                        color: "#FF0000",
                      },
                    }}
                    id={"Active"}
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                }
                label="ใช้งาน"
              />
            </Grid>
            <Grid item xs={7} sm={4} lg={2}>
              <FormControl
                size="small"
                sx={{
                  width: "100%",
                  marginRight: 5,
                }}
              >
                <Select
                  style={{ marginTop: 5 }}
                  value={CatalogyId}
                  onChange={(e) => setCatalogyId(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disableUnderline
                >
                  <MenuItem value="">
                    <em>หมวดหมู่ทั้งหมด</em>
                  </MenuItem>
                  {CatalogyList.map((Data) => (
                    <MenuItem value={Data.catalogyId}>
                      {Data.catalogyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={7} sm={4} lg={3}>
              <div className={classes.search}>
                <SearchIcon style={{ margin: 10 }} />
                <InputBase
                  multiline
                  fullWidth
                  placeholder="ค้นหาเรื่อง"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <TableContainer sx={{ maxHeight: "57vh", height: "57vh" }}>
                    <Table
                      stickyHeader
                      size="small"
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            ลำดับ
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            วันที่เริ่ม
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            วันที่สิ้นสุด
                          </StyledTableCell>
                          <StyledTableCell width="25%" align="center">
                            ชื่อเรื่อง
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            หมวดหมู่
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            หมวดหมู่ย่อย
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            ผู้เขียน
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            สถานะ
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            แก้ไข
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {AdminContentList.length > 0
                          ? (rowsPerPage > 0
                              ? AdminContentList.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                              : AdminContentList
                            ).map((Data, index) => (
                              <Draggable
                                key={Data.contentMainId}
                                draggableId={Data.contentMainId}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <StyledTableRow
                                    key={Data.contentMainId}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <StyledTableCell align="center">
                                      {Data.seq}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {moment(Data.startDate).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {moment(Data.endDate).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {Data.contentTitle}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {Data.catalogyName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {Data.subCatalogyName}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                      {Data.createName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {Data.status === "C"
                                        ? "Cancel"
                                        : Data.status === "D"
                                        ? "Draff"
                                        : "Publish"}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Link
                                        to={{
                                          pathname: `/EditInformation/${Data.contentMainId}`,
                                        }}
                                      >
                                        <Button
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
                                      </Link>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                )}
                              </Draggable>
                            ))
                          : null}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              size="small"
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "#FF0000",
                borderColor: "transparent",
                margin: 10,
                width: 100,
                height: 35,
              }}
              onClick={() => save()}
            >
              {Loading ? (
                <CircularProgress
                  sx={{
                    color: "#FFFFFF",
                  }}
                  size={24}
                />
              ) : (
                "บันทึกลำดับ"
              )}
            </Button>
            <TablePagination
              rowsPerPageOptions={[15, 45, 105]}
              component="div"
              count={AdminContentList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
}

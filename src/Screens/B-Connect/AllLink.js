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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useHistory, Link } from "react-router-dom";
import qs from "qs";
import api from "../../Component/api/api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Grid from "@mui/material/Grid";

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

export default function AllLink() {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [keyword, setKeyword] = useState("");
  const [BconnectID, setBconnectID] = useState("");
  const [BconnectList, setBconnectList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [_isBackend, setIsBackend] = useState(true);
  const [typeConnectList, settypeConnectList] = useState([]);
  const [TypeConnectID, setTypeConnectID] = useState([]);
  const [Loading, setLoading] = useState(false);

  const fetchBconnectList = async () => {
    const isBackend = _isBackend === false ? true : false;
    try {
      const params = qs.stringify({
        ...(keyword && { keyword }),
        ...(BconnectID && { BconnectID }),
        ...(isBackend && { isBackend }),
        ...(TypeConnectID && { TypeConnectID }),
      });

      const result = await api.get(`/api/bconnect/list?${params}`);
      const _result = result.data.results;

      var sortedData = [..._result].sort((a, b) => a.seq - b.seq);

      setBconnectList(sortedData);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchTypeConnectList = async () => {
    try {
      const params = qs.stringify({
        typeConnect: true,
      });

      const result = await api.get(`/api/master/list?${params}`);
      const _result = result.data.results.typeConnect;
      settypeConnectList(_result);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const save = async () => {
    setLoading(true);
    const detail = BconnectList.map((x, index) => ({
      bconnectID: x.bconnectID,
      seq: index + 1,
    }));

    const data = {
      detail: detail,
    };
    try {
      const result = await api.post("api/bconnect/seq/edit", data);
      fetchBconnectList();
      setLoading(false);
    } catch (error) {
      console.log("error => ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypeConnectList();
  }, []);

  useEffect(() => {
    if (token) {
      fetchBconnectList();
    } else {
      history.push("/login");
    }
  }, [keyword, _isBackend, TypeConnectID]);

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
      BconnectList,
      result.source.index,
      result.destination.index
    );

    setBconnectList(items);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} style={{ height: "88vh" }}>
        <div class={classes.Padding}>
          <p style={{ color: "red" }}>B-Connect</p>
          <h3>ลิงค์ทั้งหมด</h3>
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
                    checked={_isBackend}
                    onChange={(e) => setIsBackend(e.target.checked)}
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
                }}
              >
                <Select
                  style={{ marginTop: 5 }}
                  value={TypeConnectID}
                  onChange={(e) => setTypeConnectID(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  disableUnderline
                >
                  <MenuItem value="">
                    <em>กลุ่มทั้งหมด</em>
                  </MenuItem>
                  {typeConnectList.map((Data) => (
                    <MenuItem value={Data.typeConnectID}>
                      {Data.typeConnectName}
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
                  placeholder="ค้นหาชื่อ"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <TableContainer sx={{ maxHeight: "58vh", height: "58vh" }}>
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
                          <StyledTableCell align="center">ชื่อ</StyledTableCell>
                          <StyledTableCell width="10%" align="center">
                            ลิงค์ปลายทาง
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            กลุ่ม
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            ผู้เขียน
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            แก้ไข
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {BconnectList.length > 0
                          ? (rowsPerPage > 0
                              ? BconnectList.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                              : BconnectList
                            ).map((Data, index) => (
                              <Draggable
                                key={Data.bconnectID}
                                draggableId={Data.bconnectID}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <StyledTableRow
                                    key={Data.bconnectID}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <StyledTableCell align="center">
                                      {Data.seq}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {Data.bconnectName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <a>{Data.url}</a>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {Data.typeConnectName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {Data.createName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Link
                                        to={{
                                          pathname: `/EditLink/${Data.bconnectID}`,
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
              count={BconnectList.length}
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

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withAuthLayout from "./HoC/withAuthLayout";
import AllSubject from "./Screens/News/AllSubject";
import test from "./test";
import login from "./Screens/login";
import Information from "./Screens/News/Information";
import AllReward from "./Screens/B-Reward/AllReward";
import AddNewReward from "./Screens/B-Reward/AddNewReward";
import MemberList from "./Screens/B-360/MemberList";
import AddMember from "./Screens/B-360/AddMember";
import AllLink from "./Screens/B-Connect/AllLink";
import AddLink from "./Screens/B-Connect/AddLink";
import AllUser from "./Screens/B-Admin/AllUser";
import ManagePermissions from "./Screens/B-Admin/ManagePermissions";
import SetPermissions from "./Screens/B-Admin/SetPermissions";
import Role from "./Screens/B-Admin/Role";
import AddUser from "./Screens/B-Admin/AddUser";

function App() {
  return (
    <Router>
      <div
        className="font-face-gm"
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#F7F8FA",
        }}
      >
        <React.Fragment>
          <Switch>
            <div style={{ width: "100%" }}>
              <Route path="/test" component={test} />

              <Route path="/login" component={login} />
              <Route
                path="/AllSubject"
                component={withAuthLayout(AllSubject)}
              />
              <Route
                path="/Information"
                component={withAuthLayout(Information)}
              />
              <Route path="/AllReward" component={withAuthLayout(AllReward)} />
              <Route
                path="/AddNewReward"
                component={withAuthLayout(AddNewReward)}
              />
              <Route path="/Members" component={withAuthLayout(MemberList)} />
              <Route path="/AddMember" component={withAuthLayout(AddMember)} />
              <Route path="/AllLink" component={withAuthLayout(AllLink)} />
              <Route path="/AddLink" component={withAuthLayout(AddLink)} />
              <Route path="/AllUser" component={withAuthLayout(AllUser)} />
              <Route path="/AddUser" component={withAuthLayout(AddUser)} />
              <Route
                path="/ManagePermissions"
                component={withAuthLayout(ManagePermissions)}
              />
              <Route
                path="/SetPermissions"
                component={withAuthLayout(SetPermissions)}
              />
              <Route path="/Role" component={withAuthLayout(Role)} />
              <Route exact path="/" component={login} />
            </div>
          </Switch>
        </React.Fragment>
      </div>
    </Router>
  );
}

export default App;

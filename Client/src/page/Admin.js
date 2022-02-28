import React, { SyntheticEvent, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch, useParams } from "react-router-dom";
import Admenu from "../components/Admenu";
import Footer from "../components/Footer";
import AdHome from "../components/AdHome";
import Logout from "../components/Logout";
import EmManage from "../components/EmManage";
import Leave from "../components/Leave";

const Admin = () => {
  const param = useParams();
  const [activeTab, setActiveTab] = useState("tab1");
  const [user, setUser] = useState(param.id);
  console.log(user)
  const Tabs = () => {
    if (activeTab == "tab1") {
      return <AdHome name={user}/>;
    }
    if (activeTab == "tab2") {
      return <EmManage />;
    }
    if (activeTab == "tab3") {
      return <Leave />;
    }
  };
  return (
    <>
      <div className="container-fluid con-ad">
        <div className="col-2">
          <Admenu />
          <ul className="admenu">
            <li>
              <a onClick={() => setActiveTab("tab1")}>หน้าแรก <i className="fas fa-chevron-right"></i></a>
            </li>
            <li>
              <a onClick={() => setActiveTab("tab2")}>จัดการพนักงาน <i className="fas fa-chevron-right"></i></a>
            </li>
            <li>
              <a onClick={() => setActiveTab("tab3")}>จัดการการลา <i className="fas fa-chevron-right"></i></a>
            </li>
            <li><a >จัดการเงินเดือน <i className="fas fa-chevron-right"></i></a></li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
        <div className="col-10 content-bg">
          <div className="tab-con">
            <Tabs />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Admin;

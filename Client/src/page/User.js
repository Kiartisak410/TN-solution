import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Logout from "../components/Logout";
import Usmenu from "../components/Usmenu";
import Footer from "../components/Footer";

import UsHome from "../components/Ushome";
import UsLeave from "../components/UsLeave";
import UsSal from "../components/UsSal";

function User() {
  const param = useParams();
  const [activeTab, setActiveTab] = useState("tab1");
  const Tabs = () => {
    if (activeTab === "tab1") {
      return <UsHome name={param.id}/>;
    }
    if (activeTab === "tab2") {
        return <UsLeave name={param.id}/>
    }
    if (activeTab === "tab3") {
        return <UsSal name={param.id}/>
    }
  };
  return (
    <>
      <div className="container-fluid con-ad">
        <div className="col-2">
          <Usmenu />
          <ul className="admenu">
            <li>
              <a onClick={() => setActiveTab("tab1")}>
                หน้าแรก <i className="fas fa-chevron-right"></i>
              </a>
            </li>
            <li>
              <a onClick={() => setActiveTab("tab2")}>
                การลา <i className="fas fa-chevron-right"></i>
              </a>
            </li>
            <li>
                <a onClick={() => setActiveTab("tab3")}>
                    เงินเดือน <i className="fas fa-chevron-right"></i>
                </a>
            </li>
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
}

export default User;

import React, { useState } from "react";
import FirstTab from "../AllTabs/FirstTab.js";
import SecondTab from "../AllTabs/SecondTab.js";
import ThirdTab from "../AllTabs/ThirdTab.js";
import TabNavItem from "../V2/TabNavItem";
import TabContent from "../V2/TabContent";
import "./Tabs.css";

const Tabs = (e) => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem
          title="Schedule"
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Dummy Tab"
          id="tab2"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Dummy Tab"
          id="tab3"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
          <FirstTab />
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <SecondTab />
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <ThirdTab />
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;

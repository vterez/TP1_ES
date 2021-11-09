import React, { useState, useEffect } from "react";

import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";

const Navigation = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const openSidebarHandler = () => setSidebarIsOpen(true);
  const closeSidebarHandler = () => setSidebarIsOpen(false);

  useEffect(() => {
    const changeHandler = () => setSidebarIsOpen(false);

    let mediaQueryList = window.matchMedia("(min-width: 768px)");
    if (EventTarget?.prototype?.addEventListener) {
      mediaQueryList.addEventListener("change", changeHandler);
    } else {
      mediaQueryList.addListener(changeHandler);
    }

    return () => {
      if (EventTarget?.prototype?.removeEventListener) {
        mediaQueryList.removeEventListener("change", changeHandler);
      } else {
        mediaQueryList.removeListener(changeHandler);
      }
    };
  }, []);

  return (
    <>
      <Backdrop
        show={sidebarIsOpen}
        timeout={100}
        onClick={closeSidebarHandler}
      />
      <Topbar openSidebar={openSidebarHandler} />
      <Sidebar
        show={sidebarIsOpen}
        timeout={100}
        closeSidebar={closeSidebarHandler}
      />
    </>
  );
};

export default Navigation;

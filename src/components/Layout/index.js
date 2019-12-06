import React from "react";

import style from "./layout.module.css";

export default ({ children }) => {
  return <div className={style.layoutMainDiv}>{children}</div>;
};

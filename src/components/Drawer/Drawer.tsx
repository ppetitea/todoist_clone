import React, { ReactElement } from "react";
import VerticalDrawer from "./components/VerticalDrawer";
import HorizontalDrawer from "./components/HorizontalDrawer";

export interface IDrawer {
  drawer: any;
  children?: any;
}

const Drawer = (props: IDrawer) => {
  const { drawer, children } = props;
  if (drawer.direction === "bottom") {
    return <VerticalDrawer {...props}>{children}</VerticalDrawer>;
  } else {
    return <HorizontalDrawer {...props}>{children}</HorizontalDrawer>;
  }
};

export default Drawer;

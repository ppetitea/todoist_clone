import React, { useContext } from "react";

interface IDrawerContext {
  leftDrawer: any;
  rightDrawer: any;
}

const initialState: IDrawerContext = { leftDrawer: null, rightDrawer: null };

const DrawerContext = React.createContext(initialState);

const useLeftDrawer = () => {
  const { leftDrawer } = useContext(DrawerContext);
  return leftDrawer;
};
const useRightDrawer = () => {
  const { rightDrawer } = useContext(DrawerContext);
  return rightDrawer;
};

export { DrawerContext, useLeftDrawer, useRightDrawer };
export default DrawerContext;

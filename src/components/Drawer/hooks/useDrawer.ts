import useHorizontalDrawer from "./useHorizontalDrawer";
import useVerticalDrawer from "./useVerticalDrawer";

const useDrawer = (direction: "left" | "right" | "bottom") => {
  if (direction === "bottom") return useVerticalDrawer();
  else return useHorizontalDrawer(direction);
};

export { useDrawer };
export default useDrawer;

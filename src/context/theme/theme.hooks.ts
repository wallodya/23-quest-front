import { useContext } from "react";
import { ThemeContex } from "./theme.provider";

export const useTheme = () => useContext(ThemeContex);

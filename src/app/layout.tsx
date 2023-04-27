import { MainContainer } from "components/layouts";
import { ReactNode } from "react";
import "../styles/globals.css";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return <MainContainer>{children}</MainContainer>;
};

export default RootLayout;

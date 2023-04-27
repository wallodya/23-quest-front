import MainProvider from "context/MainProvider";
import { ReactNode } from "react";
import GlobalLayout from "./PageLayout";
import PageWrapper from "./PageWrapper";

export const MainContainer = ({ children }: { children: ReactNode }) => {
    return (
        <PageWrapper>
            <MainProvider>
                <GlobalLayout>{children}</GlobalLayout>
            </MainProvider>
        </PageWrapper>
    );
};

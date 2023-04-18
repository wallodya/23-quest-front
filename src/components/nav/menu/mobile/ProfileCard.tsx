import PersonIcon from "components/icons/PersonIcon";
import React, { ReactNode, useState } from "react";
import { useAppSelector } from "store/hooks";
import ProfileCardDropDown from "./ProfileCardDropDown";

const ProfileCard = ({ children }: { children: ReactNode }) => {
    const { login } = useAppSelector((state) => state.user);

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className="rounded-b-3xl bg-gradient-to-br from-gray-900 to-gray-800 px-5 pt-3 pb-2">
            {children}
            <div className="my-2 grid grid-cols-3 grid-rows-3 items-center">
                <span className="col-start-1 row-span-2 w-fit justify-self-center overflow-hidden rounded-full border-2 border-inherit">
                    <PersonIcon size="lg" />
                </span>
                <span className="col-span-2 col-start-2 font-bold">
                    {login}
                </span>
                {/* <span className="col-span-2 col-start-2 row-start-2 flex items-end text-xs italic text-gray-400">
                    owner
                </span> */}
                <div className="col-span-3 row-start-3 px-2">
                    <div className="w-full border-b border-gray-700"></div>
                </div>
            </div>

            <ProfileCardDropDown isShown={isExpanded} />
            <div
                className="mb-2 flex justify-center text-xs font-bold text-gray-400 hover:text-gray-200"
                onClick={toggleExpanded}
            >
                {isExpanded ? "Show less" : "Show more"}
            </div>
        </div>
    );
};

export default ProfileCard;

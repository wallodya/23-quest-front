import { ProfileStats } from "components/misc";

const ProfileCardDropDown = ({ isShown }: { isShown: boolean }) => {
    return (
        <div
            style={
                isShown
                    ? {
                          height: "fit-content",
                          paddingBlock: "1rem",
                          opacity: 1,
                      }
                    : { height: 0, opacity: 0 }
            }
            className="flex flex-col items-start gap-3 overflow-hidden border-gray-700 px-2 transition-all"
        >
            <ProfileStats/>
            <div className="mt-6 w-full border-b border-gray-700"></div>
        </div>
    );
};

export default ProfileCardDropDown;

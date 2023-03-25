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
            <div className="mb-4 grid w-full grid-cols-2 gap-5">
                <div className="flex flex-col items-center gap-1 rounded-lg bg-gradient-to-tr from-indigo-900 to-indigo-600 px-1 py-2">
                    <span className="w-full border-b border-slate-300/20 text-center text-3xl font-bold">
                        2
                    </span>
                    <span className="text-xs text-slate-300/75">
                        done today
                    </span>
                </div>
                <div className="col-start-2 flex flex-col items-center gap-1 rounded-lg bg-gradient-to-tr from-sky-900 to-sky-600 px-1 py-2">
                    <span className="w-full border-b border-slate-300/20 text-center text-3xl font-bold">
                        3
                    </span>
                    <span className="text-xs text-slate-300/75">
                        left today
                    </span>
                </div>
            </div>
            <div className="wrap col-span-3 row-span-1 row-start-4 flex items-center justify-start gap-2 text-gray-400">
                <span className="col-span-3 row-start-3 text-xs">
                    Last completed:
                </span>
                <span className="col-span-3 row-start-4 text-xs italic">
                    2 hours ago
                </span>
            </div>
            <div className="wrap col-span-3 row-span-1 row-start-5 flex items-center justify-start gap-2 text-gray-400">
                <span className="col-span-3 row-start-3 text-xs">
                    Last created:
                </span>
                <span className="col-span-3 row-start-4 text-xs italic">
                    30 minutes ago
                </span>
            </div>
            <div className="wrap col-span-3 row-span-1 row-start-5 flex items-center justify-start gap-2 text-gray-400">
                <span className="col-span-3 row-start-3 text-xs">
                    Active quests:
                </span>
                <span className="col-span-3 row-start-4 text-xs italic">7</span>
            </div>
            <div className="wrap col-span-3 row-span-1 row-start-5 flex items-center justify-start gap-2 text-gray-400">
                <span className="col-span-3 row-start-3 text-xs">
                    Task failed this week:
                </span>
                <span className="col-span-3 row-start-4 text-xs italic">4</span>
            </div>
            <div className="mt-6 w-full border-b border-gray-700"></div>
        </div>
    );
};

export default ProfileCardDropDown;

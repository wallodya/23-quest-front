import CrossIcon from "components/icons/CrossIcon";
import { TaskCardExample } from "./TaskCardExample";
import Button from "components/ui/Button";

const QuestExampleClosed = () => {
    return (
        <div className="h-fit w-full rounded-xl bg-emerald-500 px-6 py-5">
            <div className="grid w-full grid-cols-6 grid-rows-2">
                <div className="col-1 col-span-4 row-span-2 flex flex-col justify-between gap-1">
                    <h2 className="max-w-xs font-bold">Example quest</h2>
                    <span className="text-sm font-bold italic text-emerald-700">
                        2 tasks left
                    </span>
                </div>
                <div className="col-span-2 col-start-5 row-span-2 flex items-center justify-end text-xl">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full font-bold">
                        0%
                    </div>
                </div>
            </div>
        </div>
    );
}

const QuestExampleOpened = () => {
    return (
        <div className="relative h-fit">
            <div
                className={
                    "z-38 pointer-events-none relative h-full bg-gray-900/0"
                }
            >
                <div
                    className={
                        "flex h-full w-full flex-col overflow-hidden bg-gray-900 "
                    }
                    style={{ borderRadius: 20 }}
                >
                    <div className="h-fit w-full bg-emerald-500 px-6 py-5">
                        <div className="mb-2 flex justify-end">
                            <CrossIcon size="xs" />
                        </div>
                        <div className="grid w-full grid-cols-6 grid-rows-2">
                            <div className="col-1 col-span-4 row-span-2 flex flex-col justify-between gap-1">
                                <h2 className="max-w-xs font-bold">
                                    Example quest
                                </h2>
                                <span className="text-sm font-bold italic text-emerald-700">
                                    2 tasks left
                                </span>
                            </div>
                            <div className="col-span-2 col-start-5 row-span-2 flex items-center justify-end text-xl">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full font-bold">
                                    0%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-full overflow-hidden px-4">
                        <div className="h-full  overflow-y-auto py-6">
                            <div className="grid grid-cols-cards gap-4 ">
                                <TaskCardExample
                                    isInQuest
                                    title={"Firsy task in quest"}
                                />
                                <TaskCardExample
                                    isInQuest
                                    title={"Second task in quest"}
                                />
                            </div>
                            <div className="flex justify-center gap-2 py-6 px-6">
                                <div className="max-w-96 pointer-events-none">
                                    <Button
                                        type="filled"
                                        buttonProps={{ role: "none" }}
                                    >
                                        Add task
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const CreateQuestCard = () => {
    return (
        <div className=" mb-8 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 sm:p-8 md:p-12">
            <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                <div>
                    <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-5xl">
                        Create quests
                    </h1>
                    <p className="mb-6 text-lg font-normal text-gray-500 dark:text-slate-100">
                        You can use them to combine multiple tasks together
                    </p>
                </div>

                <div>
                    <QuestExampleClosed />
                </div>
            </div>
            <div>
                <QuestExampleOpened />
            </div>
        </div>
    );
}
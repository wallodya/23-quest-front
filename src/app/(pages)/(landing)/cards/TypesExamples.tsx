import { chips } from "./TypesCard";

const RepeatChip = () => {
    const { label, Icon, textColor, outlineColor } = chips[1]
    return (
        <div
            className={`flex items-center justify-between gap-2 px-2 py-1 mb-2 w-fit ${textColor} rounded-full border ${outlineColor} text-xs`}
        >
            <Icon size={"xxs"}/>
            {label}
        </div>
    );
}
const TimerChip = () => {
    const { label, Icon, textColor, outlineColor } = chips[2]
    return (
        <div
            className={`flex items-center justify-between gap-2 px-2 py-1 mb-2 w-fit ${textColor} rounded-full border ${outlineColor} text-xs`}
        >
            <Icon size={"xxs"}/>
            {label}
        </div>
    );
}
const PeriodicChip = () => {
    const { label, Icon, textColor, outlineColor } = chips[0]
    return (
        <div
            className={`flex items-center justify-between gap-2 px-2 py-1 mb-2 w-fit ${textColor} rounded-full border ${outlineColor} text-xs`}
        >
            <Icon size={"xxs"}/>
            {label}
        </div>
    );
}

export const RepeatExample = () => {
    return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-transparent md:p-12">
            <RepeatChip />
            <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-5xl">
                "Repeat" type
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">
                Lets you define number of times a task needs to be done before
                marked as completed
            </p>
        </div>
    );
}
export const TimerExample = () => {
    return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-transparent md:p-12">
            <TimerChip />
            <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-5xl">
                "Timer" type
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">
                Lets you define how long you need to do the task before it will
                be marked as completed
            </p>
        </div>
    );
}
export const PeriodicExample = () => {
    return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-transparent md:p-12">
            <PeriodicChip />
            <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-5xl">
                "Periodic" type
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">
                Lets you define period during which you can complete (or fail) the task
            </p>
        </div>
    );
}
export const TypesExamples = () => {
    return (
        <div className="mb-8 flex flex-col  lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8">
        {/* <div className="mb-8 flex flex-wrap gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8"> */}
            <RepeatExample/>
            <TimerExample/>
            <PeriodicExample/>
        </div>
    )
}
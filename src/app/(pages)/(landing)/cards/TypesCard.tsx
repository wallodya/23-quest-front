import PeriodIcon from "components/icons/PeriodIcon";
import RepeatIcon from "components/icons/RepeatIcon";
import TimerIcon from "components/icons/TimerIcon";
import { IconSizes } from "components/icons/icons.utils";
import Link from "next/link";

export const chips = [
    {
        label: "Periodic",
        textColor: "text-sky-700",
        outlineColor: "border-sky-700",
        Icon: ({ size }: { size: IconSizes }) => <PeriodIcon size={size} />,
    },
    {
        label: "Repeat",
        textColor: "text-violet-500",
        outlineColor: "border-violet-500",
        Icon: ({ size }: { size: IconSizes }) => <RepeatIcon size={size} />,
    },
    {
        label: "Timer",
        textColor: "text-fuchsia-600",
        outlineColor: "border-fuchsia-600",
        Icon: ({ size }: { size: IconSizes }) => <TimerIcon size={size} />,
    },
] as const;

export const TypesCard = () => {
    return (
        <div className="flex flex-col items-start mb-8 rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800 md:p-12">
            <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-5xl">
                Select types for each task
            </h1>
            <div className='my-6 flex gap-4'>
                {chips.map(({textColor, label, outlineColor, Icon}, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between gap-2 px-2 py-1 ${textColor} rounded-full border-2 ${outlineColor}`}
                    >
                        <Icon size={"sm"}/>
                        {label}
                    </div>
                ))}
            </div>
            <Link
                href="/sign-up"
                className="mt-auto inline-flex items-center justify-center rounded-lg bg-sky-400 py-2.5 px-5 text-center text-base font-medium text-slate-100 hover:bg-sky-500 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-900"
            >
                Try it
                <svg
                    aria-hidden="true"
                    className="ml-2 -mr-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </Link>
        </div>
    );
}
import CrossIcon from "components/icons/CrossIcon";
import Button from "components/ui/Button";
import Link from "next/link";

export const Void = ({ toggleFn }: { toggleFn: () => void }) => (
    <div className={`w-full dark:bg-slate-800/70`} onClick={toggleFn}></div>
);

export const Wrapper = ({
    toggleFn,
    isOpen,
}: {
    toggleFn: () => void;
    isOpen: boolean;
}) => {
    const drawerDisplayClass = isOpen ? "fixed" : "hidden";
    return (
        <div
            className={`${drawerDisplayClass} top-0 left-0 z-40 flex h-screen w-screen`}
        >
            <div className={` bg-slate-200 py-2 dark:bg-slate-700`}>
                <div className="flex w-full items-center justify-end">
                    <div className="">
                        <Button type="text" buttonProps={{ onClick: toggleFn }}>
                            <CrossIcon size="sm" />
                        </Button>
                    </div>
                </div>
            </div>
            <Void toggleFn={toggleFn}/>
        </div>
    )
}


export const Links = ({
    links,
}: {
    links: { name: string; link: string; Icon: () => JSX.Element }[];
}) => (
    <div className="pl-4 pr-10">
        {links.map(({ link, name, Icon }, index) => (
            <Link href={link} key={index} className="flex items-center gap-2">
                <Icon />
                {name}
            </Link>
        ))}
    </div>
);

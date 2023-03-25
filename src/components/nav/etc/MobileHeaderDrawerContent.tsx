import FileIcon from "components/icons/FileIcon"
import HomeIcon from "components/icons/HomeIcon"
import PersonIcon from "components/icons/PersonIcon"
import ReaderIcon from "components/icons/ReaderIcon"
import Button from "components/ui/Button"
import Link from "next/link"
import { ReactNode, useState } from "react"
import { useAppSelector } from "store/hooks"

type DrawerPageLink = {
    name: string,
    Icon: () => JSX.Element,
    href: string
}
const PAGE_LINKS: DrawerPageLink[] = [
    {
        name: "Home",
        Icon: () => <HomeIcon size="sm"/>,
        href: "/"
    },
    {
        name: "Quests",
        Icon: () => <ReaderIcon size="sm"/>,
        href: "/quests"
    },
    {
        name: "Tasks",
        Icon: () => <FileIcon size="sm"/>,
        href: "/tasks"
    },
    {
        name: "Profile",
        Icon: () => <PersonIcon size="sm"/>,
        href: "/profile"
    },
]

const DrawerHeaderDropDown = ({isShown} : {isShown: boolean}) => {
  return (
      <div
          style={
              isShown
                  ? { height: "fit-content", paddingBlock: "1rem", opacity: 1 }
                  : { height: 0, opacity: 0 }
          }
          className="flex flex-col items-start gap-3 overflow-hidden border-gray-700 px-2 transition-all"
      >
          <div className="mb-4 grid w-full grid-cols-2 gap-5">
              <div className="flex flex-col items-center gap-1 rounded-lg bg-gradient-to-tr from-indigo-900 to-indigo-600 px-1 py-2">
                  <span className="w-full border-b border-slate-300/20 text-center text-3xl font-bold">
                      2
                  </span>
                  <span className="text-xs text-slate-300/75">done today</span>
              </div>
              <div className="col-start-2 flex flex-col items-center gap-1 rounded-lg bg-gradient-to-tr from-sky-900 to-sky-600 px-1 py-2">
                  <span className="w-full border-b border-slate-300/20 text-center text-3xl font-bold">
                      3
                  </span>
                  <span className="text-xs text-slate-300/75">left today</span>
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
}


const ContenHeader = ({children} : {children: ReactNode}) => {
    const { login } = useAppSelector(state => state.user)

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="rounded-b-3xl bg-gradient-to-br from-gray-900 to-gray-800 px-5 pt-3 pb-2">
            {children}
            <div className="grid grid-cols-3 grid-rows-3 items-center my-2">
                <span className="col-start-1 row-span-2 w-fit justify-self-center overflow-hidden rounded-full border-2 border-inherit">
                    <PersonIcon size="lg" />
                </span>
                <span className="col-span-2 col-start-2 font-bold">
                    {login}
                </span>
                <span className="col-span-2 col-start-2 row-start-2 flex items-end text-xs italic text-gray-400">
                    owner
                </span>
                <div className="col-span-3 row-start-3 px-2">
                    <div className="w-full border-b border-gray-700"></div>
                </div>
            </div>

            <DrawerHeaderDropDown isShown={isExpanded}/>
            <div
                className="mb-2 flex justify-center text-xs font-bold text-gray-400 hover:text-gray-200"
                onClick={toggleExpanded}
            >
                {isExpanded ? "Show less" : "Show more"}
            </div>
        </div>
    );
}

const ContentLinks = ({ links, toggleFn }: { links: DrawerPageLink[], toggleFn: () => void }) => {
    return (
        <div className="px-4 flex flex-col gap-4 text text-slate-300">
            {
                links.map(({name, Icon, href}, index) => {
                    return (
                        <Link href={href} key={index} className="flex gap-4 items-center hover:text-slate-100 transition" onClick={toggleFn}> 
                            <span>
                                <Icon/>
                            </span>
                            <span>
                                {name}
                            </span>
                        </Link>
                    )
                })
            }
        </div>
    )
};

const MobileHeaderDrawerContent = ({
    children,
    toggleFn,
}: {
    children: ReactNode;
    toggleFn: () => void;
}) => {
    return (
        <div className="flex flex-col justify-between gap-8">
            <ContenHeader>{children}</ContenHeader>
            <ContentLinks links={PAGE_LINKS} toggleFn={toggleFn}/>
            <div className="px-4">
                <Button type="filled">Sign out</Button>
            </div>
        </div>
    );
};

export default MobileHeaderDrawerContent
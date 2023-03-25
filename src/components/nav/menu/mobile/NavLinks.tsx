import Link from "next/link";

export type DrawerPageLink = {
    name: string,
    Icon: () => JSX.Element,
    href: string
}

const NavLinks = ({ links, toggleFn }: { links: DrawerPageLink[], toggleFn: () => void }) => {
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
export default NavLinks
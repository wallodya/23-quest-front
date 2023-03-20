import React, { ReactNode } from 'react'

type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6

type HeadingProps = {
    level: HeadingLevels
} & React.HTMLAttributes<HTMLHeadingElement>

const Heading = ({level, children, ...props} : HeadingProps) => {
    switch (level) {
        case 1:
            return <h2 {...props}>{children}</h2>;
        case 2:
            return <h2 {...props}>{children}</h2>;
        case 3:
            return <h3 {...props}>{children}</h3>;
        case 4:
            return <h4 {...props}>{children}</h4>;
        case 5:
            return <h5 {...props}>{children}</h5>;
        case 6:
            return <h6 {...props}>{children}</h6>;
    }
}

export default Heading
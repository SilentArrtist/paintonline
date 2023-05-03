import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <g fill="#000">
            <path d="M12 20.75a7.25 7.25 0 1 1 0-14.5h2.5a.75.75 0 1 1 0 1.5H12a5.75 5.75 0 1 0 5.75 5.75.75.75 0 1 1 1.5 0A7.26 7.26 0 0 1 12 20.75Z" />
            <path d="M12 10.75a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06L13.94 7l-2.47-2.47a.75.75 0 1 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3a.74.74 0 0 1-.53.22Z" />
        </g>
    </svg>
)
export default SvgComponent

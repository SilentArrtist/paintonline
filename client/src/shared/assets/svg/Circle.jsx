import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        viewBox="0 0 32 32"
        {...props}
    >
        <circle cx={16} cy={16} r={16} />
    </svg>
)
export default SvgComponent

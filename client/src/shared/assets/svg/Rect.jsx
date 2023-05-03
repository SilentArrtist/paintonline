import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        viewBox="0 0 20 20"
        {...props}
    >
        <path
            stroke="#000"
            strokeWidth={2}
            d="M2.444 10c0 2.209-.222 5.293-.352 6.91A1.006 1.006 0 0 0 3.093 18h13.814c.588 0 1.048-.503 1-1.09-.13-1.617-.351-4.701-.351-6.91 0-2.158.212-5.153.343-6.798a1.02 1.02 0 0 0-1.1-1.095c-1.646.139-4.64.364-6.799.364-2.159 0-5.154-.225-6.799-.364a1.02 1.02 0 0 0-1.1 1.095c.131 1.645.343 4.64.343 6.798z"
        />
    </svg>
)
export default SvgComponent

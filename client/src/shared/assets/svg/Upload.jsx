import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        viewBox="0 0 32 32"
        {...props}
    >
        <title>{"upload-window"}</title>
        <path d="M0 26.016q0 2.496 1.76 4.224T6.016 32h4v-4h-4q-.832 0-1.44-.576T4 26.016V12h24v14.016q0 .832-.576 1.408T26.016 28h-4v4h4q2.464 0 4.224-1.76T32 26.016v-20q0-2.496-1.76-4.256T26.016 0h-20Q3.52 0 1.76 1.76T0 6.016v20zm4-16v-4q0-.832.576-1.408T6.016 4h20q.8 0 1.408.608T28 6.016v4H4zM6.016 8H8V6.016H6.016V8zm4 16h4v8h4v-8h4L16 16zm0-16H12V6.016h-1.984V8zm4 0h12V6.016h-12V8z" />
    </svg>
)
export default SvgComponent

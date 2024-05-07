const BarcodeSvg = ({text}) => (
    <svg
        width="32px"
        height="32px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
    >
        <g
            id="Symbols"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g id="avatar">
                <g id="Group-3">
                    <g id="Group">
                        <circle id="Oval" fill="#414042" cx="16" cy="16" r="16" />
                        <text
                            id="GT"
                            fontFamily="BrandonText-BoldItalic, Brandon Text"
                            fontSize="14"
                            fontStyle="italic"
                            fontWeight="bold"
                            letterSpacing="0.7"
                            fill="#F0F1F2"
                        >
                            <tspan x="6.843" y="21">
                                {text}
                            </tspan>
                        </text>
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

export default BarcodeSvg;

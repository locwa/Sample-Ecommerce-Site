export function Cart(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 36 36">
            <circle cx={13.33} cy={29.75} r={2.25} fill="currentColor"
                    className="clr-i-outline clr-i-outline-path-1"></circle>
            <circle cx={27} cy={29.75} r={2.25} fill="currentColor"
                    className="clr-i-outline clr-i-outline-path-2"></circle>
            <path fill="currentColor"
                  d="M33.08 5.37a1 1 0 0 0-.77-.37H11.49l.65 2H31l-2.67 12h-15L8.76 4.53a1 1 0 0 0-.66-.65L4 2.62a1 1 0 1 0-.59 1.92L7 5.64l4.59 14.5l-1.64 1.34l-.13.13A2.66 2.66 0 0 0 9.74 25A2.75 2.75 0 0 0 12 26h16.69a1 1 0 0 0 0-2H11.84a.67.67 0 0 1-.56-1l2.41-2h15.44a1 1 0 0 0 1-.78l3.17-14a1 1 0 0 0-.22-.85"
                  className="clr-i-outline clr-i-outline-path-3"></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
        </svg>
    )
}

export function LoadedCart(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 36 36">
            <circle cx={13.33} cy={29.75} r={2.25} fill="currentColor"
                    className="clr-i-outline--badged clr-i-outline-path-1--badged"></circle>
            <circle cx={27} cy={29.75} r={2.25} fill="currentColor"
                    className="clr-i-outline--badged clr-i-outline-path-2--badged"></circle>
            <path fill="currentColor" d="M22.57 7a7.5 7.5 0 0 1-.07-1a7.5 7.5 0 0 1 .07-1H11.49l.65 2Z"
                  className="clr-i-outline--badged clr-i-outline-path-3--badged"></path>
            <path fill="currentColor"
                  d="M30 13.5h-.42L28.33 19h-15L8.76 4.53a1 1 0 0 0-.66-.65L4 2.62a1 1 0 1 0-.59 1.92L7 5.64l4.59 14.5l-1.64 1.34l-.13.13A2.66 2.66 0 0 0 9.74 25A2.75 2.75 0 0 0 12 26h16.69a1 1 0 0 0 0-2H11.84a.67.67 0 0 1-.56-1l2.41-2h15.44a1 1 0 0 0 1-.78l1.57-6.91a7.5 7.5 0 0 1-1.7.19"
                  className="clr-i-outline--badged clr-i-outline-path-4--badged"></path>
            <circle cx={30} cy={6} r={5} fill="currentColor"
                    className="clr-i-outline--badged clr-i-outline-path-5--badged clr-i-badge"></circle>
            <path fill="none" d="M0 0h36v36H0z"></path>
        </svg>
    )
}

export function LeftCaret() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="17"
            fill="none"
            viewBox="0 0 10 17"
        >
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m8.969 1.166-7.43 7.421 7.43 7.422"
            ></path>
        </svg>

    )
}

export function RightCaret() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="17"
            fill="none"
            viewBox="0 0 10 17"
        >
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m1 1.092 7.5 7.492L1 16.076"
            ></path>
        </svg>
    )
}
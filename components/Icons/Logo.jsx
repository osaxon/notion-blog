const Logo = (props) => (
    <svg
        width={50}
        height={50}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M0 50V0h30v20A30 30 0 0 1 0 50Z" fill="#FF6154" />
        <path
            d="M39.902 18.979a4.055 4.055 0 1 0 0-8.11 4.055 4.055 0 0 0 0 8.11ZM39.902 39.13a4.055 4.055 0 1 0 0-8.109 4.055 4.055 0 0 0 0 8.11Z"
            fill="#FF6154"
            fillOpacity={0.71}
        />
    </svg>
);

export default Logo;

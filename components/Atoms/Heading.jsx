export default function Heading({ children, id, as: Element, ...props }) {
    const theId = id ?? getId(children);
    return (
        <Element id={theId} {...props}>
            {children}
        </Element>
    );
}

function getId(children) {
    return children
        .split(" ")
        .map((word) => word.toLowerCase())
        .join("-");
}

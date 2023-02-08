export default function Head({ params: { slug } }) {
    return (
        <>
            <title>{slug}</title>
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
        </>
    );
}

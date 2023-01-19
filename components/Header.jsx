import Link from "next/link";

export default function Header() {
    return (
        <header className="from-base z-50 w-full bg-gradient-to-b to-transparent backdrop-blur-lg">
            <nav className="mx-auto max-w-5xl w-11/12 border-b-2">
                <div className="flex h-12 items-center justify-between">
                    <Link
                        className="font-mono text-2xl font-bold text-base-content"
                        href="/"
                    >
                        O/G
                    </Link>
                </div>
            </nav>
        </header>
    );
}

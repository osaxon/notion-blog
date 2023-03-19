const siteConfig = {
    // Site meta
    title: "OG Travel",
    description: "A travel blog by Oli Saxon and Giovana De-sortis",
    name: "ogtravel.blog",
    url: "https://www.ogtravel.blog",
    type: "website",
    robots: "follow index",
    image: "",

    // site config
    navMenu: [
        {
            id: 1,
            title: "Home",
            href: "/",
            hasChildren: false,
            children: null,
        },
        {
            id: 2,
            title: "Places",
            href: "/",
            hasChildren: true,
            children: [
                {
                    id: 21,
                    title: "Vietnam",
                    href: "/",
                },
                {
                    id: 22,
                    title: "Thailand",
                    href: "/",
                },
                {
                    id: 23,
                    title: "Cambodia",
                    href: "/",
                },
                {
                    id: 24,
                    title: "Laos",
                    href: "/",
                },
            ],
        },
        {
            id: 3,
            title: "Gallery",
            href: "/gallery",
            hasChildren: false,
            children: null,
        },
    ],
};

export default siteConfig;

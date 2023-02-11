/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
    siteUrl: "https://webjenga.com.com",
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [{ userAgent: "*", allow: "/" }],
        additionalSitemaps: ["https//webjenga.com/server-sitemap-index.xml"],
    },
    exclude: ["/gallery/p/*", "/server-sitemap-index.xml"],
};

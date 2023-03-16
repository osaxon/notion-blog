import uniq from "lodash/uniq";

export function extractTags(data) {
    const tags = [];
    data.forEach((d) => d.tags.forEach((tag) => tags.push(tag)));
    return uniq(tags);
}

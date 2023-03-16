import cloudinary from "../utils/cloudinary";

export default async function getImages() {
    const results = await cloudinary.v2.search
        .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
        .sort_by("uploaded_at", "desc")
        .with_field("tags")
        .max_results(400)
        .execute();
    let images = [];
    let i = 0;
    for (let result of results.resources) {
        images.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
            tags: result.tags,
        });
        i++;
    }

    return images;
}

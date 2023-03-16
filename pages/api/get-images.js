import cloudinary from "../../utils/cloudinary";

export default async function handler(req, res) {
    try {
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
        return res.status(200).json(images);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message ?? "Internal Server Error",
            });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

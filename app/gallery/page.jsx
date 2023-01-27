import GalleryPage from "./GalleryPage";
import cloudinary from "../../utils/cloudinary";

async function getImages() {
    const results = await cloudinary.v2.search
        .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
        .sort_by("public_id", "desc")
        .max_results(400)
        .execute();
    let reducedResults = [];

    console.log(results);

    let i = 0;
    for (let result of results.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
        });
        i++;
    }

    return { images: reducedResults };
}

export default async function Page() {
    const { images } = await getImages();
    console.log(images);
    return <GalleryPage images={images} />;
}

import Image from "next/image";
import Link from "next/link";
import cloudinary from "../../utils/cloudinary";

async function getLatestPhotos() {
    const results = await cloudinary.v2.search
        .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
        .sort_by("uploaded_at", "desc")
        .with_field("metadata")
        .max_results(8)
        .execute();
    let reducedResults = [];

    let i = 0;
    for (let result of results.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
            data: result,
        });
        i++;
    }

    return {
        images: reducedResults,
    };
}

export default async function LatestPhotos({ image }) {
    const { images } = await getLatestPhotos();
    console.log(images);
    return (
        <section className="layout py-3 @container h-full flex flex-col items-start">
            <h2 className="text-4xl font-bold bg-primary text-base-100 mb-2">
                {"/// Latest Photos"}
                {image ?? <>{image}</>}
            </h2>
            <ul className="columns-1 @xl:columns-2 gap-3 w-full">
                {images &&
                    images.map((image) => {
                        return (
                            <Link
                                key={image.public_id}
                                shallow={true}
                                href={`/gallery?photoId=${image.id}`}
                            >
                                <li className="mb-3">
                                    <Image
                                        alt=""
                                        width={640}
                                        height={400}
                                        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${image.public_id}.${image.format}`}
                                    />
                                </li>
                            </Link>
                        );
                    })}

                <Link
                    className="h-full border bg-primary text-primary-content text-3xl font-bold"
                    href="/gallery"
                >
                    View More...
                </Link>
            </ul>
        </section>
    );
}

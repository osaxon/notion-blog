"use client";
import SectionHeader from "../Atoms/SectionHeader";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import Image from "next/image";
import Emoji from "../Atoms/Emoji";

const AboutUs = () => {
    const [open, cycleOpen] = useCycle(false, true);

    return (
        <section className="layout flex flex-col items-start">
            <SectionHeader text="About Us" />
            <p className="py-6">Hi there! Our names are Oli & Giovanna.</p>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="my-4 bg-base-100"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "auto",
                            opacity: "100%",
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: { delay: 0.2, duration: 0.2 },
                        }}
                        transition={{
                            type: "spring",
                        }}
                    >
                        <motion.div
                            className="flex flex-col items-center gap-6 p-3 md:flex-row md:items-stretch"
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <Image
                                src="https://res.cloudinary.com/djaiep6vj/image/upload/ar_1:1,c_fill,e_art:hokusai,g_auto,w_1000/v1678878475/travel_photos/DSC00156_DxO_iwq6df.jpg"
                                width={200}
                                height={200}
                                alt="avatar of oli and giovanna"
                                className="mask mask-hexagon"
                            />
                            <section>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Sunt inventore fugiat,
                                    ratione perspiciatis necessitatibus deserunt
                                    vitae est porro ut possimus alias sint nobis
                                    hic cum unde, obcaecati quia animi
                                    excepturi, fuga voluptatem. Reprehenderit
                                    totam veniam minus animi dolores eligendi
                                    placeat maxime ullam accusantium
                                </p>
                                <div className="my-4 flex gap-4">
                                    <a
                                        className="link hover:link-success"
                                        href="mailto:oliverrsaxon@gmail.com"
                                    >
                                        <Emoji symbol={"✉️"} /> Email us
                                    </a>
                                    <a
                                        className="link hover:link-success"
                                        href="https://www.workaway.info/en/workawayer/osaxon/journey"
                                    >
                                        <Emoji symbol={"🌏"} /> Workaway profile
                                    </a>
                                </div>
                            </section>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <button onClick={cycleOpen} className="btn">
                {!open ? "Read more" : "That's enough"}
            </button>
        </section>
    );
};

export default AboutUs;

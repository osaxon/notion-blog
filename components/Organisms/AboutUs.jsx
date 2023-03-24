"use client";
import SectionHeader from "../Atoms/SectionHeader";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import Image from "next/image";

const AboutUs = () => {
    const [open, cycleOpen] = useCycle(false, true);

    return (
        <section className="layout flex flex-col items-start">
            <SectionHeader text="About Us" />
            <p className="py-6">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Quisquam fugit vero rem pariatur ipsam magnam maxime sequi.
                Laborum, iste aut!
            </p>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="bg-base-100"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "calc(35vh)",
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
                            className="flex gap-6 p-3"
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <Image
                                src="https://res.cloudinary.com/djaiep6vj/image/upload/ar_1:1,c_fill,e_art:hokusai,g_auto,w_1000/v1678878475/travel_photos/DSC00156_DxO_iwq6df.jpg"
                                width={248}
                                height={165}
                                alt="avatar of oli and giovanna"
                                className="mask mask-circle"
                            />
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sunt inventore fugiat, ratione
                                perspiciatis necessitatibus deserunt vitae est
                                porro ut possimus alias sint nobis hic cum unde,
                                obcaecati quia animi excepturi, fuga voluptatem.
                                Reprehenderit totam veniam minus animi dolores
                                eligendi placeat maxime ullam accusantium
                                temporibus nostrum labore unde illo impedit rem
                                necessitatibus, eos laboriosam. Officia
                                distinctio veritatis, dolor magnam aliquid error
                                nam eos officiis similique beatae suscipit
                                consectetur deleniti eius nulla vel odit!
                                Dolorum, beatae at.
                            </p>
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

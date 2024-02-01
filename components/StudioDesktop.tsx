import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRef, useState, useEffect } from "react";

const media = [
    {
        src: "/studio/Image1.png",
        title:"Title",
        artist:"Artist",
    },
    {
        src: "/studio/Image2.png",
        title:"Title",
        artist:"Artist",
    },
    {
        src: "/studio/Image3.png",
        title:"Title",
        artist:"Artist",
    },
    {
        src: "/studio/Image4.png",
        title:"Title",
        artist:"Artist",
    },
    {
        src: "/studio/Image5.png",
        title:"Title",
        artist:"Artist",
    },
    {
        src: "/studio/Image6.png",
        title:"Title",
        artist:"Artist",
    },
    {
        src: "/studio/Video1.mp4",
        title:"Title",
        artist:"Artist",
        type: "video",
    },
    {
        src: "/studio/Video2.mp4",
        title:"Title",
        artist:"Artist",
        type: "video",
    },
    {
        src: "/studio/Video3.mp4",
        title:"Title",
        artist:"Artist",
        type: "video",
    },
];

export default function StudioDesktop() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const videoRefs = useRef(Array(media.length).fill(null));

    useEffect(() => {
        videoRefs.current = videoRefs.current.map((_, index) => videoRefs.current[index] || document.createElement("video"));
        
    }, []);


    const defaultStyles = {
        border: "1px solid #FEFEFE",
        opacity: "0.3",
        transition: "all ease-in-out 0.2s",
    };

    const hoverStyles = {
        border: "1px solid #FEFEFE",
        boxShadow: "0px 0px 10px 0px #AEFD38, inset 0px 0px 10px 0px #AEFD38",
        opacity: "1",
        transition: "all ease-in-out 0.2s",
    };

    const handleMouseEnter = (index:any) => {
        setHoveredIndex(index);
        if (videoRefs.current[index]) {
            videoRefs.current[index].play();
            videoRefs.current[index].loop = true;
        }
    };

    const handleMouseLeave = (index:any) => {
        setHoveredIndex(null);
        if (videoRefs.current[index]) {
            videoRefs.current[index].pause();
            videoRefs.current[index].currentTime = 0;
            videoRefs.current[index].loop = false;
        }
    };

    return (
                    <div className="flex flex-wrap gap-[15px] justify-center">
                        {media.map((item, index) => (
                            <div
                                key={index}
                                className="p-[20px]"
                                style={index === hoveredIndex ? hoverStyles : defaultStyles}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                {item.type === "video" ? (
                                    <video className="w-[260px] h-[260px]" playsInline ref={(el) => (videoRefs.current[index] = el)}>
                                        <source src={item.src}></source>
                                    </video>
                                ) : (
                                    <img className="w-[260px] h-[260px]" src={item.src} alt={`Media ${index + 1}`} />
                                )}
                                <div className="mt-[20px]">
                        <h3 className="uppercase text-center" style={{ opacity: index === hoveredIndex ? "1" : "0.3" }}>{item.title}</h3>
                        <h3 className="text-[26px] uppercase text-center" style={{ opacity: index === hoveredIndex ? "1" : "0.3" }}>{item.artist}</h3>
                    </div>
                            </div>
                        ))}
                    </div>
    );
}

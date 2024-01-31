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
    const [gap, setGap] = useState<number>(0);
    const [marginBottom, setMarginBottom] = useState<number>(0);
    const videosRef = useRef<(HTMLVideoElement | null)[]>([]);

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

    useEffect(() => {
        function handleScroll() {
            const windowHeight = window.innerHeight;
            const triggerIn = windowHeight / 1.5;
            const triggerOut = windowHeight / 10;

            const middleIndex = media.findIndex((_, index) => {
                const element = document.getElementById(`media-${index}`);
                if (!element) return false;
                const { top, bottom } = element.getBoundingClientRect();
                return top <= triggerIn && bottom >= triggerOut
            });
            setHoveredIndex(middleIndex);
        }

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        const windowHeight = window.innerHeight;
        setGap(windowHeight / 5);
        setMarginBottom(windowHeight / 1.5);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (hoveredIndex !== null) {
            videosRef.current.forEach((video, index) => {
                if (video) {
                    if (index === hoveredIndex) {
                        video.play();
                        video.loop = true;
                    } else {
                        video.pause();
                        video.loop = false;
                        video.currentTime = 0; 
                    }
                }
            });
        }
    }, [hoveredIndex]);

    return (
        <div className="flex flex-col justify-center items-center mt-[100px]"
        style={{ gap: gap, marginBottom: marginBottom }}>
            {media.map((item, index) => (
                <div
                    key={index}
                    id={`media-${index}`}
                >
                    {item.type === "video" ? (
                        <video
                            ref={el => videosRef.current[index] = el}
                            src={item.src}
                            className="w-[260px] h-[260px] p-[20px]"
                            style={index === hoveredIndex ? hoverStyles : defaultStyles}
                        ></video>
                    ) : (
                        <img
                            className="w-[260px] h-[260px] p-[20px]"
                            style={index === hoveredIndex ? hoverStyles : defaultStyles}
                            src={item.src}
                            alt={`Media ${index + 1}`}
                        />
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

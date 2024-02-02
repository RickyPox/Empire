import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRef, useState, useEffect } from "react";

const media = [
    {
        src: "/studio/Image1.png",
    },
    {
        src: "/studio/Image2.png",
    },
    {
        src: "/studio/Image3.png",
    },
    {
        src: "/studio/Image4.png",
    },
    {
        src: "/studio/Image5.png",
    },
    {
        src: "/studio/Image6.png",
    },
    {
        src: "/studio/Video1.mp4",
        type: "video",
    },
    {
        src: "/studio/Video2.mp4",
        type: "video",
    },
    {
        src: "/studio/Video3.mp4",
        type: "video",
    },
];

export default function StudioDesktop() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const videoRefs = useRef(Array(media.length).fill(null));
    const [isMediaOpen, setIsMediaOpen] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null)
    const [selectedMediaType, setSelectedMediaType] = useState<string | undefined>()

    useEffect(() => {
        videoRefs.current = videoRefs.current.map((_, index) => videoRefs.current[index] || document.createElement("video"));
        document.body.style.overflowY = isMediaOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflowY ="auto";
        }
        
    }, [isMediaOpen]);



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


    const openModal = (index: any) => {
        setIsMediaOpen(true)
        setSelectedMedia(media[index].src);
        setSelectedMediaType(media[index].type);
    };

    const closeModal = (index:any) => {
        setIsMediaOpen(false);
        setSelectedMedia(null);
        setSelectedMediaType(undefined);
    }

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
                        <video className="w-[260px] h-[260px]" 
                        onClick={() => openModal(index)}
                        playsInline 
                        ref={(el) => (videoRefs.current[index] = el)}>
                            <source src={item.src}></source>
                        </video>
                    ) : (
                        <img onClick={() => openModal(index)} className="w-[260px] h-[260px]" src={item.src} alt={`Media ${index + 1}`} />
                    )}
                </div>
            ))}
            { isMediaOpen && <div className={`fixed bg-black/20 backdrop-blur-lg flex justify-center w-screen h-screen top-0 z-30`}>

                    <div className="w-full max-w-[1920px] relative">
                        <div className="p-[100px] flex justify-end" onClick={closeModal}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L18.5 18.5" stroke="#FDFDFD" stroke-width="2"/>
                                <path d="M18.5 1L0.999999 18.5" stroke="#FDFDFD" stroke-width="2"/>
                            </svg>
                        </div>
                        <div className="flex w-full absolute top-[50%] -translate-y-[50%] justify-center pointer-events-none">
                        {selectedMediaType === "video" ? (
                            selectedMedia && (
                            <video playsInline muted autoPlay loop className="max-h-[700px]">
                                <source src={selectedMedia}></source>
                            </video>
                        )
                    ) : (
                        selectedMedia && (
                            <img src={selectedMedia} className="max-h-[700px]" alt="Selected Media" />
                        )
                    )}
                            
                        </div>
                    </div>
                </div>}
        </div>
    );
}

import { useRef, useState, useEffect } from "react";
import {media} from "@/components/galleryArray"


export default function StudioDesktop() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [gap, setGap] = useState<number>(0);
    const [marginBottom, setMarginBottom] = useState<number>(0);
    const videosRef = useRef<(HTMLVideoElement | null)[]>([]);
    const [isMediaOpen, setIsMediaOpen] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null)
    const [selectedMediaType, setSelectedMediaType] = useState<string | undefined>()

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
        <div className="flex flex-col justify-center items-center mt-[100px]"
        style={{ gap: gap, marginBottom: marginBottom }}>
            {media.map((item, index) => (
                <div
                    key={index}
                    id={`media-${index}`}
                >
                    {item.type === "video" ? (
                        <video
                            onClick={() => openModal(index)}
                            ref={el => videosRef.current[index] = el}
                            className="w-[260px] h-[260px] p-[20px]"
                            playsInline 
                            style={index === hoveredIndex ? hoverStyles : defaultStyles}
                        >
                            <source src={item.src}></source>
                        </video>
                    ) : (
                        <img
                            onClick={() => openModal(index)}
                            className="w-[260px] h-[260px] p-[20px]"
                            style={index === hoveredIndex ? hoverStyles : defaultStyles}
                            src={item.src}
                            alt={`Media ${index + 1}`}
                        />
                    )}
                </div>
            ))}

            { isMediaOpen && <div className={`fixed bg-black/20 backdrop-blur-lg flex justify-center w-screen h-screen top-0 z-30`}>

            <div className="w-full max-w-[1920px] relative">
                <div className="p-[100px] flex justify-end" >
                    <svg onClick={closeModal} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L18.5 18.5" stroke="#FDFDFD" stroke-width="2"/>
                        <path d="M18.5 1L0.999999 18.5" stroke="#FDFDFD" stroke-width="2"/>
                    </svg>
                </div>
                <div className="flex w-full absolute top-[50%] -translate-y-[50%] justify-center pointer-events-none">
                {selectedMediaType === "video" ? (
                    selectedMedia && (
                    <video playsInline muted autoPlay loop className="max-h-[500px] px-[20px]">
                        <source src={selectedMedia}></source>
                    </video>
                )
            ) : (
                selectedMedia && (
                    <img src={selectedMedia} className="max-h-[500px] px-[20px]" alt="Selected Media" />
                )
            )}
                    
                </div>
            </div>
            </div>}
        </div>
    );
}

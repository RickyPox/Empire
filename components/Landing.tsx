import { motion } from "framer-motion";
import { useEffect, useState } from "react";



export default function LandingPage (){

  const [mouseX, setMouseX] = useState(1);
  const [mouseY, setMouseY] = useState(1);

  useEffect(() => {
    function handleMouseMove(event:any) {
        const { innerWidth, innerHeight } = window;
        const centerX = innerWidth / 2;
        const centerY = innerHeight / 2;
        const maxOffset = 30;
        const offsetX = event.clientX - centerX;
        const offsetY = event.clientY - centerY;
        const scaledOffsetX = (offsetX / centerX) * maxOffset; // Limits the movement to maxOffset
        const scaledOffsetY = (offsetY / centerY) * maxOffset; // Limits the movement to maxOffset
        setMouseX(scaledOffsetX);
        setMouseY(scaledOffsetY);
  
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const shadowX = -mouseX
  const shadowY = -mouseY

    return(
            <motion.div 
            initial={{opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
            className="flex justify-center items-center w-screen lg:mt-0 mt-[150px]">
                <div>
                    <div className="flex justify-between md:translate-y-[100%]">
                    <p>1/1s.
                            Carefully curated. <br></br>
                            Limited run.
                        </p>
                        <p>Built for the lovers,  believers <br></br> and leaders of Solana</p>
                    </div>
                    <div
                    className="relative">
                        <h1 className="relative z-10">Empire</h1>
                        <div className="empireGlow absolute top-0"
                        >
                            <motion.h1 className="textGlow" style={{ transform: `translatex(${shadowX}px) translatey(${shadowY}px)` }}>
                                Empire
                            </motion.h1>
                            <h1 
                            className="absolute">
                                Empire
                            </h1> 
                        </div>
                    </div>
                </div> 
            </motion.div>
    )
}
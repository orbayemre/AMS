import {useRef,useEffect} from "react";

export default function Lottie({link,width,height,autoplay=true,loop=true}){

    const AnimaRef = useRef();
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });
    if(loop){
        return(
            <lottie-player
                id="firstLottie"
                ref={AnimaRef}
                autoplay
                loop
                mode="normal"
                src={link}
                style={{ width: width, height: height }}
            ></lottie-player>
        )

    }
    else{
        
        return(
            <lottie-player
                id="firstLottie"
                ref={AnimaRef}
                autoplay
                mode="normal"
                src={link}
                style={{ width: width, height: height }}
            ></lottie-player>
        )
    }
}
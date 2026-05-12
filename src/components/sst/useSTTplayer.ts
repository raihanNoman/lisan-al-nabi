import { useEffect, useRef, useState } from "react";

export default function useWebAudioPlayer(uri?: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!uri) return;

        const audio = new Audio(uri);
        audioRef.current = audio;

        audio.onended = () => setIsPlaying(false);

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [uri]);

    const play = async () => {
        if (!audioRef.current) return;

        try {
            await audioRef.current.play();
            setIsPlaying(true);
        } catch (e) {
            console.log("❌ play error (user interaction needed)", e);
        }
    };

    const pause = () => {
        audioRef.current?.pause();
        setIsPlaying(false);
    };

    const stop = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    };

    return {
        play,
        pause,
        stop,
        isPlaying,
    };
}

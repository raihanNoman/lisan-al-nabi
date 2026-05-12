import { isWeb } from "@/constants/Platform";
import { Dispatch, SetStateAction, useRef, useCallback } from "react";

// Define a type for the return object for better DX
interface UseSTTWebReturn {
    startRecording: () => Promise<void>;
    stopRecording: () => void;
}

export default function useSTTweb(setUri: Dispatch<SetStateAction<string | undefined>>): UseSTTWebReturn {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const getSupportedMimeType = (): string => {
        const types = ["audio/webm;codecs=opus", "audio/ogg;codecs=opus", "audio/mp4", "audio/mpeg"];
        return types.find((type) => MediaRecorder.isTypeSupported(type)) || "";
    };

    const startRecording = useCallback(async () => {
        if (!isWeb) return;

        // 1. Clear previous data before starting
        chunksRef.current = [];

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mimeType = getSupportedMimeType();
            const recorder = new MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = recorder;

            recorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            recorder.onstop = () => {
                // Create the blob from the captured chunks
                const blob = new Blob(chunksRef.current, { type: mimeType });

                // Determine extension
                const extension = mimeType.includes("mp4") ? "m4a" : "webm";

                // Generate the URL
                const url = URL.createObjectURL(blob);
                setUri(url);

                console.log("🎧 Recording stopped. URL generated:", url);
            };

            // Start recording - request data every 1000ms to ensure chunks are captured
            recorder.start(1000);
        } catch (error) {
            console.error("Failed to start recording:", error);
        }
    }, [setUri]);

    const stopRecording = useCallback(() => {
        if (!isWeb) return;

        const recorder = mediaRecorderRef.current;

        // 1. Stop the recorder first to trigger 'onstop'
        if (recorder && recorder.state !== "inactive") {
            recorder.stop();
        }

        // 2. Stop all tracks to turn off the microphone hardware/indicator
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
    }, []);

    return { startRecording, stopRecording };
}

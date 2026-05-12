import ExpoDigitalInkRecognition, { RecognizeResult } from "expo-digital-ink-recognition";
import { useCallback, useEffect, useState } from "react";
import { Stroke } from "../sketch/type";

export default function useLetterRecognition() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<RecognizeResult["candidates"]>([]);

    useEffect(() => {
        async function init() {
            try {
                await ExpoDigitalInkRecognition.downloadModel("ar");
                const listModels = await ExpoDigitalInkRecognition.getDownloadedModels();

                console.info("🟢 loaded models for machine learning", listModels);
            } catch (e) {
                console.log("Err iniatializing machine learning models for arabic recognition", e);
            }
        }

        init();
    }, []);

    const checkLetter = useCallback(async (strokes: Stroke[]) => {
        if (loading) return;
        if (strokes.length === 0) {
            alert("Draw something first!");
            return false;
        }

        try {
            setLoading(true);
            setResults([]);
            // 1. Convert your Point[][] into InkStroke[] (which is InkPoint[])
            // We add a fake timestamp 't' because MLKit uses it for gesture velocity
            let currentTime = Date.now();

            const formattedStrokes = strokes.map((stroke) => {
                return stroke.map((point) => {
                    // Increment time for every single point to simulate motion
                    currentTime += 10;
                    return {
                        x: point.x,
                        y: point.y,
                        t: point.t || currentTime,
                    };
                });
            });

            // 2. Call your Swift module
            const result = await ExpoDigitalInkRecognition.recognize("ar", formattedStrokes);

            // 3. Display the top candidate
            if (result.candidates && result.candidates.length > 0) {
                const mostLikelyResult = result.candidates[0].text;
                setResults(result.candidates);

                // console.log("✅ Recognized", result.candidates);
                console.log(`✅ Result: ${mostLikelyResult}`);

                return mostLikelyResult;
            } else {
                console.log(`❌ [google-ink-recognizer] : no match found`);
                return false;
            }
        } catch (error) {
            console.error("Recognition failed:", error);
            alert(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { checkLetter, results, setResults, loading };
}

export type CheckLetter = ReturnType<typeof useLetterRecognition>["checkLetter"];

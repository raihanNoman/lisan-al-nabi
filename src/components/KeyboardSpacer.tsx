import { isAndroid } from "@/constants/Platform";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const PADDING_BOTTOM = isAndroid ? 4 : 20;

export default function KeyboardSpacer({ paddingBottom = PADDING_BOTTOM }: { paddingBottom?: number }) {
    const height = useSharedValue(paddingBottom);

    useKeyboardHandler(
        {
            onMove(e) {
                "worklet";
                height.value = e.height;
            },
        },
        [],
    );

    const rStyle = useAnimatedStyle(
        () => ({
            height: Math.abs(height.value),
            marginBottom: height.value > 0 ? 0 : withTiming(paddingBottom),
        }),
        [paddingBottom],
    );
    return <Animated.View style={rStyle} />;
}

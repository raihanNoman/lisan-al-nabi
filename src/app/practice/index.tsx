import { Text, View } from "@/components/themed";
import React from "react";
import { StyleSheet } from "react-native";
import {
  Draggable,
  Droppable,
  DropProvider,
} from "react-native-reanimated-dnd";

export default function PracticeScreen() {
  return (
    <View>
      <DropProvider>
        <Droppable onDrop={(data) => console.log("Dropped:", data)}>
          <View style={styles.dropZone}>
            <Text>Drop here</Text>
          </View>
        </Droppable>

        <Draggable data={{ id: "1", title: "Drag me!" }}>
          <View style={styles.item}>
            <Text>Drag me around!</Text>
          </View>
        </Draggable>
      </DropProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {},
  dropZone: {},
});

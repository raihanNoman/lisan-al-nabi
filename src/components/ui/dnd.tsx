import React, { useState, useMemo, useCallback } from "react";
import { StyleSheet, View, Pressable, LayoutAnimation } from "react-native";
import { Text } from "@/components/Themed";
import {
  Draggable,
  Droppable,
  DropProvider,
} from "react-native-reanimated-dnd";
import { SafeAreaView } from "react-native-safe-area-context";
import Arabic from "@/components/themed-arabic";
import { shuffle } from "../../../utils/array";

// 1. Define the word object to keep track of state
interface WordObject {
  id: string;
  text: string;
}

export default function PracticeScreen() {
  // Mocking the quote data for context
  const quote = { ar: ["الحمد لله رب العالمين"], en: ["Praise be to Allah"] };

  // 2. Initialize words with unique IDs
  const wordBank = useMemo(() => {
    return quote.ar[0].split(" ").map((word, i) => ({
      id: `word-${i}-${word}`,
      text: word,
    }));
  }, [quote.ar]);

  const [shuffledBank] = useState(() => shuffle([...wordBank]));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 3. Handlers
  const moveToSentence = useCallback(
    (id: string) => {
      if (selectedIds.includes(id)) return;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSelectedIds((prev) => [...prev, id]);
    },
    [selectedIds],
  );

  const removeFromSentence = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.translation}>{quote.en[0]}</Text>
      </View>

      <DropProvider>
        {/* SENTENCE AREA (The Drop Target) */}
        <Droppable onDrop={(data: any) => moveToSentence(data.id)}>
          <View style={styles.sentenceArea}>
            {selectedIds.length === 0 && <View style={styles.emptyLine} />}
            {selectedIds.map((id) => {
              const word = wordBank.find((w) => w.id === id);
              return (
                <Pressable key={id} onPress={() => removeFromSentence(id)}>
                  <View style={styles.wordBubble}>
                    <Arabic style={styles.arabicText}>{word?.text}</Arabic>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </Droppable>

        {/* TRAY AREA (The Word Bank) */}
        <View style={styles.tray}>
          {shuffledBank.map((word) => {
            const isUsed = selectedIds.includes(word.id);
            return (
              <View key={word.id} style={styles.wordPlaceholder}>
                {!isUsed && (
                  <Draggable data={word}>
                    <Pressable onPress={() => moveToSentence(word.id)}>
                      <View style={styles.wordBubble}>
                        <Arabic style={styles.arabicText}>{word.text}</Arabic>
                      </View>
                    </Pressable>
                  </Draggable>
                )}
              </View>
            );
          })}
        </View>
      </DropProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, alignItems: "center" },
  translation: { fontSize: 18, color: "#4B4B4B", fontWeight: "600" },
  sentenceArea: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    minHeight: 120,
    marginHorizontal: 16,
    paddingVertical: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#E5E5E5",
    alignContent: "flex-start",
    gap: 8,
  },
  emptyLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#E5E5E5",
    marginTop: 40,
  },
  tray: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 20,
    gap: 12,
    marginTop: "auto",
    marginBottom: 40,
  },
  wordPlaceholder: {
    width: 80,
    height: 50,
    backgroundColor: "#E5E5E5",
    borderRadius: 12,
  },
  wordBubble: {
    minWidth: 80,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E5E5",
    borderBottomWidth: 5, // Duo 3D effect
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  arabicText: {
    fontSize: 24,
    color: "#333",
  },
});

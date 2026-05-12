import { Text } from "@/components/themed";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../../redux/hooks";

type Option = { id: string; label: string };
const REPORT_OPTIONS: Option[] = [
  { id: "1", label: "Incorrect Recitation / Tajwīd Error" },
  { id: "2", label: "Incorrect Qur’ān Text" },
  { id: "3", label: "Disrespectful or Inappropriate Content" },
  { id: "4", label: "Off-topic or Irrelevant Content" },
  { id: "5", label: "Spam or Misleading Information" },
  { id: "6", label: "Harassment or Hostile Behavior" },
  { id: "7", label: "Copyright or Ownership Issue" },
];

export default function PracticeOptionsModal() {
  const router = useRouter();
  const [selected, setSelected] = useState<Option>();
  const [loading, setLoading] = useState(false);
  const quote = useAppSelector((s) => s.quote.current.quote);

  const submitReport = async (option: Option) => {
    setSelected(option);

    if (loading) return;
    setLoading(true);

    try {
      router.back();
      router.back();
    } catch (e) {
      console.log("error reporting", e);
      alert("There was an error reporting post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text type="title" style={styles.title}>
        Practice Quote
      </Text>
      <Text style={styles.subtitle}>
        Tell us what’s wrong. Your report helps keep the Quran learning
        environment respectful and accurate.
      </Text>

      <FlatList
        data={REPORT_OPTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            disabled={loading}
            style={styles.row}
            onPress={() => submitReport(item)}
          >
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingTop: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, flex: 1 },
  title: { fontSize: 26, fontWeight: "600", marginTop: 10 },
  subtitle: { marginTop: 8, opacity: 0.8, lineHeight: 18 },
  row: { paddingVertical: 16, borderBottomWidth: 1 },
  label: { fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalBox: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalText: { fontSize: 16, fontWeight: "500" },
});

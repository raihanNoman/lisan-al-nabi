import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Languages } from "../../../utils/languages";
import { MaxContentWidth } from "@/constants/theme";

export default function Modal_TranslationOptions() {
  return (
    <View>
      <View>
        <Text>Show word by word</Text>
      </View>

      <View>
        <Text>Show both</Text>
      </View>

      <ScrollView horizontal style={styles.horizantalPicker}>
        {Languages.map((ln) => (
          <View>
            <Text>{ln}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  horizantalPicker: { width: MaxContentWidth },
});

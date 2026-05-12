import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppSelector } from "../../../redux/hooks";

export default function Modal_Utility() {
  const { completedIDs, inReviewIDs, current } = useAppSelector((s) => s.quote);

  // const { isCompleted, isInReview } = useMemo(
  //   () => ({
  //     isCompleted:
  //       current.quote?.ref && completedIDs?.includes(current.quote?.ref),
  //     isInReview:
  //       current.quote?.ref && inReviewIDs?.includes(current.quote?.ref),
  //   }),
  //   [completedIDs, inReviewIDs, current.quote?.ref],
  // );
  return (
    <View>
      <Text>Copy butto</Text>

      <View>
        <View>
          <MaterialCommunityIcons name="bookmark" />
          <Text>Bookmark</Text>
        </View>

        <View>
          <MaterialCommunityIcons name="check" /> <Text>Mark as Complete</Text>
        </View>
      </View>

      <View>
        <Feather name="copy" />
        <Text>Copy arabic clipboard</Text>
      </View>

      <View>
        <Feather name="share" />
        <Text>Open references</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

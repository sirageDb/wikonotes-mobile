import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/core";
import { iFlashCard, RootStackParamList, Subtitle } from "../utils/types";
import { useNavigation } from "@react-navigation/core";
import AppLayout from "../components/Layout";
import SubTitleSection from "../components/SubTitleSection";
import { ScrollView } from "react-native";
import RessourcesSection from "../components/RessourcesSection";
//========================================================
export default function FlashCard(): JSX.Element {
  const route = useRoute<RouteProp<RootStackParamList, "FlashCard">>();

  const [flashCard, setFlashCard] = useState<iFlashCard>({
    title: route.params.flashCardTitle,
    _id: route.params.flashCard_id,
    ressource: route.params.flashCardRessources,
    tag: route.params.flashCardTags,
    subtitle: route.params.subtitles,
  });
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.setOptions({ title: route.params.flashCardTitle });
  });

  return (
    <AppLayout>
      <ScrollView>
        <View style={styles.tagsContainer}>
          {flashCard?.tag.map((tag: any, i: number) => {
            return (
              <Text style={styles.tag} key={i}>
                #{tag}
              </Text>
            );
          })}
        </View>
        <View>
          {flashCard?.subtitle.map((subtitle: Subtitle, i: number) => {
            return (
              <View style={styles.subTitleContainer} key={i}>
                <SubTitleSection key={i} title={subtitle.title} paragraphs={subtitle.paragraph} />
              </View>
            );
          })}

          <RessourcesSection ressources={flashCard?.ressource!} />
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  tag: {
    marginRight: 20,
  },

  subTitleContainer: {
    marginBottom: 20,
  },
});

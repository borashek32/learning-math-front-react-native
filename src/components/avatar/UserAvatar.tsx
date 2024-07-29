import { Image, StyleSheet, Text, View } from "react-native";
import { UserAvatarProps } from "./Avatar.types";
import { useTranslation } from "react-i18next";

export const UserAvatar = ({ source, name, small }: UserAvatarProps) => {
  const { t } = useTranslation();

  return (
    <View style={small ? {} : styles.imageContainer}>
      {source && typeof source === "string" && (
        <Image
          source={{ uri: source }}
          style={small ? styles.characterImageSmall : styles.characterImage}
        />
      )}
      {name && <View style={styles.textWrapper}>
        <Text style={styles.descText}>
          {t("profile.changeAvatar.youAre")} 
          {name} 
          {t("profile.changeAvatar.fromRickMorty")}
        </Text>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  characterImage: {
    borderRadius: 50,
    height: 100,
    margin: 5,
    resizeMode: "cover",
    width: 100,
  },
  characterImageSmall: {
    borderRadius: 25,
    height: 50,
    margin: 5,
    resizeMode: "cover",
    width: 50,
  },
  descText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600"
  },
  imageContainer: {
    flexDirection: "row",
    gap: 20,
    width: 250
  },
  textWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 4,
    width: 150
  }
});
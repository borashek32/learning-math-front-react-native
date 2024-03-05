import { Image, StyleSheet, Text, View } from "react-native"
import { UserAvatarProps } from './Avatar.type'
import { useTranslation } from "react-i18next"

export const UserAvatar = ({ source, name }: UserAvatarProps) => {
  const { t } = useTranslation()

  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: source }}
        style={styles.characterImage}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.descText}>
          {t('profile.changeAvatar.youAre')} 
          {name} 
          {t('profile.changeAvatar.fromRickMorty')}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    gap: 20,
    flexDirection: 'row',
    width: 250
  },
  characterImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    margin: 5,
    resizeMode: 'cover',
  },
  textWrapper: {
    flexDirection: 'row',
    marginBottom: 4,
    width: 150,
    alignItems: 'center'
  },
  descText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14
  }
})
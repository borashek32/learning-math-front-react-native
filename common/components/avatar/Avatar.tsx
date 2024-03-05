import { Image, StyleSheet, Text, View } from "react-native"
import { Props } from './Avatar.type'
import { BlueButton } from "../buttons/BlueButton"
import { useTranslation } from 'react-i18next'

export const Avatar = ({ 
  source, 
  name, 
  status, 
  species, 
  location, 
  onPress 
}: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: source }}
          style={styles.characterImage}
        />
        {name && 
          <View style={styles.desc}>
            {name && 
              <View style={styles.textWrapper}>
                <Text style={styles.descName}>{t('profile.changeAvatar.name')}:</Text>
                <Text style={styles.descText}>{name}</Text>
              </View>
            }
            {location &&
              <View style={styles.textWrapper}>
                <Text style={styles.descName}>{t('profile.changeAvatar.location')}:</Text>
                <Text style={styles.descText}>{location}</Text>
              </View>
            }
            {status && 
              <View style={styles.textWrapper}>
                <Text style={styles.descName}>{t('profile.changeAvatar.status')}:</Text>
                <Text style={styles.descText}>{status}</Text>
              </View>
            }
            {species && 
              <View style={styles.textWrapper}>
                <Text style={styles.descName}>{t('profile.changeAvatar.species')}:</Text>
                <Text style={styles.descText}>{species}</Text>
              </View>
            }
            <BlueButton 
              title={t('profile.changeAvatar.button')}
              source={source}
              avatarName={name}
              onPressWithValue={
                (source: string, name: string) => onPress(source, name)
              }
            />
          </View>
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    gap: 20,
    flexDirection: 'row',
    width: 250
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 5,
    resizeMode: 'cover',
  },
  desc: {
    width: 100,
  },
  textWrapper: {
    flexDirection: 'row',
    marginBottom: 4
  },
  descName: {
    color: 'gray',
    fontSize: 12
  },
  descText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14
  }
})
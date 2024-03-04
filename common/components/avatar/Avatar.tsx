import { Image, StyleSheet, Text, View } from "react-native"
import { Props } from './Avatar.type'

export const Avatar = ({ source, name, status, species, location }: Props) => {

  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: source }}
        style={styles.characterImage}
      />
      <View style={styles.desc}>
        <View style={styles.textWrapper}>
          <Text style={styles.descName}>Name:</Text>
          <Text style={styles.descText}>{name}</Text>
        </View>
        {location &&
          <View style={styles.textWrapper}>
            <Text style={styles.descName}>Location:</Text>
            <Text style={styles.descText}>{location}</Text>
          </View>
        }
        <View style={styles.textWrapper}>
          <Text style={styles.descName}>Status:</Text>
          <Text style={styles.descText}>{status}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.descName}>Species:</Text>
          <Text style={styles.descText}>{species}</Text>
        </View>
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
    width: 100,
    height: 100,
    margin: 5,
    resizeMode: 'cover',
  },
  desc: {
    width: 300,
  },
  textWrapper: {
    flexDirection: 'column',
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
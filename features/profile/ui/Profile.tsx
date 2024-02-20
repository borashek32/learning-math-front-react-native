import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'

export const Profile = () => {
  const [active, setActive] = useState(false)
  const { t } = useTranslation()

  return (
    <AppLayout title='Profile'>
      <View style={styles.container}>
      {/* <View style={styles.listItems}>
        <TouchableOpacity onPress={() => {}} style={styles.item}>
          <Text style={styles.itemLink}>
            {t('profile.changeEmail')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.item}>
          <Text style={styles.itemLink}>
            {t('profile.changePassword')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.item}>
          <Text style={styles.itemLink}>
            {t('profile.yourScore')}
          </Text>
        </TouchableOpacity>

        <View style={styles.footerDevideLine}></View>

        <TouchableOpacity onPress={() => {}} style={styles.item}>
          <DefaultButton type='button' name={t('buttons.logout')} />
        </TouchableOpacity>
      </View> */}
    </View>
    </AppLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItems: {
    padding: 20,
  },
  item: {
    marginBottom: 20,
  },
  itemLink: {
    color: 'blue', // or any color you prefer
    fontSize: 16,
  },
  footerDevideLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray', // or any color you prefer
    marginVertical: 20,
  },
})

import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

export const SelectLang = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'nav.select' })

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <View style={styles.selectWrapper}>
      <View>
        <Text style={styles.change}>{t('changeLang')}</Text>

        <RNPickerSelect
          style={pickerSelectStyles}
          value={i18n.language}
          onValueChange={(value) => changeLang(value)}
          items={[
            { label: t('options.en'), value: 'en' },
            { label: t('options.ru'), value: 'ru' },
          ]}
        />
      </View>
    </View>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
})

const styles = StyleSheet.create({
  selectWrapper: {
    alignItems: 'center',
  },
  change: {
    fontSize: 12,
    color: 'white',
    marginBottom: 4,
  },
})

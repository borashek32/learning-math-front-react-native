import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';

export const SelectLang = () => {
  const { t, i18n } = useTranslation('translation');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  }

  return (
    <View style={styles.selectWrapper}>
      <View style={styles.select}>
        <Text style={styles.change}>{t('nav.select.changeLang')}</Text>

        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          value={i18n.language}
          onValueChange={(value) => changeLang(value)}
          onOpen={() => setIsPickerOpen(true)}
          onClose={() => setIsPickerOpen(false)}
          items={[
            { key: 'ru', label: t('nav.select.options.ru'), value: 'ru', color: 'black' },
            { key: 'en', label: t('nav.select.options.en'), value: 'en', color: 'black' },
          ]}
          Icon={() => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  isPickerOpen ? styles.iconContainerOpen : styles.iconContainerClosed
                ]}
              />
            );
          }}
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
    width: 150,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
    width: 150,
  },
});

const styles = StyleSheet.create({
  selectWrapper: {
    position: 'relative',
  },
  select: {},
  change: {
    fontSize: 12,
    color: 'white',
    marginBottom: 4,
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 6,
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: 'gray',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
  },
  iconContainerOpen: {
    borderBottomWidth: 5,
    borderBottomColor: 'gray',
    borderTopWidth: 0,
  },
  iconContainerClosed: {
    borderTopWidth: 5,
    borderTopColor: 'gray',
    borderBottomWidth: 0,
  },
});

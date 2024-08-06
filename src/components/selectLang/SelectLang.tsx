import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';

export const SelectLang = () => {
  const { t, i18n } = useTranslation('translation');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.selectWrapper}>
      <View style={styles.select}>
        <Text style={styles.change}>{t('changeLang.select')}</Text>

        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          value={i18n.language}
          onValueChange={value => changeLang(value)}
          onOpen={() => setIsPickerOpen(true)}
          onClose={() => setIsPickerOpen(false)}
          items={[
            {
              key: 'ru',
              label: t('changeLang.options.ru'),
              value: 'ru',
              color: 'black',
            },
            {
              key: 'en',
              label: t('changeLang.options.en'),
              value: 'en',
              color: 'black',
            },
          ]}
          Icon={() => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  isPickerOpen
                    ? styles.iconContainerOpen
                    : styles.iconContainerClosed,
                ]}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingRight: 30,
    paddingVertical: 8,
    width: 150,
  },
  inputIOS: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingRight: 30,
    paddingVertical: 12,
    width: 150,
  },
});

const styles = StyleSheet.create({
  change: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderLeftWidth: 5,
    borderRightColor: 'transparent',
    borderRightWidth: 5,
    borderTopColor: 'gray',
    borderTopWidth: 5,
    height: 0,
    position: 'absolute',
    right: 6,
    top: 20,
    width: 0,
  },
  iconContainerClosed: {
    borderBottomWidth: 0,
    borderTopColor: 'gray',
    borderTopWidth: 5,
  },
  iconContainerOpen: {
    borderBottomColor: 'gray',
    borderBottomWidth: 5,
    borderTopWidth: 0,
  },
  select: {},
  selectWrapper: {
    position: 'relative',
  },
});

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ModalLayout } from '@components/layouts/ModalLayout';
import { BlueButton } from 'components/buttons/BlueButton';

import { Props } from './Modal.types';

export const Modal: React.FC<Props> = ({
  text,
  outlinedButton,
  buttonName,
  buttonCallback,
  open,
  error,
  color,
  buttonBack,
}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const back = () => navigation.goBack();

  const backgroundColorStyle = color ? { backgroundColor: color } : {};

  return (
    <ModalLayout>
      {open && (
        <View
          style={[
            styles.modal,
            error && styles.modalWithError,
            backgroundColorStyle,
          ]}>
          {text && <Text style={styles.textSmall}>{text}</Text>}
          <View style={styles.buttonWrapper}>
            {buttonBack && (
              <View style={outlinedButton ? styles.outlinedStyles : {}}>
                <BlueButton title={t('links.back')} onPress={back} />
              </View>
            )}
            {buttonCallback && (
              <View style={outlinedButton ? styles.outlinedStyles : {}}>
                <BlueButton
                  title={buttonName ? buttonName : 'Ok'}
                  onPress={buttonCallback}
                />
              </View>
            )}
          </View>
        </View>
      )}
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    flexDirection: 'column',
    height: 150,
    justifyContent: 'center',
    marginBottom: 20,
    width: 230,
    gap: 20,
  },
  modalWithError: {
    backgroundColor: '#fb6161',
  },
  outlinedStyles: {
    borderColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    color: '#fff',
  },
  textSmall: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
});

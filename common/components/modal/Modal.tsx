import React from 'react'
import { Props } from './Modal.type'
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

export const Modal: React.FC<Props> = ({ 
  text, 
  outlinedButton, 
  buttonName, 
  buttonCallback, 
  open,
  setOpen, 
  error,
  color,
  buttonBack
}) => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const back = () => navigation.goBack()

  return (
    <>
      {open && 
        <View style={[styles.modal, error && styles.modalWithError, color && { backgroundColor: color }]}>
          <Text style={styles.textSmall}>{text}</Text>
          <View style={styles.buttonWrapper}>
            <Button title={t('links.back')} onPress={back} />
            <Button title={buttonName ? buttonName : "Ok"} onPress={buttonCallback} />
          </View>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  modal: {
    width: 230,
    height: 150,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'white'
  },
  modalWithError: {
    backgroundColor: '#fb6161',
  },
  textSmall: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

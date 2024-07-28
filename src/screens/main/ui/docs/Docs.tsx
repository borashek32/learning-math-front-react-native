import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../../components/layouts/AppLayout'
import { ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { DevideLine } from '../../../../components/devideLine/DevideLine'

export const Docs = () => {
  const { t } = useTranslation()

  return (
    <AppLayout title={t('screens.instructions')}>
      <ScrollView contentContainerStyle={styles.menuItems}>
        <View style={styles.item}>
          <Text style={styles.itemLink}>{t('instructions.withoutRegister.title')}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLink}>{t('instructions.register.title')}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLink}>{t('instructions.changePassword.title')}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLink}>{t('instructions.changeEmail.title')}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLink}>{t('instructions.changeAvatar.title')}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLink}>{t('instructions.schoolProgram.title')}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemLink}>{t('instructions.parentalControl.title')}</Text>
        </View>
        <DevideLine />
        <View style={styles.descWrapper} id="withoutRegister">
        <Text style={styles.itemLink}>
          {t('instructions.withoutRegister.title')}
        </Text>

        <View>
          <Text style={styles.itemDesc}>
            - {t('instructions.withoutRegister.allowedTools.1.title')}
          </Text>
        </View>
        <View>
          <Text style={styles.itemDesc}>
            - {t('instructions.withoutRegister.allowedTools.2.title')}
          </Text>
        </View>
        <View>
          <Text style={styles.itemDesc}>
            - {t('instructions.withoutRegister.allowedTools.3.title')}
          </Text>
        </View>
        <View>
          <Text style={styles.itemDesc}>
            - {t('instructions.withoutRegister.allowedTools.4.title')}
          </Text>
        </View>
      </View>
      <View style={styles.descWrapper} id="register">
        <Text style={styles.itemLink}>
          {t('instructions.register.title')}
        </Text>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.register.allowedTools.1.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.register.allowedTools.1.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.register.allowedTools.1.desc.2')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.register.allowedTools.1.desc.3')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.register.allowedTools.1.desc.4')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.register.allowedTools.1.desc.5')}
          </Text>
        </View>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.register.allowedTools.2.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.register.allowedTools.2.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.register.allowedTools.2.desc.2')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.register.allowedTools.2.desc.3')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.register.allowedTools.2.desc.4')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.register.allowedTools.2.desc.5')}
          </Text>
        </View>
      </View>
      <View style={styles.descWrapper} id="passwordRecover">
      <Text style={styles.itemLink}>
        {t('instructions.passwordRecover.title')}
      </Text>

      <View style={styles.itemLinkWrapper}>
        <Text style={styles.itemDesc}>
          - {t('instructions.passwordRecover.allowedTools.1.title')}
        </Text>
        <Text style={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.1.desc.1')}
        </Text>
        <Text style={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.1.desc.2')}
        </Text>
      </View>

      <View style={styles.itemLinkWrapper}>
        <Text style={styles.itemDesc}>
          - {t('instructions.passwordRecover.allowedTools.2.title')}
        </Text>
        <Text style={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.2.desc.1')}
        </Text>
        <Text style={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.2.desc.2')}
        </Text>
      </View>

      <View style={styles.itemLinkWrapper}>
        <Text style={styles.itemDesc}>
          - {t('instructions.passwordRecover.allowedTools.3.title')}
        </Text>
        <Text style={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.3.desc.1')}
        </Text>
        <Text style={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.3.desc.2')}
        </Text>
        <Text style={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.3.desc.3')}
        </Text>
        <Text style={styles.itemDescP}>
          {t('instructions.passwordRecover.allowedTools.3.desc.4')}
        </Text>
      </View>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.passwordRecover.allowedTools.4.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.passwordRecover.allowedTools.4.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.passwordRecover.allowedTools.4.desc.2')}
          </Text>
        </View>
      </View>
      <View style={styles.descWrapper} id="changePassword">
        <Text style={styles.itemLink}>
          {t('instructions.changePassword.title')}
        </Text>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.changePassword.allowedTools.1.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.1.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.1.desc.2')}
          </Text>
        </View>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.changePassword.allowedTools.2.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.2.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.2.desc.2')}
          </Text>
        </View>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.changePassword.allowedTools.3.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.3.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.3.desc.2')}
          </Text>
        </View>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.changePassword.allowedTools.4.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.4.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.4.desc.2')}
          </Text>
        </View>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.changePassword.allowedTools.5.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changePassword.allowedTools.5.desc.1')}
          </Text>
        </View>
      </View>
      <View style={styles.descWrapper} id="changeEmail">
        <Text style={styles.itemLink}>
          {t('instructions.changeEmail.title')}
        </Text>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.changeEmail.allowedTools.1.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.1.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.1.desc.2')}
          </Text>
        </View>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.changeEmail.allowedTools.2.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.2.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.2.desc.2')}
          </Text>
        </View>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.changeEmail.allowedTools.3.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.3.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.3.desc.2')}
          </Text>
        </View>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.changeEmail.allowedTools.4.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.4.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeEmail.allowedTools.4.desc.2')}
          </Text>
        </View>
      </View>
      <View style={styles.descWrapper} id="changeAvatar">
        <Text style={styles.itemLink}>
          {t('instructions.changeAvatar.title')}
        </Text>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.changeAvatar.allowedTools.1.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeAvatar.allowedTools.1.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeAvatar.allowedTools.1.desc.2')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeAvatar.allowedTools.1.desc.3')}
          </Text>
        </View>

        <View style={styles.itemLinkWrapper}>
          <Text style={styles.itemDesc}>
            - {t('instructions.changeAvatar.allowedTools.2.title')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeAvatar.allowedTools.2.desc.1')}
          </Text>
          <Text style={styles.itemDescP}>
            {t('instructions.changeAvatar.allowedTools.2.desc.2')}
          </Text>
        </View>
      </View>
      <View style={styles.descWrapper} id="schoolProgram">
        <Text style={styles.itemLink}>
          {t('instructions.schoolProgram.title')}
        </Text>
        <Text style={styles.itemDesc}>
          {t('instructions.schoolProgram.desc')}
        </Text>
      </View>
      <View style={styles.descWrapper} id="parentalControl">
        <Text style={styles.itemLink}>
          {t('instructions.parentalControl.title')}
        </Text>
        <Text style={styles.itemDesc}>
          {t('instructions.parentalControl.desc')}
        </Text>
      </View>
      </ScrollView>
    </AppLayout>
  )
}

export const styles = StyleSheet.create({
  docsWrapper: {
    padding: 50,
    paddingHorizontal: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  menuItems: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 20 // добавил вертикальный отступ для ScrollView
  },
  item: {
    marginBottom: 20, 
    borderRadius: 5
  },
  itemLink: {
    color: '#fff',
    textAlign: 'center' 
  },
  descWrapper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  itemLinkWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  itemDesc: {
    color: '#fff',
    fontSize: 18
  },
  itemDescP: {
    color: '#fff',
    fontSize: 14,
    paddingLeft: -20 // В React Native не нужно использовать отрицательное значение для paddingLeft
  }
})

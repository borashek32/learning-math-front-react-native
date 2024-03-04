import React from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { styles } from '../../home/Home.styles'
import { Loader } from '../../../common/components/loaders/CircularLoader'
import { CharacterType } from '../rickMorty/rickMorty.types'
import { useGetAvatarsQuery } from '../rickMorty/rickMorty.api'
import { Avatar } from '../../../common/components/avatar/Avatar'

export const ChangeAvatar = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useGetAvatarsQuery()
  
  return (
    <>
      {isLoading && <Loader />}
      <AppLayout title={t('profile.changeAvatar.title')}>
        <ScrollView contentContainerStyle={styles.menuContainer}>
          {data && data.results.map((item: CharacterType) => (
            <Avatar 
              key={item.id}
              source={item.image}
              name={item.name}
              status={item.status}
              species={item.species}
            />
          ))}
        </ScrollView>
      </AppLayout>
    </>
  )
}

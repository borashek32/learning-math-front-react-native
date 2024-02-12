import { GoTo } from '../../../../common/components/goTo/GoTo'
import { Header } from '../../../../common/components/header/Header'
import styles from './Docs.module.sass'

export const Docs = () => {

  return (
    <>
      <GoTo address='/' name='Back to Main' />
      <Header title='Common Instructions' />
    </>
  )
}
import { useState } from "react"
import { generateRandomNumber } from "../../../utils/math/generateRandomNumber"
import { AnswerType } from "../../../types/mathOperations.types"
import { useDispatch } from "react-redux"
import { useUpdateScoreMutation } from "../../../api/profile/profile.api"
import { useFormSchema } from "../../../utils/math/validationShemaMathOperations"
import { useTranslation } from "react-i18next"
import { Loader } from "../../../components/loaders/CircularLoader"
import { Modal } from "../../../components/modal/Modal"
import { Error } from "../../../components/error/Error"
import { AppLayout } from "../../../components/layouts/AppLayout"
import { AppText } from "../../../components/text/AppText"
import { MathExampleLayout } from "../../../components/layouts/MathExamlpeLayout"
import { Keyboard, StyleSheet, Vibration, View } from "react-native"
import { MathOperationButton } from "../../../components/buttons/MathOperationButton"
import { MathOperation } from "../../../components/mathOperation/MathOperation"
import { MathSignsConstants } from "../../../constants/MathConstants"
import { ResultInput } from "../../../components/inputs/ResultInput"
import { ButtonsLayout } from "../../../components/layouts/ButtonsLayout"
import { Score } from "../../../components/score/Score"
import { VIBRATION_PATTERN } from "../../../constants/vibration"
import { setTotalUserScore } from "../../../redux/slices/profile.slice"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { ScoreType } from "../../../api/profile/profile.api.types"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { selectUserId } from "../../../redux/selectors/auth.selectors"
import { yupResolver } from "@hookform/resolvers/yup"
import { SvgUri } from "react-native-svg"

export const Numbers = () => {
  const [score, setScore] = useState(0)

  const [number, setNumber] = useState((generateRandomNumber(1, 10)))
  const [answer, setAnswer] = useState<string>('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [serverError, setServerError] = useState('')
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const formSchema = useFormSchema()

  const { t } = useTranslation()

  const numbers: Array<number> = [];
  for (let i = 1; i <= number; i++) {
    numbers.push(i)
  }
  
  const onGenerateNewNumbers = () => {
    setAnswer('')
    setOpen(false)
    setNumber(generateRandomNumber(1, 10))
  }

  const onChangeHandler = (answer: string) => {
    setAnswer(answer)
  }

  const {
    handleSubmit,
    reset,
  } = useForm<ScoreType>({
    defaultValues: {
      score: score,
      userId: useAppSelector(selectUserId), 
      date: new Date()
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema) as Resolver<ScoreType>,
  })
  
  const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
    setServerError('')
    Keyboard.dismiss()

    if (number === Number(answer)) {
      setScore(score + 1)
      setRightWrong('right')
      data = { ...data, score: 1 }

    } else {
      Vibration.vibrate(VIBRATION_PATTERN)
      setScore(score - 1)
      setRightWrong('wrong')
      data = { ...data, score: -1 }
    }
    
    updateScore(data)
      .unwrap()
      .then(response => {
        reset()
        setOpen(true)
        dispatch(setTotalUserScore(response.data.score))
      })
      .catch((e: any) => {
        if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'))
      })
  }

  const onPressPlayMore = () => {
    setOpen(false)
    onGenerateNewNumbers()
    setAnswer('')
  }

  const onPressTryAgain = () => {
    setOpen(false)
    setAnswer('')
  }

  return (
    <>
      {isLoading && <Loader />}
      {open && (
        <Modal
          text={
            rightWrong === 'right' 
              ? t('modal.checkMathOperationSuccess') 
              : t('modal.checkMathOperationFail')
            }
          open={open}
          outlinedButton={false}
          buttonName={t('modal.button')}
          buttonCallback={rightWrong === 'right' ? onPressPlayMore : onPressTryAgain}
          color={rightWrong === 'right' ? 'blue' : 'red'}
        />
      )}
      <AppLayout title={t('preSchool.numbers.title')}>
        {serverError && <Error error={serverError} />}
        <AppText desc={t('preSchool.numbers.desc')} />
    
      <MathExampleLayout>
        <View style={styles.imagesContainer}>
          {numbers && numbers.map((item: number) => {
            return (
              <SvgUri
                key={item}
                uri="https://www.svgrepo.com/show/434029/cat.svg"
                width="34px"
                height="34px"
              />
            )
          })}
        </View>

        <MathOperation title={MathSignsConstants.EQUAL} />

        <ResultInput
          value={answer} 
          onChange={onChangeHandler}
        />
      </MathExampleLayout>

      <ButtonsLayout>
        <MathOperationButton
          buttonCallback={onGenerateNewNumbers}
          title={t('mathOperations.common.generate')}
        />
        <MathOperationButton
          buttonCallback={handleSubmit(onSubmit)}
          title={t('mathOperations.common.check')}
          disabled={!answer}
        />
      </ButtonsLayout>

      <Score score={score} />
      </AppLayout>
    </>
  )
}

const styles = StyleSheet.create({
  imagesContainer: {
    width: 160,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 20
  },
})
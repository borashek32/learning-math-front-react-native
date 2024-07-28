import React, { useState } from 'react'
import { MathOperation } from '../../../../components/mathOperation/MathOperation'
import { Digit } from '../../../../components/digit/Digit'
import { ResultInput } from '../../../../components/inputs/ResultInput'
import { Score } from '../../../../components/score/Score'
import { AppLayout } from '../../../../components/layouts/AppLayout'
import { useTranslation } from 'react-i18next'
import { yupResolver } from "@hookform/resolvers/yup"
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateScoreMutation } from '../../../../api/profile/profile.api'
import { ScoreType } from '../../../../api/profile/profile.api.types'
import { Loader } from '../../../../components/loaders/CircularLoader'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { selectUserId } from '../../../../redux/selectors/auth.selectors'
import { Modal } from '../../../../components/modal/Modal'
import { AnswerType } from '../../../../types/mathOperations.types'
import { Error } from '../../../../components/error/Error'
import { useFormSchema } from '../../../../utils/math/validationShemaMathOperations'
import { ButtonsLayout } from '../../../../components/layouts/ButtonsLayout'
import { MathOperationButton } from '../../../../components/buttons/MathOperationButton'
import { MathExampleLayout } from '../../../../components/layouts/MathExamlpeLayout'
import { useDispatch } from 'react-redux'
import { setTotalUserScore } from '../../../../redux/slices/profile.slice'
import { MathOperationsConstants, MathSignsConstants } from '../../../../constants/MathConstants'
import { checkMathOperation } from '../../../../utils/math/checkMathOperation'
import { generateRandomNumber } from '../../../../utils/math/generateRandomNumber'
import { Keyboard, Vibration } from 'react-native'
import { VIBRATION_PATTERN } from '../../../../patterns/vibration'

type Props = {
  route: {
    params: {
      mathOperation: string
    }
  }
}

export const SummDifference: React.FC<Props> = ({ route }) => {
  const { mathOperation } = route.params

  // summ difference
  const [firstNumber, setFirstNumber] = useState<number>(generateRandomNumber(10, 20))
  const [secondNumber, setSecondNumber] = useState<number>(generateRandomNumber(1, 10))
  const [thirdNumber, setThirdNumber] = useState<number>(null)
  const [fourthNumber, setFourthNumber] = useState<number>(null)
  const [score, setScore] = useState(0)
  // multiplication
  // const [firstMultiplier, setFirstMultiplier] = useState<number>(Math.floor(Math.random() * 8) + 2)
  // const [secondMultiplier, setSecondMultiplier] = useState<number>(Math.floor(Math.random() * 8) + 2)

  const [answer, setAnswer] = useState<string>('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [serverError, setServerError] = useState('')
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const formSchema = useFormSchema()

  const { t } = useTranslation('translation')

  const generateNewNumbers = (score: number) => {
    if ((mathOperation === MathOperationsConstants.SUMM) 
    || (mathOperation === MathOperationsConstants.DIFF)) {
      if (score <= 5) {
        setFirstNumber(generateRandomNumber(10, 100))
        setSecondNumber(generateRandomNumber(1, 10))
        setThirdNumber(null)
        setFourthNumber(null)
      }
      if (score > 5) {
        setFirstNumber(generateRandomNumber(30, 60))
        setSecondNumber(generateRandomNumber(1, 10))
        setThirdNumber(generateRandomNumber(1, 10))
        setFourthNumber(null)
      }
      if (score > 10) {
        setFirstNumber(generateRandomNumber(30, 80))
        setSecondNumber(generateRandomNumber(1, 10))
        setThirdNumber(generateRandomNumber(1, 10))
        setFourthNumber(generateRandomNumber(1, 10))
      }
    }
    // if ((mathOperation === MathOperationsConstants.MULTIPLY) 
    // || (mathOperation === MathOperationsConstants.DIVIDE)) {
    //   setFirstMultiplier(Math.floor(Math.random() * 8) + 2)
    //   setSecondMultiplier(Math.floor(Math.random() * 8) + 2)
    // }
  }
  
  const onGenerateNewNumbers = () => {
    setAnswer('')
    setOpen(false)
    generateNewNumbers(score)
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

    if (( checkMathOperation({
      answer: Number(answer),
      operation: MathOperationsConstants.SUMM, 
      firstOperand: firstNumber, 
      secondOperand: secondNumber,
      thirdOperand: thirdNumber ? thirdNumber : null,
      fourthOperand: fourthNumber ? fourthNumber : null,
    }) === true ) ||
    ( checkMathOperation({
      answer: Number(answer),
      operation: MathOperationsConstants.DIFF, 
      firstOperand: firstNumber, 
      secondOperand: secondNumber,
      thirdOperand: thirdNumber ? thirdNumber : null,
      fourthOperand: fourthNumber ? fourthNumber : null,
    }) === true )) {
    // ||
    // ( checkMathOperation({
    //   score: score,
    //   answer: Number(answer),
    //   operation: MathOperationsConstants.DIVIDE, 
    //   firstOperand: firstMultiplier, 
    //   secondOperand: secondMultiplier,
    // }) === true )) {
      setScore(score + 1)
      setRightWrong('right')
      data = { ...data, score: 1 }

    } else {
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

  const check = () => {
    Vibration.vibrate(VIBRATION_PATTERN, false)
    Keyboard.dismiss()
    setOpen(true)
    if (( checkMathOperation({
      answer: Number(answer),
      operation: MathOperationsConstants.SUMM, 
      firstOperand: firstNumber, 
      secondOperand: secondNumber,
      thirdOperand: thirdNumber ? thirdNumber : null,
      fourthOperand: fourthNumber ? fourthNumber : null,
    }) === true ) ||
    ( checkMathOperation({
      answer: Number(answer),
      operation: MathOperationsConstants.DIFF, 
      firstOperand: firstNumber, 
      secondOperand: secondNumber,
      thirdOperand: thirdNumber ? thirdNumber : null,
      fourthOperand: fourthNumber ? fourthNumber : null,
    }) === true )) {
      setScore(score + 1)
      setRightWrong('right')
    } else {
      setScore(score - 1)
      setRightWrong('wrong')
    }
  }

  const onPressPlayMore = () => {
    setOpen(false)
    generateNewNumbers(score)
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
      <AppLayout title={
        mathOperation === MathOperationsConstants.SUMM 
          ? t('mathOperations.sum')
          : mathOperation === MathOperationsConstants.DIFF
          ? t('mathOperations.diff')
          : t('mathOperations.multCheck')
        }>
        {serverError && <Error error={serverError} />}
        <MathExampleLayout>
          <Digit title={
            firstNumber
            // (mathOperation === MathOperationsConstants.SUM ||
            // mathOperation === MathOperationsConstants.DIFF) 
            //   ? firstNumber
            //   : firstMultiplier * secondMultiplier
          } />
          <MathOperation title={mathOperation} />
          <Digit title={secondNumber} />
          {thirdNumber && 
            <>
              <MathOperation title={mathOperation} />
              <Digit title={thirdNumber} />
            </>
          }
          {fourthNumber && 
            <>
              <MathOperation title={mathOperation} />
              <Digit title={fourthNumber} />
            </>
          }
          <MathOperation title={MathSignsConstants.EQUAL} />

          <ResultInput 
            value={answer} 
            type={'numeric'}
            onChange={onChangeHandler}
          />
        </MathExampleLayout>

        <ButtonsLayout>
          <MathOperationButton
            buttonCallback={onGenerateNewNumbers}
            title={t('mathOperations.common.generate')}
          />
          <MathOperationButton
            // buttonCallback={handleSubmit(onSubmit)}
            buttonCallback={check}
            title={t('mathOperations.common.check')}
          />
        </ButtonsLayout>
        
        <Score score={score} />
      </AppLayout>
    </>
  )
}
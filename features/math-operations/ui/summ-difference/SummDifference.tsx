import React, { useState } from 'react'
import { MathOperation } from '../../../../common/components/mathOperation/MathOperation'
import { Digit } from '../../../../common/components/digit/Digit'
import { ResultInput } from '../../../../common/components/inputs/ResultInput'
import { Score } from '../../../../common/components/score/Score'
import { AppLayout } from '../../../../common/components/layouts/AppLayout'
import { useTranslation } from 'react-i18next'
import { yupResolver } from "@hookform/resolvers/yup"
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateScoreMutation } from '../../../profile/profile.api'
import { ScoreType } from '../../../profile/profile.api.types'
import { Loader } from '../../../../common/components/loaders/CircularLoader'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { selectUserId } from '../../../auth/auth.selectors'
import { Modal } from '../../../../common/components/modal/Modal'
import { AnswerType } from '../../mathOperations.types'
import { Error } from '../../../../common/components/error/Error'
import { useFormSchema } from '../../../../common/utils/math/validationShemaMathOperations'
import { ButtonsLayout } from '../../../../common/components/layouts/ButtonsLayout'
import { MathOperationButton } from '../../../../common/components/buttons/MathOperationButton'
import { MathExampleLayout } from '../../../../common/components/layouts/MathExamlpeLayout'
import { useDispatch } from 'react-redux'
import { setTotalUserScore } from '../../../profile/profile.slice'
import { MathOperationsConstants, MathSignsConstants } from '../../../../common/constants/MathConstants'
import { checkMathOperation } from '../../../../common/utils/math/checkMathOperation'
import { generateRandomNumber } from '../../../../common/utils/math/generateRandomNumber'
import { Keyboard } from 'react-native'

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
      }
      if (score > 5) {
        setFirstNumber(generateRandomNumber(30, 60))
        setThirdNumber(generateRandomNumber(1, 10))
      }
      if (score > 10) {
        setFirstNumber(generateRandomNumber(30, 80))
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
      thirdOperand: thirdNumber ? thirdNumber : 0,
      fourthOperand: fourthNumber ? fourthNumber : 0,
    }) === true ) ||
    ( checkMathOperation({
      answer: Number(answer),
      operation: MathOperationsConstants.DIFF, 
      firstOperand: firstNumber, 
      secondOperand: secondNumber,
      thirdOperand: thirdNumber ? thirdNumber : 0,
      fourthOperand: fourthNumber ? fourthNumber : 0,
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
          ? t('mathOperations.summ')
          : mathOperation === MathOperationsConstants.DIFF
          ? t('mathOperations.diff')
          : t('mathOperations.multCheck')
        }>
        {serverError && <Error error={serverError} />}
        <MathExampleLayout>
          <Digit title={
            firstNumber
            // (mathOperation === MathOperationsConstants.SUMM ||
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
            buttonCallback={handleSubmit(onSubmit)}
            title={t('mathOperations.common.check')}
          />
        </ButtonsLayout>
        
        <Score score={score} />
      </AppLayout>
    </>
  )
}
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Loader } from '../../../../../components/loaders/CircularLoader'
import { Modal } from '../../../../../components/modal/Modal'
import { useTranslation } from 'react-i18next'
import { Score } from '../../../../../components/score/Score'
import { useUpdateScoreMutation } from '../../../../../api/profile/profile.api'
import { useFormSchema } from '../../../../../utils/math/validationShemaMathOperations'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { ScoreType } from '../../../../../api/profile/profile.api.types'
import { useAppSelector } from '../../../../../hooks/useAppSelector'
import { selectUserId } from '../../../../../redux/selectors/auth.selectors'
import { yupResolver } from '@hookform/resolvers/yup'
import { setTotalUserScore } from '../../../../../redux/slices/profile.slice'
import { MathOperationsConstants, MathSignsConstants } from '../../../../../constants/MathConstants'
import { generateRandomNumber } from '../../../../../utils/math/generateRandomNumber'
import { MathExampleLayout } from '../../../../../components/layouts/MathExamlpeLayout'
import { AppText } from '../../../../../components/text/AppText'
import { ButtonsLayout } from '../../../../../components/layouts/ButtonsLayout'
import { MathOperationButton } from '../../../../../components/buttons/MathOperationButton'
import { getRandomMathOperation } from '../../../../../utils/math/getRandomMathOperation'
import { getCheckMathOperation } from '../../../../../utils/math/getCheckMathOperation'
import { Error } from '../../../../../components/error/Error'
import { Digit } from '../../../../../components/digit/Digit'
import { AppLayout } from '../../../../../components/layouts/AppLayout'
import { AnswerType } from '../../../../../types/mathOperations.types'
import { ResultInput } from '../../../../../components/inputs/ResultInput'
import { VIBRATION_PATTERN } from '../../../../../constants/vibration'
import { Vibration } from 'react-native'

export const EquationsWithX = () => {
  const [firstNumber, setFirstNumber] = useState<number>(generateRandomNumber(1, 10))
  const [secondNumber, setSecondNumber] = useState<number>(generateRandomNumber(10, 100))
  const [hint, setHint] = useState(false)
  const [hintIsUsed, setHintIsUsed] = useState(false)
  const [score, setScore] = useState(0) 
  const [serverError, setServerError] = useState('')
  const [answer, setAnswer] = useState<string>('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  
  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const { t } = useTranslation('translation')
  const formSchema = useFormSchema()

  const randomOperation = getRandomMathOperation()
  const checkRandomOperation = getCheckMathOperation(randomOperation)

  const generateNewNumbers = () => {
    setFirstNumber(generateRandomNumber(1, 10))
    setSecondNumber(generateRandomNumber(10, 100))
  }

  const onGenerateNewNumbers = () => {
    setAnswer('')
    setOpen(false)
    generateNewNumbers()
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

  useEffect(() => {
    if (hint) {
      setHintIsUsed(true)
    }
  }, [hint])

  const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
    setHint(false)
    setHintIsUsed(false)
    setServerError('')

    if (
      MathOperationsConstants.SUMM && secondNumber - firstNumber === Number(answer) ||
      MathOperationsConstants.DIFF && secondNumber + firstNumber === Number(answer)
    ) {
      setScore(hintIsUsed ? (score + 1) : (score + 2))
      setRightWrong('right')
      data = { ...data, score: 2 }
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
    generateNewNumbers()
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
          buttonBack={false}
        />
      )}
      <AppLayout title={t('mathOperations.equationsWithX')}>
        {serverError && <Error error={serverError} />}
        <MathExampleLayout>
          <Digit title={MathSignsConstants.X} />
          <Digit title={randomOperation} />
          <Digit title={firstNumber} />
          <Digit title={MathSignsConstants.EQUAL} />
          <Digit title={secondNumber} />
        </MathExampleLayout>

        {!hint
        ? <AppText 
            onPress={() => 
            setHint(true)} desc={t('mathOperations.common.getHint')} 
            link={true}
          />
        : <MathExampleLayout onPress={() => setHint(false)}>
            <Digit title={MathSignsConstants.X} italic={true} />
            <Digit title={MathSignsConstants.EQUAL} italic={true} />
            <Digit title={secondNumber} italic={true} />
            <Digit title={checkRandomOperation} italic={true} />
            <Digit title={firstNumber} italic={true} />
          </MathExampleLayout>
        }

        <MathExampleLayout>
          <Digit title={MathSignsConstants.X} />
          <Digit title={MathSignsConstants.EQUAL} />
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
            disabled={answer ? false : true}
          />
        </ButtonsLayout>

        <Score score={score} />
      </AppLayout>
    </>
  )
}






// import React, { useEffect, useMemo, useState } from 'react'
// import { AnswerType } from '../../../mathOperations.types'
// import { useDispatch } from 'react-redux'
// import { Loader } from '../../../../../src/components/loaders/CircularLoader'
// import { Modal } from '../../../../../src/components/modal/Modal'
// import { useTranslation } from 'react-i18next'
// import { AppLayout } from '../../../../../src/components/layouts/AppLayout'
// import { Error } from '../../../../../src/components/error/Error'
// import { MathExampleLayout } from '../../../../../src/components/layouts/MathExamlpeLayout'
// import { Digit } from '../../../../../src/components/digit/Digit'
// import { MathOperation } from '../../../../../src/components/mathOperation/MathOperation'
// import { ResultInput } from '../../../../../src/components/inputs/ResultInput'
// import { ButtonsLayout } from '../../../../../src/components/layouts/ButtonsLayout'
// import { MathOperationButton } from '../../../../../src/components/buttons/MathOperationButton'
// import { Score } from '../../../../../src/components/score/Score'
// import { useUpdateScoreMutation } from '../../../../profile/profile.api'
// import { useFormSchema } from '../../../../../src/utils/math/validationShemaMathOperations'
// import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
// import { ScoreType } from '../../../../profile/profile.api.types'
// import { useAppSelector } from '../../../../../src/hooks/useAppSelector'
// import { selectUserId } from '../../../../auth/auth.selectors'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { setTotalUserScore } from '../../../../profile/profile.slice'
// import { Keyboard } from 'react-native'
// import { MathOperationsConstants, MathSignsConstants } from '../../../../../src/constants/MathConstants'
// import { getRandomMathOperation } from '../../../../../src/utils/math/getRandomMathOperation'
// import { getCheckMathOperation } from '../../../../../src/utils/math/getCheckMathOperation'
// import { generateRandomNumber } from '../../../../../src/utils/math/generateRandomNumber'
// import { AppText } from '../../../../../src/components/text/AppText'

// export const EquationsWithX = () => {
//   const [firstNumber, setFirstNumber] = useState<number>(generateRandomNumber(1, 10))
//   const [secondNumber, setSecondNumber] = useState<number>(generateRandomNumber(1, 10))
//   const [hint, setHint] = useState(false)
//   const [score, setScore] = useState(0) 
//   const [serverError, setServerError] = useState('')
//   const [answer, setAnswer] = useState<string>('')
//   const [rightWrong, setRightWrong] = useState<AnswerType>(null)
//   const [open, setOpen] = useState(false)
//   const dispatch = useDispatch()

//   const randomOperation = useMemo(() => getRandomMathOperation(), [])
//   const checkRandomOperation = useMemo(() => getCheckMathOperation(randomOperation), [randomOperation])
  
//   const [updateScore, { isLoading }] = useUpdateScoreMutation()
//   const { t } = useTranslation('translation')
//   const formSchema = useFormSchema()

//   const generateNewNumbers = () => {
//     setFirstNumber(generateRandomNumber(1, 10))
//     setSecondNumber(generateRandomNumber(1, 10))
//   }

//   const onGenerateNewNumbers = () => {
//     setAnswer('')
//     setOpen(false)
//     generateNewNumbers()
//   }

//   const onChangeHandler = (answer: string) => {
//     setAnswer(answer)
//   }

//   const {
//     handleSubmit,
//     reset,
//   } = useForm<ScoreType>({
//     defaultValues: {
//       score: score,
//       userId: useAppSelector(selectUserId), 
//       date: new Date()
//     },
//     mode: 'onChange',
//     resolver: yupResolver(formSchema) as Resolver<ScoreType>,
//   })

//   const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
//     setHint(false)
//     setServerError('')
//     Keyboard.dismiss()

//     // if (checkMathOperation({
//     //   score,
//     //   answer: Number(answer),
//     //   operation: randomOperation, 
//     //   firstOperand: firstNumber, 
//     //   secondOperand: secondNumber,
//     // }) === true) {
//     //   setScore(score + 1)
//     //   setRightWrong('right')
//     //   data = { ...data, score: 1 }
//     // }
//     // else {
//     //   setScore(score - 1)
//     //   setRightWrong('wrong')
//     //   data = { ...data, score: -1 }
//     // }

//     if (
//       (randomOperation === MathOperationsConstants.SUMM) && (Number(answer) + firstNumber === secondNumber) ||
//       (randomOperation === MathOperationsConstants.DIFF) && (firstNumber + secondNumber === Number(answer)) ||
//       (randomOperation === MathOperationsConstants.MULTIPLY) && (secondNumber / firstNumber === Number(answer)) ||
//       (randomOperation === MathOperationsConstants.DIVIDE) && (secondNumber * firstNumber === Number(answer))
//     ) {
//       setScore(hint ? (score + 1) : (score + 2))
//       setRightWrong('right')
//       data = { ...data, score: 2 }
//     }
//     else {
//       setScore(score - 1)
//       setRightWrong('wrong')
//       data = { ...data, score: -2 }
//     }
    
//     updateScore(data)
//       .unwrap()
//       .then(response => {
//         reset()
//         setOpen(true)
//         dispatch(setTotalUserScore(response.data.score))
//       })
//       .catch((e: any) => {
//         if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'))
//       })
//   }

//   const onPressPlayMore = () => {
//     setOpen(false)
//     generateNewNumbers()
//     setAnswer('')
//   }

//   const onPressTryAgain = () => {
//     setOpen(false)
//     setAnswer('')
//   }

//   return (
//     <>
//       {isLoading && <Loader />}
//       {open && (
//         <Modal
//           text={
//             rightWrong === 'right' 
//               ? t('modal.checkMathOperationSuccess') 
//               : t('modal.checkMathOperationFail')
//             }
//           open={open}
//           outlinedButton={false}
//           buttonName={t('modal.button')}
//           buttonCallback={rightWrong === 'right' ? onPressPlayMore : onPressTryAgain}
//           color={rightWrong === 'right' ? 'blue' : 'red'}
//         />
//       )}
//       <AppLayout title={t('screens.equations')}>
//         {serverError && <Error error={serverError} />}
//         <MathExampleLayout>
//           <Digit title={MathSignsConstants.X} />
//           <MathOperation title={randomOperation} />
//           <Digit title={firstNumber} />
//           <MathOperation title={MathSignsConstants.EQUAL} />
//           <Digit title={secondNumber} />
//         </MathExampleLayout>

//         {!hint
//         ? <AppText onPress={() => setHint(true)} desc={t('mathOperations.common.getHint')} />
//         : <MathExampleLayout onPress={() => setHint(false)}>
//             <Digit title={MathSignsConstants.X} italic={true} />
//             <Digit title={MathSignsConstants.EQUAL} italic={true} />
//             <Digit title={secondNumber} italic={true} />
//             <Digit title={checkRandomOperation} italic={true} />
//             <Digit title={firstNumber} italic={true} />
//           </MathExampleLayout>
//         }

//         <MathExampleLayout>
//           <Digit title={MathSignsConstants.X} />
//           <MathOperation title={MathSignsConstants.EQUAL} />
//           <ResultInput 
//             value={answer} 
//             type={'numeric'}
//             onChange={onChangeHandler}
//           />
//         </MathExampleLayout>

//         <ButtonsLayout>
//           <MathOperationButton
//             buttonCallback={onGenerateNewNumbers}
//             title={t('mathOperations.common.generate')}
//           />
//           <MathOperationButton
//             buttonCallback={handleSubmit(onSubmit)}
//             title={t('mathOperations.common.check')}
//           />
//         </ButtonsLayout>
        
//         <Score score={score} />
//       </AppLayout>
//     </>
//   )
// }

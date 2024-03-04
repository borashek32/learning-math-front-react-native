import { PATHS } from "../../constants/paths"

export type DefaultButtonProps = {
  title: string
  path?: PATHS.DIFF | 
    PATHS.SUMM | 
    PATHS.HOME | 
    PATHS.INSTRUCTIONS | 
    PATHS.LOGIN | 
    PATHS.LOGOUT | 
    PATHS.MAIN | 
    PATHS.MATH_OPERATIONS |
    PATHS.MULT |
    PATHS.MULT_CHECK |
    PATHS.MULT_DIGIT |
    PATHS.MULT_NULLS |
    PATHS.PROFILE |
    PATHS.REGISTER |
    PATHS.YOUR_SCORE |
    PATHS.FORGOT_PASSWORD |
    PATHS.CHANGE_EMAIL |
    PATHS.CHANGE_PASSWORD |
    PATHS.CHANGE_AVATAR
  onPress?: () => void
  text?: string
}

export type MathOperationButtonProps = {
  buttonCallback: () => void
  title: string
}

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
    PATHS.PROFILE |
    PATHS.REGISTER |
    PATHS.SCORE
  onPress?: () => void
  text?: string
}

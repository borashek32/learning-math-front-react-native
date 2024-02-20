import { ReactElement, ReactNode } from "react"

export type Props = {
  text: string
  buttonName?: string
  buttonCallback?: () => void
  open?: boolean
  setOpen?: (open: boolean) => void | undefined
  outlinedButton?: boolean
  error?: boolean
  color?: string
  buttonBack: boolean
  backCallback?: () => void
}
import { ReactElement } from "react";

export type Props = {
  title?: string
  onPress?: () => void
  children: ReactElement[] | ReactElement
}
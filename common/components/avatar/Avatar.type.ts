export type Props = {
  source: string
  name?: string
  status?: string
  species?: string
  location?: string
  onPress?: (source: string, name: string) => void
}

export type UserAvatarProps = {
  source: string
  name?: string
  small?: boolean
}
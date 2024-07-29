export type DefaultButtonProps = {
  title?: string;
  path?: string;
  onPress?: () => void;
  onPressWithValue?: (value: string, avatarName: string) => void;
  name?: string;
  source?: string;
  avatarName?: string;
  text?: string;
};

export type MathOperationButtonProps = {
  buttonCallback: () => void;
  disabled?: boolean;
  title: string;
};

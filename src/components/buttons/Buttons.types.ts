export type DefaultButtonProps = {
  title?: string;
  text?: string;
  path?: string;
  onPress?: () => void;
  onPressWithValue?: (value: string, avatarName: string) => void;
  name?: string;
  source?: string;
  avatarName?: string;
  disabled?: boolean;
};

export type MathOperationButtonProps = {
  buttonCallback: () => void;
  disabled?: boolean;
  title: string;
};

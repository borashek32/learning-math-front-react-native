import { KeyboardTypeOptions } from 'react-native';

export type Props = {
  value: string;
  type?: KeyboardTypeOptions;
  onChange: (value: string) => void;
};

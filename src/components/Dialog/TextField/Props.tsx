export default interface Props {
  label: string;
  placeholder: string;
  value: string;
  isValid: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

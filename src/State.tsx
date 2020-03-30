import FieldProps from './components/Board/Field/Props';
import TextFieldProps from './components/Dialog/TextField/Props';
import Player from './model/Player';

export default interface State {
  players: Player[];
  fields: FieldProps[];
  textFields: TextFieldProps[];
  loaderVisible: boolean;
  userDialogVisible: boolean;
  message: string;
  messageDialogVisible: boolean;
  darkMode: boolean;
}

import {StyleSheet} from 'react-native';
import {CommonStyles, FontSize, UtilityMethods} from '../../../utility';
import {Colors, Fonts} from '../../../assets';

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    ...CommonStyles.PADDING_HORIZONTAL,
    paddingTop: UtilityMethods.hp(2),
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: UtilityMethods.hp(2),
  },
  changePassowrd: {
    marginTop: UtilityMethods.hp(1),
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BLACK,
    borderWidth: 1,
  },
  changePassowrdText: {
    color: Colors.BLACK,
  },
  deleteButton: {
    marginTop: UtilityMethods.hp(1),
  },
  text: {
    fontSize: FontSize.VALUE(16),
    fontFamily: Fonts.SEMI_BOLD,
  },
});
export default styles;

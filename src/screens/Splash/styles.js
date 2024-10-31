import {Colors, Fonts} from '../../assets';
import {CommonStyles, FontSize, UtilityMethods} from '../../utility';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  cont: {
    ...CommonStyles.CONTAINER,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  titleText: {
    color: Colors.BLACK,
    marginTop: UtilityMethods.hp(1),
    fontSize: FontSize.VALUE(22),
    fontFamily: Fonts.SEMI_BOLD,
  },
  logo: {
    width: UtilityMethods.wp(24),
    height: UtilityMethods.wp(24),
    fontFamily: Fonts.SEMI_BOLD,
  },
  regText: {
    color: Colors.BLACK,
    fontSize: FontSize.VALUE(18),
    fontFamily: Fonts.REGULAR,
    bottom: 0,
    position: 'absolute',
    ...CommonStyles.MARGIN_FROM_BOTTOM_WITH_NOSH,
  },
});

export default styles;

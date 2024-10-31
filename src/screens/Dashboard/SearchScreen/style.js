import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../assets';
import {FontSize, UtilityMethods} from '../../../utility';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  listContentContainer: {
    paddingHorizontal: UtilityMethods.hp(2),
  },

  rowView: {
    flexDirection: 'row',

    width: '100%',

    alignItems: 'center',
    height: UtilityMethods.hp(5),
  },

  listStyle: {
    marginTop: UtilityMethods.hp(1),
  },

  regText: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginLeft: UtilityMethods.wp(4),
  },

  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: UtilityMethods.wp(4),
    borderBottomWidth: UtilityMethods.wp(0.2),
    borderColor: Colors.BORDER_COLOR,
    paddingBottom: UtilityMethods.hp(2),
    paddingTop: UtilityMethods.hp(1),
  },
  inputContStyle: {
    width: UtilityMethods.wp(80),
    alignSelf: 'center',
    borderRadius: UtilityMethods.wp(2),
    borderColor: Colors.LIGHT_GRAY,
  },
  icon: {
    paddingRight: UtilityMethods.wp(2),
  },

  title: {
    fontSize: FontSize.VALUE(18),
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginBottom: UtilityMethods.hp(1),
  },
  emptyCont: {
    flex: 1,
    paddingTop: UtilityMethods.hp(15),
    alignItems: 'center',
  },
});

export default styles;

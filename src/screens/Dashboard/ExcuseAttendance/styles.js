import {StyleSheet} from 'react-native';
import {CommonStyles, FontSize, UtilityMethods} from '../../../utility';
import {Colors, Fonts} from '../../../assets';

const styles = StyleSheet.create({
  cont: {},
  titleText: {
    ...CommonStyles.BOLD,
    color: Colors.BLACK,
    fontSize: FontSize.VALUE(20),
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.SECONDARY1,
  },
  linkText: {
    ...CommonStyles.REGULAR,
    color: Colors.BLACK,
    fontSize: FontSize.VALUE(14),
    marginLeft: UtilityMethods.wp(1),
  },
  roundView: {
    width: UtilityMethods.wp(35),
    height: UtilityMethods.wp(35),
    borderRadius: UtilityMethods.wp(100),
    backgroundColor: Colors.GRAY_06,
    alignSelf: 'center',
    marginTop: UtilityMethods.hp(5),
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  roundEditView: {
    width: UtilityMethods.wp(8),
    height: UtilityMethods.wp(8),
    borderRadius: UtilityMethods.wp(100),
    backgroundColor: Colors.SECONDARY1,
    zIndex: 1,
    position: 'absolute',
    marginLeft: UtilityMethods.wp(54),
    top: UtilityMethods.hp(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    rowGap: UtilityMethods.hp(3),
    marginTop: UtilityMethods.hp(5),
  },
  searchInput: {
    borderRadius: UtilityMethods.wp(2),
    borderColor: Colors.LIGHT_GRAY,
    marginVertical: UtilityMethods.hp(2),
    marginHorizontal: UtilityMethods.wp(4),
  },
  sectionListContent: {
    paddingBottom: UtilityMethods.hp(2),
  },
  footer: {
    backgroundColor: 'red',
    marginBottom: UtilityMethods.hp(3),
  },

  sectionView: index => ({
    height: index === 0 ? UtilityMethods.hp(30) : UtilityMethods.hp(100),
  }),

  emptyListView: {
    flex: 1,
    paddingTop: UtilityMethods.hp(15),

    alignItems: 'center',
    paddingHorizontal: UtilityMethods.wp(5),
  },
  title: {
    fontSize: FontSize.VALUE(18),
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginBottom: UtilityMethods.hp(1),
  },
  description: {
    fontSize: FontSize.VALUE(14),
    lineHeight: FontSize.VALUE(20),
    fontFamily: Fonts.BOLD,
    color: Colors.LIGHT_GRAY,
    textAlign: 'center',
  },
});

export default styles;

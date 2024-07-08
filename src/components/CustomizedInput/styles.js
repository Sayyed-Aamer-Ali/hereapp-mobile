import { Colors } from '../../assets';
import { UtilityMethods, CommonStyles, FontSize } from '../../utility';

const { StyleSheet, Platform } = require('react-native');

const styles = StyleSheet.create({
  mainCont: {
    width: '100%',
   
  },
  container: (isInValidField) => ({
    margin: 0,
    paddingHorizontal: UtilityMethods.wp(3),
   borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: UtilityMethods.hp(6),

    // marginTop: UtilityMethods.hp(1.5),
    // paddingBottom: UtilityMethods.hp(0.5),
  }),
  input: {
    padding: 0,
    margin: 0,
    width: '100%',
    color: Colors.DARK_GRAY,
    fontSize: FontSize.VALUE(20),
    ...CommonStyles.MEDIUM,
    textAlignVertical: 'center',
    height: UtilityMethods.hp(6),
    textAlignVertical:"top",
    
  },
  eyeIcon: {
    width: UtilityMethods.wp(6),
    height: UtilityMethods.wp(6),
    marginTop: UtilityMethods.hp(0.5),

    resizeMode: 'contain',
  },

  searchIcon: {
    width: UtilityMethods.wp(5),
    height: UtilityMethods.wp(5),
    resizeMode: 'contain',
    pointerEvents: 'auto',
  },

  rightIcon: {
    width: UtilityMethods.wp(5),
    height: UtilityMethods.wp(5),
    resizeMode: 'contain',
    zIndex: 1,
  },
  TitleStyle: {
    ...CommonStyles.BOLD,
    fontSize: FontSize.VALUE(30),
    color: Colors.BLACK,

    marginLeft: UtilityMethods.wp(1),
  },
  TitleTextWithBorder: {
    ...CommonStyles.SEMI_BOLD,
    fontSize: FontSize.VALUE(20),
    color: Colors.BLACK,
    marginLeft: UtilityMethods.wp(5),
  },
  ErrorText: {
    marginTop: UtilityMethods.hp(1),
    ...CommonStyles.MEDIUM,
    fontSize: FontSize.VALUE(18),
    color: Colors.RED,
    marginLeft: UtilityMethods.wp(1),
  },
  inputWithBorder: {
    flexDirection: 'row',
    width: UtilityMethods.wp(90),
    height: UtilityMethods.hp(6),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    alignSelf: 'center',
  },
  iconView: {
    flex: 0.15,

    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputView: {
    flex: 0.85,

    textAlignVertical: 'center',
    color: Colors.BLACK,
    ...CommonStyles.REGULAR,
    fontSize: FontSize.VALUE(16),
  },
  roundCount: {
    width: UtilityMethods.wp(6),
    height: UtilityMethods.wp(6),
    borderRadius: UtilityMethods.wp(100),
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundIcon: {
    width: UtilityMethods.wp(3.5),
    height: UtilityMethods.wp(3.5),
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
  },
  inputWithBorderTextArea: {
    width: UtilityMethods.wp(90),
    height: UtilityMethods.hp(20),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    alignSelf: 'center',
    textAlignVertical: 'top',
    color: Colors.BLACK,
    ...CommonStyles.REGULAR,
    fontSize: FontSize.VALUE(16),
    paddingHorizontal: UtilityMethods.wp(3),
  },
  SearchBar: {
    width: '100%',
    height: UtilityMethods.hp(5),
    backgroundColor: '#F7F7F6',
    borderRadius: 10,

    alignSelf: 'center',
  },
  rightIconView: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    justifyContent: 'center',

    fontSize: FontSize.VALUE(16),
    ...CommonStyles.REGULAR,
    color: Colors.BLACK,
    textAlignVertical: 'center',
    padding: 0,
    marginTop: Platform.OS == 'android' ? UtilityMethods.hp(0.3) : 0,
  },
  rightIconViewPlaceView: {
    flex: 0.15,
    paddingTop: UtilityMethods.hp(1.2),
    height: UtilityMethods.hp(5),
    alignItems: 'center',
    backgroundColor: '#F7F7F6',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default styles;

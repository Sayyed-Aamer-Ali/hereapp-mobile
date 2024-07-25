import { Platform, StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../../assets';
import { FontSize, UtilityMethods } from '../../../utility';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position:'relative'
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    width: '100%',
    backgroundColor: Colors.WHITE,
    height: UtilityMethods.hp(11),
    justifyContent: 'flex-end',
    paddingBottom:UtilityMethods.hp(1)
  },
  footerContainer:{
    backgroundColor:Colors.WHITE,
    width:'100%',
    paddingHorizontal:UtilityMethods.wp(6),
    paddingTop:UtilityMethods.hp(2),
    paddingBottom: Platform.OS === 'android' ?  UtilityMethods.hp(2) : UtilityMethods.hp(4),
    borderTopLeftRadius:UtilityMethods.wp(4),
    borderTopRightRadius:UtilityMethods.wp(4)
  },
  button: {
    paddingHorizontal:UtilityMethods.wp(4),
    backgroundColor:Colors.WHITE,
    alignSelf:'center',
    borderColor:Colors.BLACK,
    borderWidth:1,
  },
  textStyle:{
    color:Colors.BLACK
  },
  footerTitle:{ 
    color:Colors.GRAY,
    fontFamily: Fonts.MEDIUM,
    fontSize:FontSize.VALUE(20),
    paddingBottom:UtilityMethods.hp(1)
  },
  footerLocation:{
    color:Colors.GRAY,
    fontFamily: Fonts.REGULAR,
    fontSize:FontSize.VALUE(16),
    paddingBottom:UtilityMethods.hp(1.5)
  },
});
export default styles
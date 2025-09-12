import {CommonActions} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {
  Alert,
  Dimensions,
  Linking,
  PixelRatio,
  Platform,
  Share,
  PermissionsAndroid,
} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {navigationRef} from '../App';
// import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import momettimezone from 'moment-timezone';
import Geolocation from '@react-native-community/geolocation';
import AlertService from '../services/AlertService';
import {AlertWithTwoButtons} from '../components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

let androidAppUrl = 'google.com';
let iosAppUrl = 'apple.com';

/**
 * Helper Functions
 *
 * @class UtilityMethods
 */
class UtilityMethodsClass {
  hp = height => {
    const elemHeight = typeof height === 'number' ? height : parseFloat(height);
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
  };
  wp = width => {
    const elemWidth = typeof width === 'number' ? width : parseFloat(width);
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
  };

  /**
   * Returns true if the given string only contain letters
   *
   * @param {*} str
   * @return {*}
   * @memberof UtilityMethods
   */
  hasOnlyLetters(str) {
    let result = /^[\p{L} ,.'-]+$/u.test(str);
    return result;
  }

  /**
   * Parse JSON string or throw error
   */
  parseJSON = data => {
    data = data || '';
    try {
      return JSON.parse(data);
    } catch (error) {
      throw new Error({
        type: 'JSON.parse',
        message: error.stack,
        reason: error.message,
      });
    }
  };
  /**
   * Safely parse JSON strings (no errors)
   */
  toJSON = data => {
    data = data || '';
    try {
      return JSON.parse(data);
    } catch (error) {
      return {
        type: 'JSON.parse',
        message: error.stack,
        reason: error.message,
      };
    }
  };

  /**
   * Check empty object
   */
  checkEmptyObject = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  /**
   * Check if the variable is undefined
   */
  isUndefined = data => {
    if (data === 'undefined') {
      return true;
    }
    return false;
  };

  /**
   * Helper function to convert bytes to size
   *
   * @param {*} bytes
   * @memberof UtilityMethods
   */
  bytesToSize = bytes => {
    if (bytes === 0) return '0 B';

    var k = 1024;
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  };

  /**
   * Helper Function for validating email addresses
   *
   * @param {*} email
   * @memberof UtilityMethods
   */

  /**
   * Helper Function for validating Phone Numbers
   *
   * @param {*} phoneNumber
   * @memberof UtilityMethods
   */

  /**
   * Helper Function for capitalize First Letter of Text
   *
   * @param {*} string
   * @memberof UtilityMethods
   */
  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  /**
   * Helper function for validating url
   *
   * @param {*} str
   * @memberof UtilityMethods
   */
  /**
   * Helper Function for generating a random string
   *
   * @param {*} length
   * @return {*}
   * @memberof UtilityMethods
   */
  getRandomString(length) {
    let randomChars = ``;
    ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    return result;
  }

  /**
   * Helper Function for checking notch in ios device
   *
   * @memberof UtilityMethods
   */
  hasNotch = () => {
    let d = Dimensions.get('window');
    const {height, width} = d;
    return (
      // This has to be iOS duh
      Platform.OS === 'ios' &&
      // Accounting for the height in either orientation
      (height >= 812 || width >= 812)
    );
  };

  /**
   * Helper Function for ios device is Iphone X
   *
   * @memberof UtilityMethods
   */
  isIphoneX = () => {
    const dimension = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTV &&
      (dimension.height === 780 ||
        dimension.width === 780 ||
        dimension.height === 812 ||
        dimension.width === 812 ||
        dimension.height === 844 ||
        dimension.width === 844 ||
        dimension.height === 896 ||
        dimension.width === 896 ||
        dimension.height === 926 ||
        dimension.width === 926)
    );
  };

  hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };

  getAppUrl = () => {
    return Platform.OS === 'ios' ? iosAppUrl : androidAppUrl;
  };

  resetAndNavigate = route => {
    navigationRef.dispatch(
      CommonActions.reset({
        routes: [
          {
            name: route,
          },
        ],
      }),
    );
  };

  resetAndNavigateUsingMultipleRoutes = routes => {
    navigationRef.dispatch(
      CommonActions.reset({
        routes,
      }),
    );
  };

  isIosDevice = () => {
    return Platform.OS === 'ios';
  };

  shareData = async data => {
    try {
      await Share.share(data);
    } catch (error) {
      Alert.alert('Alert!', error.message);
    }
  };

  isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTV &&
      (dimen.height === 780 ||
        dimen.width === 780 ||
        dimen.height === 812 ||
        dimen.width === 812 ||
        dimen.height === 844 ||
        dimen.width === 844 ||
        dimen.height === 896 ||
        dimen.width === 896 ||
        dimen.height === 926 ||
        dimen.width === 926)
    );
  }

  ifIphoneX(iphoneXStyle, regularStyle) {
    if (this.isIphoneX()) {
      return iphoneXStyle;
    }
    return regularStyle;
  }

  getStatusBarHeight(safe) {
    return Platform.select({
      ios: this.ifIphoneX(safe ? 44 : 30, 20),
      android: StatusBar.currentHeight,
      default: 0,
    });
  }

  getBottomSpace() {
    return this.isIphoneX() ? 34 : 0;
  }

  selectImage = (selectType, callback, multiple) => {
    if (selectType === 'camera') {
      launchCamera(
        {
          mediaType: 'photo',
          quality: 1,
          maxHeight: 1024,
          maxWidth: 1024,
        },
        response => {
          if (response.assets && response.assets.length > 0) {
            const image = response.assets[0];
            callback(image);
          } else if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.errorCode) {
            console.log('Camera Error: ', response.errorMessage);
          }
        },
      );
    } else {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.2,
          maxHeight: 1024,
          maxWidth: 1024,
          selectionLimit: multiple ? 0 : 1,
        },
        response => {
          if (response.assets && response.assets.length > 0) {
            if (multiple) {
              callback(response.assets);
            } else {
              callback(response.assets[0]);
            }
          } else if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          }
        },
      );
    }
  };

  // selectImage = (selectType, callback, multiple) => {
  //   if (selectType === 'camera') {
  //     // This function handles the camera
  //     launchCamera(
  //       {
  //         mediaType: 'photo',
  //         quality: 1, // Full quality
  //         maxHeight: 1024,
  //         maxWidth: 1024,
  //       },
  //       response => {
  //         if (response.didCancel) {
  //           console.log('User cancelled camera');
  //         } else if (response.errorCode) {
  //           console.log('Camera Error: ', response.errorMessage);
  //         } else if (response.assets && response.assets.length > 0) {
  //           // The new library returns an array of assets. We take the first one.
  //           const image = response.assets[0];
  //           callback(image);
  //         }
  //       },
  //     );
  //   } else {
  //     // This function handles the image/video picker and uses the Android Photo Picker
  //     launchImageLibrary(
  //       {
  //         mediaType: 'photo',
  //         quality: 0.2, // Compress for a smaller file size
  //         maxHeight: 1024,
  //         maxWidth: 1024,
  //         selectionLimit: multiple ? 0 : 1, // 0 means no limit for multiple selection
  //       },
  //       response => {
  //         if (response.didCancel) {
  //           console.log('User cancelled image picker');
  //         } else if (response.errorCode) {
  //           console.log('ImagePicker Error: ', response.errorMessage);
  //         } else if (response.assets && response.assets.length > 0) {
  //           // The new library returns an array of assets
  //           callback(response.assets);
  //         }
  //       },
  //     );
  //   }
  // };

  // selectImage = (selectType, callback, multiple) => {
  //   if (selectType === 'camera') {
  //     ImagePicker.openCamera({
  //       cropping: true,

  //       compressImageQuality: 1,
  //       compressImageMaxWidth: 1024,
  //       compressImageMaxHeight: 1024,
  //     })
  //       .then(image => {
  //         callback(image);
  //       })
  //       .catch(error => {});
  //   } else {
  //     ImagePicker.openPicker({
  //       multiple: multiple,
  //       cropping: true,
  //       mediaType: 'photo',
  //       compressImageQuality: 0.2,
  //       compressImageMaxWidth: 1024,
  //       compressImageMaxHeight: 1024,
  //     })
  //       .then(images => {
  //         callback(images);
  //       })
  //       .catch(error => {});
  //   }
  // };

  getUnixTimeStampOfUTCWithZeroTime = value => {
    let momentFormattedDate = moment(value).format('YYYY-MM-DDT00:00:00Z');
    let utcDate = moment(momentFormattedDate).utc();
    let unixUtcDate = moment(utcDate).unix();

    return unixUtcDate;
  };

  getUnixTimeStampOfUTCWithActualTime = value => {
    let momentFormattedDate = moment(value).format('YYYY-MM-DDTHH:mm:ssZ');
    let utcDate = moment(momentFormattedDate).utc();
    let unixUtcDate = moment(utcDate).unix();

    return unixUtcDate;
  };

  getUserCurrentLocation = callback => {
    Geolocation.getCurrentPosition(
      position => {
        callback({
          position: position,
          sucess: true,
        });
      },
      error => {
        if (error.code === 1) {
          callback({
            error: 'Permission Denied',
            sucess: false,
          });
        } else {
          callback({
            error: 'Location not found',
            sucess: false,
          });
        }
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 20000},
    );
  };

  generateAlphanumericOtp = () => {
    return Array.from({length: 3}, () => {
      // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const characters = '0123456789';
      return characters.charAt(Math.floor(Math.random() * characters.length));
    }).join('');
  };

  calculateAttendanceDuration(start, end) {
    // Parse the start and end times using moment
    const startTime = moment(start);
    const endTime = moment(end);

    // Calculate the difference in minutes
    const differenceInMinutes = endTime.diff(startTime, 'minutes');

    return `${differenceInMinutes}`;
  }

  calculateTimeLeftInSeconds(start, end) {
    const timeZone = 'America/Chicago';

    const startTime = moment.utc(start).format('hh:mm:ss:a');
    const endTime = moment.utc(end).format('hh:mm:ss:a');
    const currentTime = momettimezone.tz(timeZone).format('hh:mm:ss:a');

    if (
      moment(currentTime, 'hh:mm:ss:a').isSameOrAfter(
        moment(startTime, 'hh:mm:ss:a'),
      ) &&
      moment(currentTime, 'hh:mm:ss:a').isSameOrBefore(
        moment(endTime, 'hh:mm:ss:a'),
      )
    ) {
      const differenceInSeconds = moment(endTime, 'hh:mm:ss:a').diff(
        moment(currentTime, 'hh:mm:ss:a'),
        'seconds',
      );
      return differenceInSeconds;
    } else {
      return 0;
    }
  }
  // requestPermission = (callback) => {
  //   if (Platform.OS == "ios") {
  //     messaging()
  //       .requestPermission()
  //       .then((response) => {
  //         if (response) {
  //           this.getFCMToken((res) => {
  //             callback(res);
  //           });
  //         } else {
  //           callback("");
  //         }
  //       })
  //       .catch((error) => {
  //         callback("Error", error);
  //       });
  //   } else {
  //     request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then((result) => {
  //       if (result === RESULTS.GRANTED || result === RESULTS.UNAVAILABLE) {
  //         this.getFCMToken((res) => {
  //           callback(res);
  //         });
  //       } else {
  //         callback("");
  //       }
  //     });
  //   }
  // };

  requestPermission = callback => {
    const askForPermission = () => {
      if (Platform.OS === 'ios') {
        messaging()
          .requestPermission()
          .then(response => {
            if (response) {
              this.getFCMToken(res => {
                callback(res);
              });
            } else {
              // If permission is denied, show alert and ask to open settings
              Alert.alert(
                'Permission Required',
                'You need to enable notifications in Settings.',
                [
                  {
                    text: 'Settings',
                    onPress: () => {
                      Linking.openSettings();
                    },
                  },
                  {
                    text: 'Cancel',
                    onPress: () => callback(''),
                  },
                ],
              );
            }
          })
          .catch(error => {
            callback('Error', error);
          });
      } else {
        request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(result => {
          if (result === RESULTS.GRANTED || result === RESULTS.UNAVAILABLE) {
            this.getFCMToken(res => {
              callback(res);
            });
          } else {
            // If permission is denied, re-request permission
            Alert.alert(
              'Permission Required',
              'We need your permission to send notifications. Please grant it.',
              [
                {
                  text: 'Settings',
                  onPress: Linking.openSettings,
                },
                {
                  text: 'Cancel',
                  onPress: () => callback(''),
                },
              ],
            );
          }
        });
      }
    };

    // Initial call to ask for permission
    askForPermission();
  };

  // getFCMToken = (callback) => {
  //   messaging()
  //     .hasPermission()
  //     .then(async (enabled) => {
  //       if (enabled) {
  //         if (
  //           !messaging().isDeviceRegisteredForRemoteMessages &&
  //           Platform.OS == "ios"
  //         ) {
  //           await messaging().registerDeviceForRemoteMessages();
  //         }
  //         await messaging()
  //           .getToken()
  //           .then((response) => {
  //             callback(response);
  //           })
  //           .catch(() => {
  //             null;
  //           });
  //       } else {
  //         callback("");
  //       }
  //     })
  //     .catch(() => {
  //       callback("");
  //     });
  // };

  getFCMToken = async callback => {
    try {
      // Check if permission is granted
      const enabled = await messaging().hasPermission();

      if (enabled) {
        // For iOS, ensure the device is registered for remote messages
        if (
          Platform.OS === 'ios' &&
          !messaging().isDeviceRegisteredForRemoteMessages
        ) {
          await messaging().registerDeviceForRemoteMessages();
        }
        // Get the FCM token
        const token = await messaging().getToken();
        callback(token);
      } else {
        callback(''); // Permission not granted
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      callback(''); // Return empty string in case of error
    }
  };

  getForegroundMessage = callback => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      callback(remoteMessage);
    });
    return unsubscribe;
  };
}

const UtilityMethods = new UtilityMethodsClass();

export default UtilityMethods;

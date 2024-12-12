import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../assets';
import {FontSize, UtilityMethods} from '../../utility';
import DocumentPicker from 'react-native-document-picker';
import axiosWrapper from '../../services/AxiosWrapper';
import {API_URLS} from '../../services/apiPathList';
import {opacity} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const FileUploadComponent = ({file, setFile, error}) => {
  const [loader, setLoader] = useState(false);
  const handleFilePick = async () => {
    setLoader(true);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });

      // setFile(pre => [...pre, result?.[0]]);
      formateData(result[0]);
    } catch (err) {
      setLoader(false);
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        throw err;
      }
    } finally {
    }
  };

  const formateData = response => {
    let data = {
      uri: response.uri,
      name: response.name,
      type: 'application/pdf',
    };

    uploadDoc(data);
  };

  let uploadDoc = async file => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      let response = await axiosWrapper(
        'POST',
        API_URLS.UPLOAD_IMAGE,
        formData,
        null,
        true,
      );
      setFile(pre => [...pre, response?.data[0]?.path]);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleRemoveFile = index => {
    setFile(prevFiles => prevFiles.filter((file, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Attach files to support your request"
        placeholderTextColor={Colors.LIGHT_GRAY}
        editable={false}
      />

      <TouchableOpacity
        style={styles.iconButton(file.length > 0 || loader)}
        onPress={handleFilePick}
        disabled={file.length > 0 || loader ? true : false}>
        <Icons.Attach />
      </TouchableOpacity>

      <View style={styles.files}>
        {file.length > 0 &&
          file.map((item, index) => (
            <View style={styles.fileContainer} key={index}>
              <View style={styles.fileIcon}>
                <Icons.PDF />
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveFile(index)}
                style={styles.cross}>
                <Icons.Cross />
              </TouchableOpacity>
            </View>
          ))}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: UtilityMethods.wp(4),
    marginVertical: UtilityMethods.hp(2),
  },
  textInput: {
    height: UtilityMethods.hp(6),
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: UtilityMethods.wp(2),
    paddingHorizontal: UtilityMethods.wp(4),
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
    color: Colors.BLACK,
    flexDirection: 'row',
  },
  iconButton: isFile => ({
    position: 'absolute',
    right: UtilityMethods.wp(0),
    borderTopRightRadius: UtilityMethods.wp(2),
    borderBottomRightRadius: UtilityMethods.wp(2),
    backgroundColor: Colors.BLACK,
    height: UtilityMethods.hp(6),
    paddingHorizontal: UtilityMethods.wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: isFile ? 0.5 : 1,
  }),
  resetText: {
    color: Colors.PRIMARY,
    fontFamily: Fonts.BOLD,
  },
  files: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: UtilityMethods.hp(2),
    backgroundColor: '#F3F3F3',
    paddingHorizontal: UtilityMethods.wp(1),
    paddingTop: UtilityMethods.wp(3),
    paddingVertical: UtilityMethods.wp(2),
    marginRight: UtilityMethods.wp(2),
    borderRadius: UtilityMethods.wp(2),
  },
  fileIcon: {
    marginRight: UtilityMethods.wp(1),
  },
  fileName: {
    flex: 1,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
  },
  cross: {
    top: UtilityMethods.wp(-1.5),
  },
  error: {
    marginTop: UtilityMethods.hp(1),

    fontSize: FontSize.VALUE(14),
    color: Colors.RED,
    marginLeft: UtilityMethods.wp(1),
    fontWeight: Fonts.REGULAR,
  },
});

export default FileUploadComponent;

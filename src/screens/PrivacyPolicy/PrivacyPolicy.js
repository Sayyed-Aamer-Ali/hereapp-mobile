import React from 'react';

import {MARKETPLACE_URL_FROM_ENV} from '@env';
import WebView from 'react-native-webview';
import {Header, MainLayout} from '../../components';
import styles from './styles';

const PrivacyPolicy = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);
  return (
    <MainLayout loader={loading}>
      <Header
        title={'Privacy Policy'}
        showBackButton={true}
        DrawerHeader={false}
        rightIcons={false}
      />

      <WebView
        onLoad={() => setLoading(false)}
        source={{uri: `${MARKETPLACE_URL_FROM_ENV}/privacy-policy/`}}
        style={styles.container}
      />
    </MainLayout>
  );
};

export default PrivacyPolicy;

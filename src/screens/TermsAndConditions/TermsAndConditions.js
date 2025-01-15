import React from 'react';

import {MARKETPLACE_URL_FROM_ENV} from '@env';
import WebView from 'react-native-webview';
import {Header, MainLayout} from '../../components';
import styles from './styles';

const TermsAndConditions = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);
  return (
    <MainLayout loader={loading}>
      <Header
        title={'Terms & Conditions'}
        showBackButton={true}
        DrawerHeader={false}
        rightIcons={false}
      />

      <WebView
        onLoad={() => setLoading(false)}
        source={{uri: `${MARKETPLACE_URL_FROM_ENV}/terms-of-service/`}}
        style={styles.container}
      />
    </MainLayout>
  );
};

export default TermsAndConditions;

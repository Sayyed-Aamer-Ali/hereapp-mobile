//================================ React Native Imported Files ======================================//
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persister } from './redux/Store';
import { StatusBar } from 'react-native';

//================================ Local Imported Files ======================================//

import RootStack from './navigation/RootStack';

export const navigationRef = createNavigationContainerRef();





const App = () => {
 

  return (
    <ToastProvider
    offsetTop={40}
   
  >
    <Provider store={store}>
    
        <PersistGate persistor={persister}>
          <NavigationContainer  ref={navigationRef}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar backgroundColor="#fff" barStyle="dark-content" />
              <RootStack />
           
            </GestureHandlerRootView>
          </NavigationContainer>
        </PersistGate>
    
    </Provider>
  </ToastProvider>
  );
};

export default App;

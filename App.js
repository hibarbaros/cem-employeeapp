import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import Homescreen from './src/screens/Homescreen/Homescreen';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <Homescreen />
      </ApplicationProvider>
    </QueryClientProvider>
  );
};

export default App;

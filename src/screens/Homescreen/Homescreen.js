import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {Text, Modal, Card} from '@ui-kitten/components';

import {useFetchTableByName} from '../../services/hooks/useAirtable';
import Person from '../../components/Person/Person';
import MainLogo from '../../images/mittagsservice_logo.png';

export default function Homescreen() {
  const {isLoading, error, data} = useFetchTableByName('Users', 'UsersList');

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <Modal
        visible={true}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <Card disabled={true}>
          <Text>Data Loading</Text>
        </Card>
      </Modal>
    );
  }

  return (
    <>
      <LogoContainer>
        <Logo source={MainLogo} />
      </LogoContainer>
      <StyledSafeAreaView>
        <StyledScrollView>
          {data.map((element) => {
            if (element.fields.Status === true) {
              return (
                <React.Fragment key={element.id}>
                  <Person element={element} />
                </React.Fragment>
              );
            } else {
              return null;
            }
          })}
        </StyledScrollView>
      </StyledSafeAreaView>
    </>
  );
}

const LogoContainer = styled.View`
  background-color: black;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image``;

const StyledScrollView = styled.ScrollView`
  padding: 50px;
`;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

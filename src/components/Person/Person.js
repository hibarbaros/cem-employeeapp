import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import _ from 'lodash';
import {Button, Text, Layout, Spinner, useTheme} from '@ui-kitten/components';

import {
  useFetchTableByName,
  useAddWork,
  useUpdateWork,
} from '../../services/hooks/useAirtable';

export default function Person({element}) {
  const theme = useTheme();

  const {isLoading, error, data, refetch} = useFetchTableByName(
    'Works',
    'UserTimeList',
  );

  const {mutate: mutateAdd, isLoading: addLoading} = useAddWork();

  const {mutate: mutateUpdate, isLoading: updateLoading} = useUpdateWork();

  function handleCreateUser(elementData, workingData) {
    if (workingData.length > 0) {
      mutateUpdate(workingData, {
        onError: (e) => console.log(e),
        onSuccess: (res) => res && handleSuccess(res),
      });
    } else {
      mutateAdd(elementData, {
        onError: (e) => console.log(e),
        onSuccess: (res) => res && handleSuccess(res),
      });
    }
  }

  function handleSuccess() {
    refetch();
  }

  if (isLoading) {
    return (
      <StyledLayout level="1">
        <Spinner size="large" />
      </StyledLayout>
    );
  }

  if (updateLoading) {
    return (
      <StyledLayout level="1">
        <Spinner size="large" />
      </StyledLayout>
    );
  }

  if (addLoading) {
    return (
      <StyledLayout level="1">
        <Spinner size="large" />
      </StyledLayout>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const today = moment().format('YYYY-MM-DD');

  const filteredToday = _.filter(data, function (item) {
    return item.fields.WorkingDay === today;
  });

  const filteredData = _.filter(filteredToday, function (item) {
    return item.fields.UserLink[0] === element.id;
  });

  const filteredWorking = _.filter(filteredData, function (item) {
    return item.fields.Status === 'Working';
  });

  return (
    <>
      <PersonButton
        disabled={addLoading || updateLoading}
        style={{
          backgroundColor:
            filteredWorking.length > 0
              ? theme['color-success-700']
              : theme['color-danger-700'],
        }}
        onPress={() => handleCreateUser(element, filteredWorking)}>
        <ButtonTextContainer>
          <PersonButtonText>{element.fields.FullName}</PersonButtonText>
          <PersonSubText>
            - {filteredWorking.length > 0 ? 'Working' : 'Time-Out'} -
          </PersonSubText>
        </ButtonTextContainer>
      </PersonButton>
    </>
  );
}

const PersonButton = styled(Button)`
  margin-bottom: 50px;
  border-width: 0px;
`;

const ButtonTextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PersonButtonText = styled(Text)`
  font-size: 40px;
  font-weight: bold;
  margin: 5px;
  color: #fff;
  width: 100%;
  text-align: center;
`;

const PersonSubText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
  color: #fff;
  width: 100%;
  text-align: center;
`;

const StyledLayout = styled(Layout)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

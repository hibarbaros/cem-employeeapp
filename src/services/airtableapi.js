import moment from 'moment';
import Airtable from 'airtable';
const BASE = 'appH5F9Cf0TCPOLZa';
const API_KEY = 'keyPXAPlXCXYZDzjy';

const baseApp = new Airtable({apiKey: API_KEY}).base(BASE);

const minifyRecord = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

export const fetchTableByName = async (tableName, viewName) => {
  const records = await baseApp(tableName).select({view: viewName}).firstPage();
  return records;
};

export const createWorkTime = async (element) => {
  const {id} = element;
  const today = moment().format('YYYY-MM-DD');
  const timeNow = moment();
  const remainder = 15 - (timeNow.minute() % 15);

  const dateTime = moment(timeNow)
    .add(remainder, 'minutes')
    .format('YYYY-MM-DD HH:mm');

  console.log(dateTime);

  const createdRecord = await baseApp('Works').create([
    {
      fields: {
        WorkingDay: today,
        UserLink: [id],
        StartTime: dateTime,
        CheckoutTime: dateTime,
        Status: 'Working',
      },
    },
  ]);
  return minifyRecord(createdRecord[0]);
};

export const updateWorkTime = async (element) => {
  const elementId = element[0].id;

  const timeNow = moment().format('YYYY-MM-DD HH:mm:ss');

  const updatedRecord = await baseApp('Works').update([
    {
      id: elementId,
      fields: {
        CheckoutTime: timeNow,
        Status: 'End',
      },
    },
  ]);
  return minifyRecord(updatedRecord[0]);
};

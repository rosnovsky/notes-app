import uuid from 'uuid';
import AWS from 'aws-sdk';
import * as dynamoDBLib from './libs/dynamodb-libs';
import { success, fail } from './libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'notes',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };
  try {
    await dynamoDBLib.call('put', params);
    return success(params.Item);
  } catch (e) {
    return fail({ status: false });
  }
}

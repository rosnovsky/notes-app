import * as dynamoDbLib from './libs/dynamodb-libs';
import { success, fail } from './libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: 'notes',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    await dynamoDbLib.call('delete', params);
    return success({ status: true });
  } catch (e) {
    return fail({ status: false });
  }
}

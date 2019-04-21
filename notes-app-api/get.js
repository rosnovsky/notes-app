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
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return fail({ status: false, error: 'Note not found' });
    }
  } catch (e) {
    console.log(e);
    return fail({ status: false });
  }
}

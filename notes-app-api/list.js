import * as dynamoDbLib from './libs/dynamodb-libs';
import { success, fail } from './libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: 'notes',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const results = await dynamoDbLib.call('query', params);
    return success(results.Items);
  } catch (e) {
    return fail({ status: false });
  }
}

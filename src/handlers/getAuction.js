import AWS from 'aws-sdk';
import createError from 'http-errors'
const dynamodb = new AWS.DynamoDB.DocumentClient();


async function getAuction(event, context) {
    let auctions;
    const {status} = event.queryStringParameters
    console.log('status',status)
    const params = {
      TableName : process.env.AUCTION_TABLE_NAME,
      IndexName : 'statusAndEndDate',
      KeyConditionExpression : '#status = :status',
      ExpressionAttributeValues : {
       ':status' : status, 
      },
      ExpressionAttributeNames : {
        '#status' : 'status'
      }  
    }
    try {
        const result =  await dynamodb.query(params).promise();
        auctions = result.Items
    } catch (error) {
        throw new createError.InternalServerError(error)
    }

  return {
    statusCode: 201,
    body: JSON.stringify(auctions),
  };
}



export const handler = getAuction;


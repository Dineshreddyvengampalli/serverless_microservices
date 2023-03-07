import AWS from 'aws-sdk';
import createError from 'http-errors'
const dynamodb = new AWS.DynamoDB.DocumentClient();


async function getAuction(event, context) {
    let auctions;
    try {
        const result =  await dynamodb.scan(
        {
            TableName: process.env.AUCTION_TABLE_NAME,
        }).promise();

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


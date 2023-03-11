import {v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();


async function createAuction(event, context) {
  const {title} = JSON.parse(event.body);
  const createdAt = new Date();
  const endDate = new Date();
  endDate.setHours(createdAt.getHours() + 1);

  const auction = {
    id : uuid(),
    title,
    status : 'OPEN',
    createdAt : createdAt.toISOString(),
    endingAt : endDate.toISOString(),
    highestBid :{
      amount : 0
    }
  };

  await dynamodb.put({
    TableName: process.env.AUCTION_TABLE_NAME,
    Item: auction,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}



export const handler = createAuction;


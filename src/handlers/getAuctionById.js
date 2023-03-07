import AWS from 'aws-sdk';
import createError from 'http-errors'
const dynamodb = new AWS.DynamoDB.DocumentClient();


async function getAuctionById(event, context) {
    let {id} = event.pathParameters;
    let auction;
    try {
        const result =  await dynamodb.get({
            TableName : process.env.AUCTION_TABLE_NAME,
            Key :{id}
        }).promise()
        auction = result.Item
        console.log('result.Item',result.Item)
    } catch (error) {
        throw new createError.InternalServerError(error)
    }
    if(!auction){
        throw new createError.NotFound(`${id} not found `)
    }

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}



export const handler = getAuctionById;


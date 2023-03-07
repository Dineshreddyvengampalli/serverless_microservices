import AWS from 'aws-sdk';
import createError from 'http-errors'
const dynamodb = new AWS.DynamoDB.DocumentClient();


async function placeBid(event, context) {
    let {id} = event.pathParameters;
    console.log('id',id)
    let {amount} = JSON.parse(event.body)
    console.log('amount',amount)

    const params = {
        TableName : process.env.AUCTION_TABLE_NAME,
        Key : {id},
        UpdateExpression : 'set highestBid.amount = :amount',
        ExpressionAttributeValues: {
            ':amount' : amount
        },
        ReturnValues : 'ALL_NEW'
    }
    let auction;

    try {
        const result =  await dynamodb.update(params).promise()
        auction = result.Attributes
        console.log('result.Item',result.Item)
    } catch (error) {
        throw new createError.InternalServerError(error)
    }

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}



export const handler = placeBid;


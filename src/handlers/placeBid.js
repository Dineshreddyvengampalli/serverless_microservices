import AWS from 'aws-sdk';
import createError from 'http-errors'
import { getAuction } from '../lib/getAuctionById'

const dynamodb = new AWS.DynamoDB.DocumentClient();


async function placeBid(event, context) {
    let {id} = event.pathParameters;
    console.log('id',id)
    let {amount} = JSON.parse(event.body)
    const initialAuction = await getAuction(id)
    console.log('initial auction :',initialAuction)
    if(amount <= initialAuction.highestBid.amount){
        throw new createError.InternalServerError('Cannot place bid with lesser amount')
    }
    if(initialAuction.status == 'CLOSED'){
        throw new createError.InternalServerError('Sorry this bid is closed')
    }

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


import AWS from 'aws-sdk';
import createError from 'http-errors'
const dynamodb = new AWS.DynamoDB.DocumentClient();


export async function getAuction(id) {
    console.log('inside get auction')
    console.log('id',id)
    let auction;
    try {
        const result =  await dynamodb.get({
            TableName : process.env.AUCTION_TABLE_NAME,
            Key :{id}
        }).promise()
        auction = result.Item
    } catch (error) {
        throw new createError.NotFound(error)
    }
    if(!auction){
        throw new createError.NotFound(`${id} not found `)
    }

  return auction
}



export const handler = getAuction;


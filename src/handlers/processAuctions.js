import AWS from 'aws-sdk';
import createError from 'http-errors'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function closeAuction(auction){
    const params = {
        TableName: process.env.AUCTION_TABLE_NAME,
        Key: {id : auction.id},
        UpdateExpression : 'set #status = :status',
        ExpressionAttributeValues: {
            ':status' : 'CLOSED',
        },
        ExpressionAttributeNames: {
            '#status' : 'status',
        },

    }
    const result = await dynamoDb.update(params).promise()
    console.log('result : ',result)
    return result
}
async function processAuctions(event,context){
    const now = new Date()
    const params = {
        TableName: process.env.AUCTION_TABLE_NAME,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: '#status = :status AND endingAt <= :now',
        ExpressionAttributeValues: {
            ':status': 'OPEN',
            ':now': now.toISOString(),
        },
        ExpressionAttributeNames: {
            '#status': 'status',
        },
    }
    try {
        const auctionsToClose = await dynamoDb.query(params).promise()
        const updateAuctionPromises = auctionsToClose.Items.map((auction)=>{
            closeAuction(auction)
        })
        await Promise.all(updateAuctionPromises)
        return {'closed' : updateAuctionPromises.length}
    } catch (error) {
        throw new createError.InternalServerError(error)
    }
}


export const handler = processAuctions
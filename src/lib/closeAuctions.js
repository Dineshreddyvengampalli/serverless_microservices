import AWS from 'aws-sdk'

const dynomodb = new AWS.DynamoDB.DocumentClient()

export async function closeAuction(auction){
    const params = {
        TableName: process.env.AUCTION_TABLE_NAME,
        Key: {id : auction.id},
        KeyConditionExpression : 'set #status = :status',
        ExpressionAttributeValues: {
            ':status' : 'CLOSED'
        },
        ExpressionAttributeNames: {
            '#status' : 'status'
        }

    }
    const result = await dynomodb.update(params).promise()
    return result
}
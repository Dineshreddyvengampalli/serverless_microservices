import AWS from 'aws-sdk';
import createError from 'http-errors'
const dynamoDb = new AWS.DynamoDB.DocumentClient()
async function processAuctions(event,context){
    const now = new Date()
    const params = {
        TableName: process.env.AUCTION_TABLE_NAME,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: '#status = :status AND endingAt <= :now',
        ExpressionAttributeValues: {
            ':status': 'OPEN',
            ':now': now.toISOString()
        },
        ExpressionAttributeNames: {
            '#status': 'status'
        }
    }
    try {
        const response = await dynamoDb.query(params).promise()
        const result = response.Items
        console.log(result)
    } catch (error) {
        throw new createError.InternalServerError(error)
    }
}


export const handler = processAuctions
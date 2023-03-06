async function createAuction(event, context) {
  const {title} = JSON.parse(event.body)
  const createdAt = Date.now()
  const auction = {
    title,
    status : 'OPEN',
    createdAt
  }
  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}



export const handler = createAuction;


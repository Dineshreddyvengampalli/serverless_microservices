import { getAuction } from "../lib/getAuctionById";
async function getAuctionById(event, context) {
    console.log('inside main function')
    let {id} = event.pathParameters;
    console.log('inside main : id : ',id)
    const auction = await getAuction(id)
    console.log('inside main auction :',auction)

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}



export const handler = getAuctionById;


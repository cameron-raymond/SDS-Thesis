require('dotenv').config();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

let { connection_string } = process.env
connection_string = connection_string.replace(/\\n/g, '\n').replace(/\"/g, '');

exports.handler = async (event, context) => {
  let data = JSON.parse(event.body)
  let { PROLIFIC_PID } = data
  switch (event.httpMethod) {
    case "POST":
      console.log("Creating a new post-study response for " + PROLIFIC_PID)
      try {
        const client = await MongoClient.connect(connection_string);
        const db = await client.db('sds-thesis-db');
        await db.collection('post-study-responses').replaceOne({ '_id': PROLIFIC_PID }, data, { upsert: true });
        db.close();
        client.close();
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: error.message
          })
        }
      }
      return {
        statusCode: 200,
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        /* Required for cookies, authorization headers with HTTPS */
        'Access-Control-Allow-Credentials': true,
        body: event.body
      }
      break;
    case "DELETE":
      console.log("Removing post-study response for " + PROLIFIC_PID)
      try {
        const client = await MongoClient.connect(connection_string);
        const db = await client.db('sds-thesis-db');
        await db.collection('post-study-responses').deleteOne({ '_id': PROLIFIC_PID });
        db.close();
        client.close();
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: error.message
          })
        }
      }
      return {
        statusCode: 200,
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        /* Required for cookies, authorization headers with HTTPS */
        'Access-Control-Allow-Credentials': true,
        body: event.body
      }
      break;
  }
  return {
    statusCode: 404,
    body: JSON.stringify({ "error": "Request type not known." })
  }
}
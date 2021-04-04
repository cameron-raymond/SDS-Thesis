require('dotenv').config();
var admin = require("firebase-admin");

const { type,
  project_id,
  private_key,
  private_key_id,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url } = process.env

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type,
      project_id,
      "private_key": private_key[0] === '-' ? private_key : JSON.parse(private_key),
      private_key_id,
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url
    })
  });
}

const firestore = admin.firestore()

exports.handler = async (event, context) => {
  let data = JSON.parse(event.body)
  const { PROLIFIC_PID } = data
  // const { email, subscriptionId } = event.queryStringParameters
  console.log("Creating a new participant for " + PROLIFIC_PID)
  try {
    const query = await firestore.collection('participants').doc(PROLIFIC_PID.toString()).set(data)
    console.log(query)
    if (query.empty) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'User not found'
        })
      }
    }
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
    body: JSON.stringify({
      type,
      project_id,
      "private_key": private_key[0] === '-' ? private_key : JSON.parse(private_key),
      private_key_id,
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url
    })
  }
}
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


cert = {
  "type": type.replace(/\\n/g, '\n').replace(/\"/g, ''),
  "project_id": project_id.replace(/\\n/g, '\n').replace(/\"/g, ''),
  "private_key": private_key.replace(/\\n/g, '\n').replace(/\"/g, ''),
  "private_key_id": private_key_id.replace(/\\n/g, '\n').replace(/\"/g, ''),
  "client_email": client_email.replace(/\\n/g, '\n').replace(/\"/g, ''),
  "client_id": client_id.replace(/\\n/g, '\n').replace(/\"/g, ''),
  "auth_uri": auth_uri.replace(/\\n/g, '\n').replace(/\"/g, ''),
  "token_uri": token_uri.replace(/\\n/g, '\n').replace(/\"/g, ''),
  "auth_provider_x509_cert_url": auth_provider_x509_cert_url.replace(/\\n/g, '\n').replace(/\"/g, ''),
  "client_x509_cert_url": client_x509_cert_url.replace(/\\n/g, '\n').replace(/\"/g, '')
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(cert)
  });
}

const firestore = admin.firestore()

exports.handler = async (event, context) => {
  let data = JSON.parse(event.body)
  let { PROLIFIC_PID } = data
  switch (event.httpMethod) {
    case "POST":
      console.log("Creating a new experimental result for " + PROLIFIC_PID)
      try {
        const query = await firestore.collection('experimental-results').doc(PROLIFIC_PID.toString()).set(data)
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
      console.log("Removing experimental result for " + PROLIFIC_PID)
      try {
        const query = await firestore.collection('experimental-results').doc(PROLIFIC_PID.toString()).delete();
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
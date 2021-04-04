var admin = require("firebase-admin");

var serviceAccount = require("../../firebasekey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const firestore = admin.firestore()

exports.handler = async (event, context) => {
  let data = JSON.parse(event.body)
  const { PROLIFIC_PID } = data
  // const { email, subscriptionId } = event.queryStringParameters
  console.log("Creating a new experimental result for " + PROLIFIC_PID)
  try {
    const query = await firestore.collection('experimental-results').doc(PROLIFIC_PID.toString()).set(data)
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
    body: JSON.stringify(data)
  }
}
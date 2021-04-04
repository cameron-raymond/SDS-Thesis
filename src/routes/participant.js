// Creates a new participant item in the database's participants table
export async function post(req, res, next) {
  console.log("Creating a new participant")

  /* Initializes */
  res.setHeader('Content-Type', 'application/json')
  /* Retrieves the data */
  var data = req.body
  // Do something with the data...
  /* Returns the result */
  console.log(data)
  return res.end(JSON.stringify({ success: true }))
}
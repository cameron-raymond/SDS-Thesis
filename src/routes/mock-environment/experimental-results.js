// Creates a new experimental-results item in the database's experimental-results table
export async function post(req, res, next) {
    console.log("Creating a experimental-results")
    /* Initializes */
    res.setHeader('Content-Type', 'application/json')
    /* Retrieves the data */
    var data = req.body
    // Do something with the data...
    /* Returns the result */
    console.log(data)
    return res.end(JSON.stringify({ success: true }))
}
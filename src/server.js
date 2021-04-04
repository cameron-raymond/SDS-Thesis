import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

// const express = require('express')
const app = polka()
const bodyParser = require('body-parser')

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/participant', (req, res, next) => {
		console.log("Creating a new participant")
		/* Initializes */
		res.setHeader('Content-Type', 'application/json')
		/* Retrieves the data */
		var data = req.body
		// Do something with the data...
		/* Returns the result */
		console.log(data)
		return res.end(JSON.stringify({ success: true }))
	}).post('/mock-environment/experimental-results', (req, res, next) => {
		console.log("Creating an experimental-result")
		/* Initializes */
		res.setHeader('Content-Type', 'application/json')
		/* Retrieves the data */
		var data = req.body
		// Do something with the data...
		/* Returns the result */
		console.log(data)
		return res.end(JSON.stringify({ success: true }))
	}).post('/post-study-response', (req, res, next) => {
		console.log("Creating a new post-study response")
		/* Initializes */
		res.setHeader('Content-Type', 'application/json')
		/* Retrieves the data */
		var data = req.body
		// Do something with the data...
		/* Returns the result */
		console.log(data)
		return res.end(JSON.stringify({ success: true }))
	}).use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

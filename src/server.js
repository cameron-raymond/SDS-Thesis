require('dotenv').config();

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

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

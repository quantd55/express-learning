const express = require('express');
const app = express();
const port = 3001;

var users = [
		{id: 1, name: 'Thinh'},
		{id: 2, name: 'Hung'}
	];

app.set('view engine', 'pug');
app.get('/', (req, res) => {
	res.render('index', {
		name: 'Express'
	})
})

app.get('/users', (req, res) => {
	res.render('users/index',{
		users: users
	})
})

app.get('/users/search', (req, res) => {
	var keyword = req.query.q;
	var result = users.filter((user) => {
		return user.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
	})
	res.render('users/index',{
		users: result,
		q: keyword
	})
})

app.listen(port, () => {console.log('Running...')});
const express = require('express')
const users = require('./controller/users.js')
const profiles = require('./controller/profiles.js')
const posts = require('./controller/posts.js')
const comments = require('./controller/comments.js')
const db = {
  users: {
    id: 0,
    data: [],
  },
  profiles: {
    id: 0,
    data: [],
  },
  posts: {
    id: 0,
    data: [],
  },
  comments: {
    id: 0,
    data: [],
  },
}

const app = express()
app.use(express.json())
app.set('db', db)

app.get('/debug', (req, res) => {
	res.status(200).send(req.app.get('db'))
})
app.post('/sign-up', users.user)
app.patch('/profile/:userId', profiles.update)
app.post('/posts', posts.create)
app.post('/comments', comments.add)
app.get('/profile', profiles.fetch)
app.get('/user/:userId/posts', posts.get)
app.get('/posts/:postId', posts.view)

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})

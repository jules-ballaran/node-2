module.exports = {
	create: (req, res) => {
		const db = req.app.get('db')
		const { userId, content } = req.body

		const newPost = {id: db.posts.id, userId, content}
		db.posts.data.push(newPost)
		db.posts.id++
		res.status(201).send(newPost)
	},
	get: (req, res) => {
		const db = req.app.get('db')
		const { userId } = req.params

		const result = db.posts.data.filter(p => p.userId === parseInt(userId))

		res.status(200).send(result)
	},
	view: (req, res) => {
		const db = req.app.get('db')
		const { postId } = req.params
		const { comments } = req.query

		const result = db.posts.data.find(p => p.id === parseInt(postId))
		if(comments) {
			const postComments = db.comments.data.filter(c => c.postId === parseInt(postId))
			result.comments = postComments
		}
		res.status(200).send(result)
	}
}
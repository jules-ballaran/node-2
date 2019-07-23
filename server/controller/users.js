module.exports = {
	user: (req, res) => {
		const db = req.app.get('db')

		const { email, password } = req.body
		const newUser = {id: db.users.id, email, password}
		db.users.data.push(newUser)

		db.profiles.data.push({userId: db.users.id, thumbnail:null, about: ''})
		
		db.users.id++
		db.profiles.id++

		res.status(201).send(newUser)
	},
}
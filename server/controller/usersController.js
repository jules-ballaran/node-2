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
	debug: ,
	//profile
	update: (req, res) => {
		const db = req.app.get('db')
		const { userId } = req.params	
		const { about } = req.body

		const index = db.profiles.data.findIndex(p => p.userId === parseInt(userId))
		const updateProfile = {...db.profiles.data[index], thumbnail, about}
		
		db.profiles.data.splice(index, 1, updateProfile)
		res.status(200).send(updateProfile)
	},
}
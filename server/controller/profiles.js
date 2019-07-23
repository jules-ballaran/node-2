module.exports = {
	update: (req, res) => {
		const db = req.app.get('db')
		const { userId } = req.params	
		const { thumbnail, about } = req.body

		const index = db.profiles.data.findIndex(p => p.userId === parseInt(userId))
		const updateProfile = {...db.profiles.data[index], thumbnail, about}
		
		db.profiles.data.splice(index, 1, updateProfile)
		res.status(200).send(updateProfile)
	},
	fetch: (req, res) => {
		const db = req.app.get('db')
		const { email, userId } = req.query
		let result
		if(email){
			const user = db.users.data.find(u => u.email === email)
			result = db.profiles.data.find(p => p.userId === user.id)
		} else if (userId){
			result = db.profiles.data.find(p => p.userId === parseInt(userId))
		}
		res.status(200).send(result)
	}
}
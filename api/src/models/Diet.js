const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('diet', {
		name: {
			type: DataTypes.STRING,
			get() {
				const raw = this.getDataValue('name')
				return raw.toLowerCase()
			}
		}
	}, {
		timestamps: false,
	})
}




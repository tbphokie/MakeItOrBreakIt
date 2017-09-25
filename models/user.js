module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        }
    });
    User.associate = function (models) {
        User.hasMany(models.Habit, {
            onDelete: "cascade"
        });
    };
    return User;
}
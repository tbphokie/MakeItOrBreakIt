module.exports = function (sequelize, DataTypes) {
    var Habit = sequelize.define("Habit", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        make: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    Habit.associate = (function (models) {
        Habit.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Habit.hasMany(models.Progress, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "cascade"
        })
    });
    return Habit;
};
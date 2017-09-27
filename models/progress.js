module.exports = function (sequelize, DataTypes) {
    var Progress = sequelize.define("Progress", {
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW

        },
        consec_days: {
            type: DataTypes.INTEGER,
            default: 1
        }
    });
    
    
    Progress.associate = (function (models) {
        Progress.belongsTo(models.Habit, {
            foreignKey: {
                allowNull: false
            }
        });
    });
    return Progress;
};
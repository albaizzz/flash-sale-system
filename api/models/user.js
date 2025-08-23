module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  });
  return User;
};

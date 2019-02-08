module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    profile:{
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    }
  });
  //defining the association of the users and journals
  Users.associate = models =>{
    // Associating Users with Journals
    // When a user is deleted, also delete any associated Journals
    Users.hasMany(models.Journals, {
      onDelete: "cascade"
    });  
  };

  //defining the association of the users and entries  // but not sure will need it but good to know that it's there
  Users.associate = models =>{
    // Associating Users with Journals
    // When a user is deleted, also delete any associated Journals
    Users.hasMany(models.Entries, {
      onDelete: "cascade"
    });  
  };

  return Users;
};
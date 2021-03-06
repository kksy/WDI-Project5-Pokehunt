'use strict';

module.exports = function(sequelize, DataTypes) {
  var pokemon = sequelize.define('pokemon', {
    name: DataTypes.STRING,
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    image: DataTypes.STRING
  }, {
    timestamps: false
  });
  return pokemon;
};
import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/user';
import Recipient from '../app/models/recipient'
import Delivery from '../app/models/delivery'
import Package from '../app/models/package'
import File from '../app/models/file'
import DeliveryProblems from '../app/models/deliveryProblems'

const models = [User, Recipient, Delivery, Package, File, DeliveryProblems] ;

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);
    this.init();
    this.associate();
  }

  init() {
    models.forEach(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();

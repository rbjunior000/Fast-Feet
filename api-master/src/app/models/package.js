import Sequelize, { Model } from 'sequelize';

class Package extends Model {
  static init(sequelize) {
    super.init(
      {
        status:Sequelize.STRING,
        product: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id'});
    this.belongsTo(models.File, { foreignKey: 'signature_id' });
    this.belongsTo(models.Delivery, { foreignKey: 'deliveryman_id' });
    this.hasMany(models.DeliveryProblems, { foreignKey: 'package_id' })
  }
}
export default Package;

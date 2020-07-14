import Recipient from '../models/recipient';
import { Op } from 'sequelize'

class RecipientController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body)
    return res.json({ message:'Destinatario cadastrado com sucesso' })
  }

  async index(req,res) {
    const { name, page } = req.query;
    const recipients = await Recipient.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`
        }
      },
      limit: 5,
      offset: page * 5,
      attributes: ['id', 'name', 'rua', 'numero', 'cidade', 'estado']
    })

    const items = recipients.rows.map(item => {
      return [ item.id, item.name, `${item.rua}, ${item.numero}, ${item.cidade}, ${item.estado}` ] 
    })
    return res.json({items, count: recipients.count});
  }

  async recipientForm(req,res) {
    const recipients = await Recipient.findAll({
      attributes: ['id', 'name']
    })

    return res.json(recipients)
  }

  async recipientById(req,res) {
    const { id } = req.params;
    const response = await Recipient.findByPk(id, {
      attributes: ['id', 'name', 'rua', 'numero', 'complemento', 'estado', 'cidade', 'cep']
    });

    return res.json(response);
  }

  async update(req,res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);
    
    await recipient.update(req.body);

    return res.json({ message: 'Destinatario atualizado com sucesso!' })
  }

  async delete(req,res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);
    await recipient.destroy();

    return res.json({ message: 'Destinatario deletado com sucesso!' })
  }
}

export default new RecipientController();

import { Op } from 'sequelize'
import Package from '../models/package';
import Recipient from '../models/recipient';
import { getHours, format, startOfDay, endOfDay } from 'date-fns'
import { formatToDateTime, formatToDate, formatToCapitalized } from 'brazilian-values'
import Mail from '../../lib/Mail'
import Delivery from '../models/delivery'

class PackageController {
  async store(req, res) {
    const { product, deliveryman_id, recipient_id } = req.body;
    const packageA = await Package.create({
      product,
      deliveryman_id,
      recipient_id,
      status: 'PENDENTE'
    })

    const { name, email } = await Delivery.findOne({
      where: {
        id: req.body.deliveryman_id
      }
    })

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Voce tem uma nova entrega!',
      text: 'Voce tem uma nova entrega.'
    })
    // fazer o template do email pra ficar melhor
    
    return res.json({ packageA, message:'Encomenda cadastrado com sucesso' })
  }

  async update(req,res) {
    const { id } = req.params
    const packageA = await Package.findOne({
      where: {
        id
      }
    })
    const deliveriesLimit = await Package.findAndCountAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())]
        }
      }
    })
    if (deliveriesLimit.count >= 5) {
      return res.json({ message: 'Voce ja fez cinco retiradas hoje!'})
    }
    if (getHours(new Date()) > 2 && getHours(new Date()) < 20 ) {
      await packageA.update({
        start_date: new Date(),
        status: 'RETIRADA'
      })
      return res.json({ message: 'Mercadoria retirada' })
    } else {
      return res.json({ message: 'Nao é possivel retirar mercadoria nesse horario!' })
    }
  }

  async delivered(req,res) {
    const { id } = req.params;
    const { signature_id } = req.body;
    const packageA = await Package.findOne({
      where: {
        id
      }
    })

    await packageA.update({
      end_date: format(new Date(), 'Pp'),
      signature_id
    })

    return res.json({ message: 'atualizado com sucesso' });
  }

  async cancel(req,res) {
    const { id } = req.params;
    const packageA = await Package.findByPk(id);

    await packageA.update({
      status: 'CANCELADA'
    })

    return res.json({message: 'Encomenda cancelada com sucesso'})
  }

  async index(req,res) {
    const { page, filter } = req.query;
    const packages = await Package.findAndCountAll({
      where: {
        product: {
          [Op.iLike]: `${filter}%`
        }
      },
      limit: 5,
      offset: page * 5,
      attributes:['id', 'status'],
      include: [
        {
          model: Recipient,
          attributes: ['name', 'cidade', 'estado'], 
        },
        {
          model:Delivery,
          attributes: ['name']
        }
      ]
    }, { raw: true })
    const items = packages.rows.map( ({ dataValues }) => {
      const getInitials = (name) => {
        const [firstName = '', secondName = ''] = name.split(' ')
        return `${firstName.charAt(0).toUpperCase()}${secondName.charAt(0).toUpperCase()}`
      }
      return [ dataValues.id, dataValues.Recipient.name, getInitials(dataValues.Delivery.name), dataValues.Delivery.name, dataValues.Recipient.cidade, dataValues.Recipient.estado, dataValues.status ]
    })

    
    
    return res.json({ items, count: packages.count })
    // return res.json(packages)
  }

  async indexById(req,res) {
    const { id } = req.params;
    const response = await Package.findOne({
      where: {
        id
      },
      attributes: ['start_date', 'end_date', 'signature_id', 'product', 'status'],
      include: [
        {
          model: Recipient,
          attributes: ['name', 'rua', 'cidade', 'estado', 'numero', 'cep'], 
        },
        {
          model: Delivery,
          attributes: ['name'], 
        },
      ]
    });

    const items = [
      response.Recipient.rua, 
      response.Recipient.numero, 
      response.Recipient.cidade, 
      response.Recipient.estado, 
      response.Recipient.cep, 
      response.start_date ? formatToDate(response.start_date) : null,
      response.end_date,
      {
        delivery: response.Delivery.name,
        recipient: response.Recipient.name,
        product: response.product
      },
      formatToCapitalized(response.status),
    ]

    return res.json(items)
  }

  async updatePackage(req,res) {
    const { id } = req.params;
    const packageToUpdate = await Package.findByPk(id);
    await packageToUpdate.update(req.body);

    return res.json({ message: 'Package atualizado com sucesso!' })
  }

  async deletePackage(req,res) {
    const { id } = req.params;
    const deletePackage = await Package.findByPk(id);

    await deletePackage.destroy();

    return res.json({ message: 'Encomenda deletada com sucesso!' })
  }

}

export default new PackageController();

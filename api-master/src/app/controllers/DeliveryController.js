import Delivery from '../models/delivery';
import Package from '../models/package';
import { formatToDateTime, formatToDate } from 'brazilian-values';
import { format } from 'date-fns';
import Recipient from '../models/recipient'
import File from '../models/file'
import { Op } from 'sequelize'

class DeliveryController {
  async store(req, res) {
    const delivery = await Delivery.create(req.body)
    return res.json({delivery, message:'Entregador cadastrado com sucesso' })
  }

  async index(req,res) {
    const { id } = req.params;
    const {filter, filter2} = req.query;
    
    const response = await Package.findAll({
      attributes: ['id', 'product', 'start_date', 'end_date', 'deliveryman_id', 'status'],
      where: {
        deliveryman_id: id,
        canceled_at: null,
        status: {
          [Op.in] : [filter, filter2]
        },
      },
      include: [
        {
          model: Recipient,
          attributes: ['name', 'rua', 'numero', 'complemento', 'estado', 'cidade', 'cep' ]
        },
        {
          model: Delivery,
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              attributes: ['path']
            }
          ]
        }
      ]
    })
    const deliveries = response.map(item => {
      const getInitials = (name) => {
        const [firstName = '', secondName = ''] = name.split(' ')
          return `${firstName.charAt(0).toUpperCase()}${secondName.charAt(0).toUpperCase()}`
        }

      return {
        id: item.id, 
        cidade: item.Recipient.cidade, 
        start_date: item.start_date ? formatToDate(item.start_date) : null,
        recipientName: item.Recipient.name,
        endereco: `${item.Recipient.rua} ,${item.Recipient.numero}, ${item.Recipient.cidade} - MA, ${item.Recipient.cep}`,
        status: item.dataValues.status
      }
    })

    return res.json(deliveries)
  }

  async indexAll(req,res) {
    const { id } = req.params
    const deliveries = await Package.findAndCountAll({
      where: {
        deliveryman_id: id,
      },
      attributes: [ 'product', 'start_date', 'end_date']
    })
    const payload = deliveries.rows.map(item => item.dataValues).filter(item => item.end_date !== null).map(item => {
      return {
        product: item.product,
        start_date: formatToDateTime(item.start_date),
        end_date: formatToDateTime(item.end_date)
      }
    })

    return res.json( payload )
  }

  async deliveries(req,res) {
    const { page, name } = req.query;
    const deliveries = await Delivery.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`
        }
      },
      limit: 5,
      offset: page * 5,
      include: [
        {
          model:File,
          attributes: ['path']
        }
      ],
      attributes:['id', 'name', 'email']
    })

    const items = deliveries.rows.map(item => {
      const getInitials = (name) => {
      const [firstName = '', secondName = ''] = name.split(' ')
        return `${firstName.charAt(0).toUpperCase()}${secondName.charAt(0).toUpperCase()}`
      }
      return [ item.id, item.File ? `http://localhost:5555/files/${item.File.path}` : getInitials(item.name), item.name, item.email ]
    })

    return res.json({items, count: deliveries.count})
    // return res.json(deliveries);
  }

  async deliveryForm(req,res) {
    const deliveries = await Delivery.findAll({
      attributes: ['id', 'name']
    })

    return res.json(deliveries);
  }

  async deliveryById(req,res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id, {
      attributes: ['name', 'email'],
      include: [
        {
          model:File,
          attributes: ['id', 'path', 'url']
        }
      ]
    });

    return res.json(delivery);
  }

  async delete(req,res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);
    await delivery.destroy();

    return res.json({ message: 'Entregador deletado com sucesso!' })
  }

  async update(req,res) {
    const {id} = req.params;
    const delivery = await Delivery.findByPk(id);

    await delivery.update(req.body);

    return res.json({ message:'Entregador atualizado com sucesso!' })
  }

  async checkExist(req,res) {
    const {id} = req.params;
    const response = await Delivery.findByPk(id, {
      attributes: ['name', 'email', 'created_at'],
      include: [
        {
          model: File,
          attributes: ['path', 'url']
        }
      ]
    })

    if (!response) {
      return res.json({message: 'Não existe um entregador come esse ID!'})
    }
    const delivery = {
      ...response.dataValues, 
      created: formatToDate(response.dataValues.created_at)
    }

    return res.json({id, delivery, message: `Seja bem vindo, ${delivery.name}`})
  }


}

export default new DeliveryController();

import DeliveryProblems from '../models/deliveryProblems';
import Package from '../models/package';
import Delivery from '../models/delivery';
import Mail from '../../lib/Mail'
import { format } from 'date-fns'
import {formatToDate} from 'brazilian-values'

class DeliveryProblemsController {
  async store(req, res) {
    const { id} = req.params;
    const { description } = req.body;

    await DeliveryProblems.create({
      package_id: id,
      description
    })

    return res.json({message: 'Problema com a entrega cadastrada!'})
  }

  async index(req,res) {
    const packagesProblems = await Package.findAll({
      attributes:['id'],
      include: [
        {
          model: DeliveryProblems,
          attributes: ['description'],
        }
      ]
    })

    const payload = packagesProblems.filter(item => item.DeliveryProblems.length > 0 ).map(item => {
      return [item.id, item.DeliveryProblems.map(item => item.description)]
    })
    
   
      return res.json(payload)
  }

  async packageProblem(req,res) {
    const { id } = req.params;
    const packageProblem = await DeliveryProblems.findAll({
      attributes: ['description', 'created_at'],
      where: {
        package_id: id
      }
    })
    const problems = packageProblem.map( ({dataValues}) => {
      return {description: dataValues.description, date: formatToDate(dataValues.created_at)}
    });

    return res.json(problems)
  }

  async cancelDelivery(req,res) {
    const today = format(new Date(), 'Pp')
    const { id } = req.params;
    const cancelDelivery = await Package.findOne({
      include: [
        {
          model: DeliveryProblems,
          where: {
            id
          },
          attributes: ['id']
        }
      ],
      include: [
        {
          model: Delivery,
          attributes:['name', 'email']
        }
      ]
    })
    await cancelDelivery.update({
      canceled_at: today
    })

    await Mail.sendMail({
      to: `${cancelDelivery.Delivery.name} <${cancelDelivery.Delivery.email}>`,
      subject: 'Sua entrega foi cancelada!',
      text: `A sua entrega de um ${cancelDelivery.product} foi cancelada!`
    })

    return res.json({ cancelDelivery, message: 'Encomenda cancelada com sucesso!'})
  }

  async problemByPackageId(req,res) {
    const { id } = req.params;
    const problems = await Package.findByPk(id);

    return res.json(problems)
  }


}

export default new DeliveryProblemsController();

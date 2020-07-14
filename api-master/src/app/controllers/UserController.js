/* eslint-disable no-inner-declarations */
import * as Yup from 'yup';
import { Op } from 'sequelize';
import { addDays } from 'date-fns';
import User from '../models/user';
import Treino from '../models/recipient';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      sexo: Yup.string().required(),
      belt: Yup.string().required(),
      degree: Yup.number().required(),
      phone: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Por favor verifique os campos!' });
    }
    const nameExists = await User.findOne({ where: { name: req.body.name } });

    if (nameExists) {
      return res.status(400).json({ error: 'Esse aluno ja existe' });
    }

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (emailExists) {
      return res.status(400).json({ error: 'o email ja existe' });
    }
    await User.create({
      ...req.body,
      password: 'gbslzma',
    });
    return res.json({ message: 'Usuario criado com sucesso!' });
  }

  async index(req, res) {
    const { search } = req.query;
    const user = await User.findAll({
      where: { name: { [Op.startsWith]: `${search}%` } },
      attributes: ['id', 'name'],
    });
    res.json({ user });
  }

  async OneIndex(req, res) {
    const { id } = req.query;
    const user = await User.findByPk(id);
    res.json({ user });
  }

  async update(req, res) {
    const { id } = req.query;
    const { payment_date } = req.body;
    const user = await User.findOne({ where: { id } });
    await user.update({ payment_date });
    return res.json({});
  }

  async userUpdate(req, res) {
    const {
      id,
      name,
      birth,
      sexo,
      belt,
      degree,
      email,
      payment_date,
      phone,
    } = req.body;
    const user = await User.findByPk(id);
    await user.update({
      name,
      birth,
      sexo,
      belt,
      degree,
      email,
      payment_date,
      phone,
    });
    return res.json(user);
  }

}

export default new UserController();

import { logger } from '../config/logger.js';
import {studentModel} from '../models/gradeModel.js'

const create = async (req, res) => {
  let student = req.body;
  try {
    const grade = new studentModel(student);
    await grade.save((err) => {
      if (err) {
        throw err
      };
    });

    res.send(grade);
    logger.info(`POST /grade - ${JSON.stringify(grade)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const grades = await studentModel.find(condition).exec();
    res.send(grades);

    logger.info(`GET /grade`);

  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const grade = await studentModel.findById(id)
    res.send(grade);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;
  const grade = req.body;

  try {
    await gradeModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: grade.name,
          subject: grade.subject,
          type: grade.type,
          value: grade.value,
          lastModified: Date.now()
        }
      },
      {
        runValidators: true
      }
    );
    res.send({ message: 'Grade atualizado com sucesso' });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await studentModel.findByIdAndDelete(id);
    res.send({ message: 'Grade excluido com sucesso' });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (_req, res) => {

  try {
    await studentModel.deleteMany({});
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};


export default { create, findAll, findOne, update, remove, removeAll };

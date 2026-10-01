import { Sequelize } from 'sequelize';

// Em testes usa SQLite em memória; fora deles, um arquivo local.
// Para MySQL/PostgreSQL, basta trocar o dialect e as credenciais.
const storage = process.env.NODE_ENV === 'test' ? ':memory:' : 'database.sqlite';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false,
});

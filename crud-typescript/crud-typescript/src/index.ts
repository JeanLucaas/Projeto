import { sequelize } from './config/database';
import { UserRepository } from './repositories/UserRepository';
import { UserService } from './services/UserService';

(async () => {
  await sequelize.sync({ force: true });
  const service = new UserService(new UserRepository());

  const u = await service.create({ name: 'Ana', email: 'ana@email.com' });
  console.log('Criado:', u.toJSON());
  console.log('Lista:', (await service.list()).map((x) => x.toJSON()));
  console.log('Atualizado:', (await service.update(u.id, { name: 'Ana Maria', email: 'ana@email.com' })).toJSON());
  await service.remove(u.id);
  console.log('Removido. Total:', (await service.list()).length);
  await sequelize.close();
})();

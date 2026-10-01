import { sequelize } from '../src/config/database';
import { UserRepository } from '../src/repositories/UserRepository';
import { UserService } from '../src/services/UserService';

const valid = { name: 'Ana', email: 'ana@email.com' };
let service: UserService;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});
beforeEach(async () => {
  await sequelize.truncate();
  service = new UserService(new UserRepository());
});
afterAll(async () => {
  await sequelize.close();
});

describe('UserService - CRUD', () => {
  test('CREATE', async () => {
    const u = await service.create(valid);
    expect(u.id).toBeDefined();
    expect(u.name).toBe('Ana');
  });

  test('CREATE com dados inválidos', async () => {
    await expect(service.create({ name: 'Ana', email: '' })).rejects.toThrow('obrigatórios');
    await expect(service.create({ name: 'Ana', email: 'x' })).rejects.toThrow('inválido');
  });

  test('READ (list e get)', async () => {
    const u = await service.create(valid);
    expect(await service.list()).toHaveLength(1);
    expect((await service.get(u.id)).email).toBe(valid.email);
  });

  test('READ de inexistente', async () => {
    await expect(service.get(999)).rejects.toThrow('não encontrado');
  });

  test('UPDATE', async () => {
    const u = await service.create(valid);
    const up = await service.update(u.id, { name: 'Bia', email: 'bia@email.com' });
    expect(up.name).toBe('Bia');
  });

  test('UPDATE de inexistente', async () => {
    await expect(service.update(999, valid)).rejects.toThrow('não encontrado');
  });

  test('DELETE', async () => {
    const u = await service.create(valid);
    expect(await service.remove(u.id)).toBe(true);
    expect(await service.list()).toHaveLength(0);
  });

  test('DELETE de inexistente', async () => {
    await expect(service.remove(999)).rejects.toThrow('não encontrado');
  });
});

import { IRepository } from '../interfaces/IRepository';
import { User, UserCreation } from '../models/User';

export class UserRepository implements IRepository<User, UserCreation> {
  async create(data: UserCreation): Promise<User> {
    return User.create(data);
  }

  async findAll(): Promise<User[]> {
    return User.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async update(id: number, data: UserCreation): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
  }
}

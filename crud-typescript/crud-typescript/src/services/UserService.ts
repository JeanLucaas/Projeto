import { IRepository } from '../interfaces/IRepository';
import { User, UserCreation } from '../models/User';

export class UserService {
  constructor(private readonly repository: IRepository<User, UserCreation>) {}

  private validate({ name, email }: UserCreation): void {
    if (!name || !email) throw new Error('Nome e email são obrigatórios.');
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Email inválido.');
  }

  async create(data: UserCreation): Promise<User> {
    this.validate(data);
    return this.repository.create(data);
  }

  async list(): Promise<User[]> {
    return this.repository.findAll();
  }

  async get(id: number): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) throw new Error('Usuário não encontrado.');
    return user;
  }

  async update(id: number, data: UserCreation): Promise<User> {
    this.validate(data);
    const user = await this.repository.update(id, data);
    if (!user) throw new Error('Usuário não encontrado.');
    return user;
  }

  async remove(id: number): Promise<boolean> {
    const ok = await this.repository.delete(id);
    if (!ok) throw new Error('Usuário não encontrado.');
    return true;
  }
}

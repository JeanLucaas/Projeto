/**
 * Interface genérica de repositório.
 * T = entidade, C = dados necessários para criação.
 */
export interface IRepository<T, C> {
  create(data: C): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  update(id: number, data: C): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

import { Entity } from "../entity";
import { ValueObject } from "../value-object";
import type { SearchParams } from "./search-params";
import type { SearchResult } from "./search-results";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  bulkInsert(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entity_id: EntityId): Promise<void>;
  findById(entity_id: EntityId): Promise<E>;
  findAll(): Promise<E[]>;
  getEntity(): new (...args: any[]) => E;
}

export interface ISearchableRepository<
  E extends Entity,
  EntityId extends ValueObject,
  SearchInput = SearchParams,
  SearchOutput = SearchResult
> extends IRepository<E, EntityId> {
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}

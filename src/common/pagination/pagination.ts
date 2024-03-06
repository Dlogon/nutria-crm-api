import { BaseModelEntity } from '../database/entities';

export class Pagination<PaginationEntity extends BaseModelEntity> {
  public data: PaginationEntity[];
  public page_total: number;
  public total: number;

  constructor(results: PaginationEntity[], total) {
    this.data = results;
    this.page_total = results.length;
    this.total = total;
  }
}

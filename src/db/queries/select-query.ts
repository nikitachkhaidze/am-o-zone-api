import format from 'pg-format';

export class SelectQuery {
  private query = '';

  constructor(selectList: string, tableName: string) {
    this.query = format('SELECT %s from %I', selectList || '*', tableName);
  }

  addJoins(joins?: Record<string, string>) {
    if (!joins) {
      return this;
    }

    const joinStatements = Object.entries(joins).map(([key, value]) => format('JOIN %s ON %s', key, value));
    this.query = `${this.query} ${joinStatements.join(' ')}`;

    return this;
  }

  addWheres(filters?: Record<string, string>) {
    if (!filters) {
      return this;
    }

    const conditions = Object.entries(filters).map(([key, value]) => format('%s = %L', key, value));
    this.query = `${this.query} WHERE ${conditions.join(' AND ')}`;

    return this;
  }

  addLimit(limit?: number) {
    if (!limit) {
      return this;
    }

    this.query = `${this.query} ${format('LIMIT %L', limit)}`;
    return this;
  }

  addOffset(offset?: number) {
    if (!offset) {
      return this;
    }

    this.query = `${this.query} ${format('OFFSET %L', offset)}`;
    return this;
  }

  addOrderBy(orderBy?: string) {
    if (!orderBy) {
      return this;
    }

    this.query = `${this.query} ${format('ORDER BY %I', orderBy)}`;
    return this;
  }

  getQuery() {
    const { query } = this;
    this.query = '';

    return query;
  }
}
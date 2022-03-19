export type QUERY_FIELD = 'name' | 'price' | 'color' | 'brand';
export type OPERATOR = 'like' | '=' | 'ilike' | '>' | '<' | '>=' | '<=' | 'range';
export type OPERAND = 'and' | 'or';
export type SORT = 'asc' | 'desc';
// export type QUERY  = {
//   [key in QUERY_FIELD]: string; | RegExp | number;
// }
export type SEARCH_PARAM = {
  field: QUERY_FIELD;
  operator: OPERATOR;
  value: any;
  sortBy?: {
    field: QUERY_FIELD,
    order: SORT
  }
};

export type QUERY_FIELD = 'name' | 'price' |  'color' | 'brand';
export type OPERATOR =  'like' | '=' | 'ilike';
export type OPERAND = 'and' | 'or' ;

// export type QUERY  = {
//   [key in QUERY_FIELD]: string; | RegExp | number;
// }
export type SEARCH_PARAM = {
  field: QUERY_FIELD;
  operator: OPERATOR;
  value: any;
}
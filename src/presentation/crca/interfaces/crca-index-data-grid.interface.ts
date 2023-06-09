export interface CrcaIndexDataGridInterface {
  name:string,
  width:string,
  aligment:string,
  visible:boolean,
  caption?:string,
  dataList?:CrcaIndexDataGridList[],
  format?:string
}
export interface CrcaIndexDataGridList{
  valueExpr:string | number,
  displayExpr:string
}
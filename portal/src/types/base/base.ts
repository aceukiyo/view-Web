import { paginatedList } from '../system/common';

export interface tableQueryData extends paginatedList {
  address: string | null,
  name: string | undefined
};

export interface allDatas {
  tableData: paginatedList[],
};


export type user = paginatedList & {
  name: string,
  shortname: string,
};


export class editOptions {

}
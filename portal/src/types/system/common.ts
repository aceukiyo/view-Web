export interface paginatedList {
  currentPage: number | null,
  pageSize: number | null,
  searchText: string | null,
};

export interface paginatedListBySearchText extends paginatedList {
  sortBy: string | null,
  isDesc: boolean
};

export interface baseform {
  id: number,
  creator?: string,
  create_time?: Date,
  lastModifiedBy?: string,
  lastModified?: Date
};
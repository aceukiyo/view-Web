import { defineStore } from 'pinia';


interface userInfo {
  userId: string | number
	name: string;
  roleName: string
	email: string;
}

export const useUserInfoStore = defineStore('userInfo', {
	state: () => {
		return {	
      
		};
	},
	getters: {
	},
	actions: {
	}
});


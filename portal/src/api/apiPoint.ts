//index
import { Post, Delete, Put, Get } from '../api/index';

//login
export async function getLogin(user: object) {
  return await Get("/Account/login", user);
};

//Get user menu dynamically
export async function getUserAuthority(userId: number) {
  return await Get("", { userId });
};

export async function getUsers(basicParams: any) {
  return await Get("/User", basicParams);
};

export async function getUserDetail(id: number) {
  return await Get("/User", { id });
};

export async function saveUser(userDto: any) {
  return await Post("/User", userDto);
};

export async function deleteUser(id: number) {
  return await Delete("/User", id);
};

export async function getTuses(params: any) {
  return await Get("/Tsu", params)
};

export async function getLocations(params: any) {
  return await Get("/Location", params);
};

export async function getParcels(params: any) {
  return await Get("/packages", params)
};



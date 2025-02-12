export type loginDataDTO = { matricule: string; password: string };
export type UserPayload = { userId: string };
export type RequestWithUser = { user: UserPayload };
export type CreateUser = { matricule: string; name: string; password: string };

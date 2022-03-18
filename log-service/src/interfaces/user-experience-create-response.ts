import { IUserExperience } from "./user-experience.interface";
import { IBaseResponse } from "./base-response.interface";
export interface IUserExperienceResponse extends IBaseResponse {
  userExperience?: IUserExperience,
}
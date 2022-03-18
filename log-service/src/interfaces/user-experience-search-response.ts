import { IUserExperience } from "./user-experience.interface";
import { IBaseResponse } from "./base-response.interface";
export interface IUserExperienceSearchResponse extends IBaseResponse {
  userExperiences?: IUserExperience[],
}
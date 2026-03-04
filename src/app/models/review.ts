import { Movie } from "./movie";
import { User } from "./user";

export interface Review {
  id?: number;
  movie?:Movie
  user?: User;
  rate: number;
  text: string;
  reviewDate?: Date;
}
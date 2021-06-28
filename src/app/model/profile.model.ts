import { Projet } from './projet.model';
import { User } from './user.model';
import { Role } from './role.model';
export class Profile {
    profileId?: number;
    projet?: Projet;
    user?: User;
    role?: Role
}
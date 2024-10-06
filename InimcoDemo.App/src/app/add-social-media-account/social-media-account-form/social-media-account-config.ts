import { ValidatorFn } from "@angular/forms";
import { IconDefinition } from "@fortawesome/angular-fontawesome";
import { SocialMediaAccountType } from "../../../services/person.service";

export interface SocialMediaAccountConfig {
    type: SocialMediaAccountType,
    icon: IconDefinition,
    validators?: ValidatorFn[],
    baseUrl?: string
}
import { IconDefinition } from "@fortawesome/angular-fontawesome";
import { SocialMediaAccountType } from "../../../services/person.service";
import { faDiscord, faFacebook, faLinkedin, faReddit, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export interface SocialMediaAccountConfig {
    type: SocialMediaAccountType,
    icon: IconDefinition,
    userNameRegExp: RegExp;
    baseUrl?: string
}

export const facebookAccountConfig: SocialMediaAccountConfig = {
    icon: faFacebook,
    type: SocialMediaAccountType.Facebook,
    baseUrl: 'https://www.facebook.com/',
    userNameRegExp: /^(?=.{5,50}$)[a-zA-Z0-9.]+$/
}

export const linkedInAccountConfig: SocialMediaAccountConfig = {
    icon: faLinkedin,
    type: SocialMediaAccountType.LinkedIn,
    baseUrl: 'https://www.linkedin.com/in/',
    userNameRegExp: /^(?=.{3,100}$)[a-zA-Z0-9]+$/
}

export const xTwitterAccountConfig: SocialMediaAccountConfig = {
    icon: faXTwitter,
    type: SocialMediaAccountType.XTwitter,
    baseUrl: 'https://x.com/',
    userNameRegExp: /^(?=.{4,15}$)[a-zA-Z0-9_]+$/
}

export const redditAccountConfig: SocialMediaAccountConfig = {
    icon: faReddit,
    type: SocialMediaAccountType.Reddit,
    baseUrl: 'https://www.reddit.com/user/',
    userNameRegExp: /^(?=.{3,38}$)[a-zA-Z0-9_-]+$/
}

export const discordAccountConfig: SocialMediaAccountConfig = {
    icon: faDiscord,
    type: SocialMediaAccountType.Discord,
    userNameRegExp: /^(?=.{3,100}$).+/
}
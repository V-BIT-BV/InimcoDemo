import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLinkedin, faFacebook, faXTwitter, faReddit, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { Person, PersonService, SocialMediaAccount, SocialMediaAccountType } from '../../services/person.service';
import { take } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { SocialMediaAccountFormComponent } from "./social-media-account-form/social-media-account-form.component";
import { SocialMediaAccountConfig } from './social-media-account-form/social-media-account-config';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-social-media-account',
  standalone: true,
  templateUrl: './add-social-media-account.component.html',
  styleUrl: './add-social-media-account.component.scss',
  imports: [CommonModule, FontAwesomeModule, SocialMediaAccountFormComponent, LoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSocialMediaAccountComponent extends BaseComponent { 
  @Input() public person!: Person;
  @Output() public socialMediaAccountsSaved = new EventEmitter<void>();

  public facebookAccountConfig: SocialMediaAccountConfig = {
    icon: faFacebook,
    type: SocialMediaAccountType.Facebook,
    baseUrl: 'https://www.facebook.com/',
    validators: [ this.usernameValidator(/^(?=.{5,50}$)[a-zA-Z0-9.]+$/) ]
  }

  public linkedInAccountConfig: SocialMediaAccountConfig = {
    icon: faLinkedin,
    type: SocialMediaAccountType.LinkedIn,
    baseUrl: 'https://www.linkedin.com/in/',
    validators: [ this.usernameValidator(/^(?=.{3,100}$)[a-zA-Z0-9]+$/) ]
  }

  public xTwitterAccountConfig: SocialMediaAccountConfig = {
    icon: faXTwitter,
    type: SocialMediaAccountType.XTwitter,
    baseUrl: 'https://x.com/',
    validators: [ this.usernameValidator(/^(?=.{4,15}$)[a-zA-Z0-9_]+$/) ]
  }

  public redditAccountConfig: SocialMediaAccountConfig = {
    icon: faReddit,
    type: SocialMediaAccountType.Reddit,
    baseUrl: 'https://www.reddit.com/user/',
    validators: [ this.usernameValidator(/^(?=.{3,38}$)[a-zA-Z0-9_-]+$/) ]
  }

  public discordAccountConfig: SocialMediaAccountConfig = {
    icon: faDiscord,
    type: SocialMediaAccountType.Discord,
    validators: [ this.usernameValidator(/^(?=.{3,100}$).+/) ],
  }

  private _accounts: SocialMediaAccount[] = [];
  
  constructor(public readonly personService: PersonService) { super() }

  public saveSocialMediaAccounts(): void {
    this.personService.saveSocialMediaAccounts(this.person.id, this._accounts.filter(a => !!a.address))
    .pipe(take(1))
    .subscribe(_ => this.socialMediaAccountsSaved.emit());
  }

  public updateSocialMediaAccount(account: SocialMediaAccount): void {
    const existingAccount = this._accounts.find(a => a.type === account.type);

    if(!existingAccount) {
      this._accounts.push(account);
    } else {
      existingAccount.address = account.address;
    }
  }

  private usernameValidator(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      return pattern.test(control.value) ? null : { invalidUsername: true };     
    };
  }
}

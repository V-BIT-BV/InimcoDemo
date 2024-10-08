import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Person, PersonService, SocialMediaAccount } from '../../services/person.service';
import { take } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { SocialMediaAccountFormComponent } from "./social-media-account-form/social-media-account-form.component";
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { 
  discordAccountConfig, 
  facebookAccountConfig, 
  linkedInAccountConfig, 
  redditAccountConfig, 
  xTwitterAccountConfig 
} from './social-media-account-form/social-media-account-config';

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

  public facebookAccountConfig = facebookAccountConfig;
  public linkedInAccountConfig = linkedInAccountConfig;
  public xTwitterAccountConfig = xTwitterAccountConfig;
  public redditAccountConfig = redditAccountConfig;
  public discordAccountConfig = discordAccountConfig;

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
}

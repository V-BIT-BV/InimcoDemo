import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SocialMediaAccountConfig } from './social-media-account-config';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from '../../base/base.component';
import { PersonService, SocialMediaAccount } from '../../../services/person.service';
import { debounceTime, takeUntil } from 'rxjs';
import { faArrowUpRightFromSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-social-media-account-form',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  templateUrl: './social-media-account-form.component.html',
  styleUrl: './social-media-account-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialMediaAccountFormComponent extends BaseComponent implements OnInit {
  @Input() public config!: SocialMediaAccountConfig;
  @Output() public socialMediaAccountUpdated = new EventEmitter<SocialMediaAccount>();

  public get accountControl(): AbstractControl { return this.accountForm.get('account')!; }

  public faTimes = faTimes;
  public faLink = faArrowUpRightFromSquare;

  public isDisabled = false;

  public accountForm!: FormGroup;

  constructor(public readonly personService: PersonService) { super() }

  public ngOnInit(): void {
    this.accountForm = new FormGroup({
      account: new FormControl<string | null>(null, this.config.validators)
    });

    this.accountControl.valueChanges
    .pipe(
      debounceTime(300),
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(value => {
      const account: SocialMediaAccount = {
        type: this.config.type,
        address: this.accountControl.valid && !!value ? value : null
      };
      this.socialMediaAccountUpdated.emit(account);
    });

    this.personService.isSavingSocialMediaAccounts$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(isloading => {
      if (isloading) {
        this.accountForm.disable();
      } else {
        this.accountForm.enable();
      }

      this.isDisabled = isloading;
    });
  }

  public clear(): void {
    this.accountForm.reset();
  }

  public openAccountPage(): void {
    if (!this.accountForm.valid || !this.accountForm.value) {
      return;
    }

    window.open(`${this.config.baseUrl}${this.accountControl.value}`, '_blank');
  }  
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Person, PersonService } from '../../services/person.service';
import { LoaderComponent } from '../loader/loader.component';
import { take, takeUntil } from 'rxjs';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-add-skills',
  standalone: true,
  templateUrl: './add-skills.component.html',
  styleUrl: './add-skills.component.scss',
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, LoaderComponent],
  providers: [PersonService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSkillsComponent extends BaseComponent implements OnInit {
  @Input() public person!: Person;
  @Output() public skillsSaved = new EventEmitter<void>();

  public get skillControl(): AbstractControl { return this.skillForm.get('skill')!; }

  public faTimes = faTimes;
  public faPlus = faPlus;

  public skills: string[] = [];

  public skillForm = new FormGroup({ 
    skill: new FormControl('', [Validators.required, this.uniqueValidator(this.skills)])
  });

  constructor(public readonly personService: PersonService) { super(); }

  public ngOnInit(): void {
    this.personService.isSavingSkills$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(isloading => {
      if (isloading) {
        this.skillForm.disable();
      } else {
        this.skillForm.enable();
      }
    });
  }

  public saveSkills(): void {
    this.personService.saveSkills(this.person.id, this.skills)
    .pipe(take(1))
    .subscribe(_ => this.skillsSaved.emit());
  }

  public addSkill(): void {
    if (this.skillForm.disabled || !this.skillForm.valid) {
      return;
    }

    this.skills.push(this.skillControl.value.trim());
    this.skillControl.reset();
  }

  public removeSkill(skill: string): void {
    if (this.skillForm.disabled) {
      return;
    }

    const skillIndex = this.skills.indexOf(skill);

    if (skillIndex === -1) {
      return;
    }

    this.skills.splice(skillIndex, 1);
    this.skillControl.updateValueAndValidity();
  }

  private uniqueValidator(skills: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
    
      return skills.indexOf(control.value) === -1 ? null : { notUnique: true };     
    };
  }
}

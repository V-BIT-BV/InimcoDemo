import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Person, PersonService } from '../../services/person.service';
import { take, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrl: './create-person.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
  providers: [PersonService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePersonComponent extends BaseComponent implements OnInit {
  @Output() public personCreated = new EventEmitter<Person>();

  public get firstNameControl(): AbstractControl { return this.personForm.get('firstName')!; }
  public get lastNameControl(): AbstractControl { return this.personForm.get('lastName')!; }

  public personForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  });  

  constructor(public readonly personService: PersonService) { super(); }

  public ngOnInit(): void {
    this.personService.isPersonCreating$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(isloading => {
      if (isloading) {
        this.personForm.disable();
      } else {
        this.personForm.enable();
      }
    });
  }

  public createPerson(): void {
    if (!this.personForm.valid) {
      return;
    }

    const firstName: string = this.firstNameControl.value!.trim();
    const lastName: string = this.lastNameControl.value!.trim();

    this.personService.createPerson(firstName, lastName)
    .pipe(take(1))
    .subscribe(personId => {
      this.personCreated.emit(personId);
    });
  }
}

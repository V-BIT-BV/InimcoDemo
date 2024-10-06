import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { Person, PersonService } from '../../services/person.service';
import { BaseComponent } from '../base/base.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent
  ],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetailsComponent extends BaseComponent implements OnInit {
  @Input() public person!: Person;

  public personDetails: string | undefined;

  constructor(public readonly personService: PersonService,
              private readonly cdRef: ChangeDetectorRef
  ) { super(); }
  
  public ngOnInit(): void {
    this.personService.getOutput(this.person.id)
    .pipe(take(1))
    .subscribe(output => {
      this.personDetails = output;
      this.cdRef.markForCheck();
    });
  }
}

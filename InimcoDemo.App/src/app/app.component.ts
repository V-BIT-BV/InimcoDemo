import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreatePersonComponent } from "./create-person/create-person.component";
import { AddSkillsComponent } from "./add-skills/add-skills.component";
import { AddSocialMediaAccountComponent } from "./add-social-media-account/add-social-media-account.component";
import { Person } from '../services/person.service';
import { CommonModule } from '@angular/common';
import { PersonDetailsComponent } from "./person-details/person-details.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CreatePersonComponent, AddSkillsComponent, AddSocialMediaAccountComponent, PersonDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public person: Person | undefined;
  public skillsAdded: boolean = false;
  public socialMediaAccountsAdded: boolean = false;

  constructor() {}

  public personCreated(person: Person): void {
    this.person = person;
  }

  public skillsSaved(): void {
    this.skillsAdded = true;
  }

  public socialMediaAccountsSaved(): void {
    this.socialMediaAccountsAdded = true;
  }
}

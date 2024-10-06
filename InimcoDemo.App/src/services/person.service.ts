import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, delay, map, tap } from "rxjs";

export interface Person {
    id: string,
    firstName: string,
    lastName: string
}

export enum SocialMediaAccountType {
    Facebook = 0,
    LinkedIn,
    XTwitter,
    Discord,
    Reddit
}

export interface SocialMediaAccount {
    type: SocialMediaAccountType,
    address: string
}

@Injectable({
    providedIn: "root"
})
export class PersonService {
    private _baseUrl = 'https://localhost:7066/api/person';

    private _isPersonCreating$ = new BehaviorSubject<boolean>(false);
    public get isPersonCreating$(): Observable<boolean> { return this._isPersonCreating$ }

    private _isSavingSkills$ = new BehaviorSubject<boolean>(false);
    public get isSavingSkills$(): Observable<boolean> { return this._isSavingSkills$ }

    private _isSavingSocialMediaAccounts$ = new BehaviorSubject<boolean>(false);
    public get isSavingSocialMediaAccounts$(): Observable<boolean> { return this._isSavingSocialMediaAccounts$ }

    constructor(private readonly http: HttpClient) { }

    public createPerson(firstName: string, lastName: string): Observable<Person> {
        const request = {
            firstName,
            lastName
        }

        this._isPersonCreating$.next(true);

        return this.http.post(`${this._baseUrl}`, request)
            .pipe(
                tap(_ => this._isPersonCreating$.next(false)),
                map(res => ({
                    id: res.toString(),
                    firstName,
                    lastName
                }))
            )
    }   

    public saveSkills(personId: string, skills: string[]): Observable<boolean> {
        const request = {
            skills
        }

        this._isSavingSkills$.next(true);

        return this.http.post(`${this._baseUrl}/${personId}/skills`, request)
            .pipe(
                tap(_ => this._isSavingSkills$.next(false)),
                map(res => true)
            )
    }   

    public saveSocialMediaAccounts(personId: string, socialMediaAccounts: SocialMediaAccount[]): Observable<boolean> {
        const request = {
            socialMediaAccounts
        }

        this._isSavingSocialMediaAccounts$.next(true);

        return this.http.post(`${this._baseUrl}/${personId}/socialmediaaccounts`, request)
            .pipe(
                tap(_ => this._isSavingSocialMediaAccounts$.next(false)),
                map(res => true)
            )
    }

    public getOutput(personId: string): Observable<string> {
        return this.http.get(`${this._baseUrl}/${personId}/output`, { responseType: 'text'})
            .pipe(map(res => res.toString()));
    }
}
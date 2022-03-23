
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IUpdatePersonGender } from './UpdateGenderPerson';
import { IPerson } from './Person';
import { IPersonService } from './IPersonService';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PersonService implements IPersonService {
  private host= environment.host;
  private unKnownGenderPersonsUrl = `${this.host}/api/unKnownGenderPersons`;
  private updatePersonsUrl = `${this.host}/api/updateGenderPersons`;

  constructor(private http: HttpClient) { }

  getPersons(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this.unKnownGenderPersonsUrl)
      .pipe(
        //tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updatePerson(id: number, gender: string, modifiedby: string): Observable<any> {
    let updateGender: IUpdatePersonGender = {
      id: id,
      gender: gender,
      modifiedby: modifiedby
    };
    let body: string= JSON.stringify(updateGender);
    return this.http.post<any>(`${this.updatePersonsUrl}`, updateGender).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

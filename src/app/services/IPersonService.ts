import { Observable } from "rxjs";
import { IPerson } from "./Person";

export interface IPersonService{

    getPersons(): Observable<IPerson[]>;
    updatePerson(id: number, value: string, modifiedby: string): Observable<any>;
    
}
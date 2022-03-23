import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPerson } from '../services/Person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor(private personService: PersonService, private rout: ActivatedRoute) {}
  people: IPerson[] = [];
  currentPersonName: string = '';
  counter: number = 0;
  value: string = 'Unknown';
  id: number= 0;
  modificatedBy: any="";

  ngOnInit(): void {
    this.personService.getPersons().forEach((person) => {
      this.people = person;
      this.currentPersonName = this.getName(0);
      this.id= this.people[0].id;
      console.log(this.id);
      this.modificatedBy= this.rout.snapshot.paramMap.get('name');
      console.log(this.modificatedBy);
    });
  }

  onNext() {
    this.counter++;
    this.id= this.people[this.counter].id;
    console.log(this.id);
    this.currentPersonName = this.getName(this.counter);
  }

  onPrevious() {
    this.counter--;
    this.id= this.people[this.counter].id;
    console.log(this.id);
    this.currentPersonName = this.getName(this.counter);
  }

  setGender(value: string) {
    this.personService.updatePerson(this.id, value, this.modificatedBy)
    .subscribe(value => console.log(value));

    if (value == 'Unknown') this.onNext();
    else {
      this.people.splice(this.counter, 1);
      this.id= this.people[this.counter].id;
      this.currentPersonName = this.getName(this.counter);
    }
    console.log(this.counter);
  }

  getName(id: number): string {
    return `${this.people[id].FirstName} ${this.people[id].SecondName} ${this.people[id].ThirdName} ${this.people[id].FamilyName}`;
  }
}

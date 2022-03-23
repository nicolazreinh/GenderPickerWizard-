import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }
  name: string ="";

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.name);
    // if(this.name!="")
    //  this.router.navigate(['items'], { relativeTo: this.route });


  }

}

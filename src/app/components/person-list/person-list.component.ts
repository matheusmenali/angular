import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.css"],
})
export class PersonListComponent implements OnInit {
  public personForm: FormGroup;
  public personFormFields = {
    id: [""],
    nome: ["", Validators.required],
    email: [""],
    phone: [""],
    whatzapp: [""],
  };

  public flagUpdateControl = false;
  public persons = [];
  public shouldDisplayForm = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject("personService") private personService
  ) {
    this.personForm = this.fb.group(this.personFormFields);

    this.personService.getPersons().subscribe((result) => {
      this.persons = result;
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.personService.insertPerson(this.personForm.value).subscribe(
      (result) => {
        // quando é um update
        if (this.flagUpdateControl) {
          const index = this.persons.findIndex(
            (person) => person.id == result.id
          );
          this.persons[index] = result;
          this.flagUpdateControl = false;
        } else {
          //quando é um insert
          this.persons.push(result);
        }
        this.showForm();
        this.personForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showForm() {
    this.shouldDisplayForm = !this.shouldDisplayForm;
  }

  updatePerson(personId) {
    const index = this.persons.findIndex((person) => person.id == personId);
    this.personForm.patchValue(this.persons[index]);
    this.showForm();
    this.flagUpdateControl = true;
  }

  deletePerson(personId) {
    this.personService.deletePerson(personId).subscribe(
      (result) => {
        if (result) {
          const index = this.persons.findIndex(
            (person) => person.id == personId
          );
          this.persons.splice(index, 1);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showPerson(personId) {
    this.router.navigate(["/contact/" + personId]);
  }
}

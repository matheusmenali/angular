import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"],
})
export class ContactListComponent implements OnInit {
  public contactForm: FormGroup;
  public contactFormFields = {
    id: [""],
    contact_name: ["", Validators.required],
    contact_person_id: [""],
    contact_type: [""],
    person: [""],
  };

  public contacts = [];
  public flagUpdateControl = false;
  public persons = [];
  public selectedValue = {};
  public shouldDisplayForm = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject("personService") private personService,
    @Inject("contactService") private contactService
  ) {
    this.contactForm = this.fb.group(this.contactFormFields);

    // carregando os possiveis contatos
    this.personService.getPersons().subscribe((result) => {
      this.persons = result;

      //removendo o a perfil em exibição
      const idShowingPerson = parseInt(this.route.snapshot.params.id_person);
      const index = this.persons.findIndex(
        (person) => person.id == idShowingPerson
      );
      this.persons.splice(index, 1);
    });

    // carregando contatos
    this.contactService
      .getContacts(parseInt(this.route.snapshot.params.id_person))
      .subscribe((result) => {
        this.contacts = result;
      });
  }

  ngOnInit() {}

  onSubmit() {
    // setando o id do contato
    this.contactForm.value.person = parseInt(
      this.route.snapshot.params.id_person
    );
    this.contactService.insertContact(this.contactForm.value).subscribe(
      (result) => {
        // quando é um update
        if (this.flagUpdateControl) {
          const index = this.contacts.findIndex(
            (contact) => contact.id == result.id
          );
          this.contacts[index] = result;
          this.flagUpdateControl = false;
        } else {
          //quando é um insert
          this.contacts.push(result);
        }
        this.showForm();
        this.contactForm.reset();
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
    const index = this.contacts.findIndex((contact) => contact.id == personId);
    this.contactForm
      .get("contact_name")
      .patchValue(this.contacts[index].contact_name);
    this.contactForm.get("id").patchValue(this.contacts[index].id);
    this.showForm();
    this.flagUpdateControl = true;
  }

  deletePerson(personId) {
    this.contactService.deleteContact(personId).subscribe(
      (result) => {
        if (result) {
          const index = this.contacts.findIndex(
            (contact) => contact.id == personId
          );
          this.contacts.splice(index, 1);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

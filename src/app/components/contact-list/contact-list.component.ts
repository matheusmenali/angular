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
    // nao terminado
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
}

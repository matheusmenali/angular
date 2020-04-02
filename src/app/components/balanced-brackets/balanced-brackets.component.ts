import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-balanced-brackets",
  templateUrl: "./balanced-brackets.component.html",
  styleUrls: ["./balanced-brackets.component.css"],
})
export class BalancedBracketsComponent implements OnInit {
  private flag = true;
  private stack = [];

  public balancedForm: FormGroup;
  public resetControl = false;
  public stackCount = 0;

  constructor(private fb: FormBuilder) {
    this.balancedForm = this.fb.group({
      expression: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.balancedForm.get("expression").valueChanges.subscribe((val) => {
      // flag de controle do patchValu
      if (this.flag) {
        //separando o ultimo caractere
        const char = val.split("")[val.length - 1];

        if (this.validateChar(char)) {
          this.validateExpression(char);
        } else {
          const expression = this.balancedForm.get("expression").value;
          this.flag = false;
          this.balancedForm
            .get("expression")
            .patchValue(expression.substring(expression.length - 1, 0));
        }
      }
      this.flag = true;
    });
  }

  validateExpression(lastChar) {
    if (this.stack.length == 0) {
      this.stack.push(lastChar);
      this.stackCount++;
    } else {
      switch (lastChar) {
        case "(":
          this.stack.push("(");
          this.stackCount++;
          break;

        case ")":
          if (this.stack[this.stack.length - 1] == "(") {
            this.stack.pop();
            this.stackCount--;
          }
          break;

        case "[":
          this.stack.push("[");
          this.stackCount++;
          break;

        case "]":
          if (this.stack[this.stack.length - 1] == "[") {
            this.stack.pop();
            this.stackCount--;
          }
          break;

        case "{":
          this.stack.push("{");
          this.stackCount++;
          break;

        case "}":
          if (this.stack[this.stack.length - 1] == "{") {
            this.stack.pop();
            this.stackCount--;
          }
          break;
      }
    }
  }

  validateChar(char) {
    const potential = "(){}[]";
    const valid = potential.indexOf(char) > -1;
    return valid;
  }

  erase(a) {
    if (a.key == "Backspace") {
      this.resetControl = true;
      this.stackCount = 1;
    }
  }

  resetVerification() {
    this.resetControl = false;
    this.stackCount = 0;
    this.stack = [];
    this.flag = false;
    this.balancedForm.get("expression").reset();
  }
}

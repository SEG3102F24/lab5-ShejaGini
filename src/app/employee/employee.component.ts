import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { EmployeeService } from "../service/employee.service";
import { Router, RouterLink } from "@angular/router";
import { Employee } from "../model/employee";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
})
export class EmployeeComponent {
  private builder: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);
  private router: Router = inject(Router);
  employeeForm = this.builder.group({
    name: ["", Validators.required],
    dateOfBirth: ["", Validators.required],
    city: ["", Validators.required],
    salary: [0, Validators.required],
    gender: ["", Validators.pattern("^[MFX]$")],
    email: ["", Validators.email],
  });

  get name(): AbstractControl<string> {
    return <AbstractControl<string>>this.employeeForm.get("name");
  }
  get dateOfBirth(): AbstractControl<string> {
    return <AbstractControl<string>>this.employeeForm.get("dateOfBirth");
  }
  get city(): AbstractControl<string> {
    return <AbstractControl>this.employeeForm.get("city");
  }
  get salary(): AbstractControl<number> {
    return <AbstractControl<number>>this.employeeForm.get("salary");
  }
  get gender(): AbstractControl<string> {
    return <AbstractControl<string>>this.employeeForm.get("gender");
  }
  get email(): AbstractControl<string> {
    return <AbstractControl<string>>this.employeeForm.get("email");
  }

  onSubmit() {
    console.log("Submit button clicked");
    console.log("Form values:", this.employeeForm.value);

    if (this.employeeForm.valid) {
      const employee: Employee = new Employee(
        this.name.value,
        new Date(this.dateOfBirth.value),
        this.city.value,
        this.salary.value,
        this.gender.value,
        this.email.value,
      );

      console.log("Employee object:", employee);

      this.employeeService.addEmployee(employee).subscribe({
        next: () => {
          console.log("Employee added successfully");
          this.employeeForm.reset();
          this.router.navigate(["/employees"]).then(() => {
            console.log("Navigated to employees list");
          });
        },
        error: (error: unknown) => {
          console.error("Error adding employee: ", error);
          // You might want to show an error message to the user here
        },
      });
    } else {
      console.log("Form is invalid");
      // You might want to show validation errors to the user here
    }
  }
}

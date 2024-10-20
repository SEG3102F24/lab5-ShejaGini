import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../service/employee.service";
import { RouterLink } from "@angular/router";
import { NgFor, AsyncPipe, DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { Employee } from "../model/employee";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"],
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe, DatePipe],
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {
    this.employees$ = this.employeeService.getEmployees();
  }

  ngOnInit() {}
}

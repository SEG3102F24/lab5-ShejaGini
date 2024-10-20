import { Injectable, Inject } from "@angular/core";
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { Observable, from, map } from "rxjs";
import { Employee } from "../model/employee";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(@Inject("FIRESTORE_DB") private firestore: Firestore) {}

  addEmployee(employee: Employee): Observable<void> {
    const employeesRef = collection(this.firestore, "employees");
    return from(
      addDoc(employeesRef, {
        name: employee.name,
        dateOfBirth: employee.dateOfBirth.toISOString(),
        city: employee.city,
        salary: employee.salary,
        gender: employee.gender,
        email: employee.email,
      }),
    ).pipe(map(() => undefined));
  }

  getEmployees(): Observable<Employee[]> {
    const employeesRef = collection(this.firestore, "employees");
    return from(getDocs(employeesRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return new Employee(
            data["name"] as string,
            new Date(data["dateOfBirth"] as string),
            data["city"] as string,
            data["salary"] as number,
            data["gender"] as string,
            data["email"] as string,
            doc.id,
          );
        }),
      ),
    );
  }
}

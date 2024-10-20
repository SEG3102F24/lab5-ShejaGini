import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from "./environments/environment";

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), { provide: "FIRESTORE_DB", useValue: db }],
};

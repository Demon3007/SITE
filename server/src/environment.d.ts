// import { Department } from "./models/Department.ts";

// interface MyLocals<T> {
//   departmentList?: Department[];
//   recipientDepartment?: Department;
//   donorDepartment?: Department;
//   APIKey?: string;
//   reqURL?: string;
//   data?: T;
// }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_HOST?: string;
      SERVER_PORT?: string;
      DB_NAME?: string;
      DB_HOST?: string;
      DB_PORT?: number;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_STORAGE?: string;
    }
  }
  namespace Express {
    interface Locals {
      userId: string;
    }
  }
}

declare module "jsonwebtoken" {
  interface JwtPayload {
    id: string;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

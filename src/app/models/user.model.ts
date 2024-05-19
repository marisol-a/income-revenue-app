export class User {
  constructor(public uid: string, public name: string, public email: string) {}

  static fromFirestore({ email, name, uid }) {
    return new User(uid, name, email);
  }
}

// export interface User {
//   uid: string;
//   name: string;
//   email: string;
// }

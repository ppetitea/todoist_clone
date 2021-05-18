import { db } from "../../../services/firebase";

interface IUserProfil {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  photoUrl?: string | null;
}
const addUserInFirestore = (userProfil: IUserProfil) => {
  db.collection("users")
    .doc(userProfil.id)
    .set({
      name: userProfil.name,
      email: userProfil.email,
      phone: userProfil.phone,
      photoUrl: userProfil.photoUrl,
    })
    .catch((error) => {
      console.log("Something went wrong with added user to firestore: ", error);
    });
};

export { addUserInFirestore };
export default addUserInFirestore;

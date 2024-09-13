import { db } from './firebase'; // Import the Firestore instance
import { collection , getDocs } from 'firebase/firestore'; // Import necessary Firestore functions

export async function getArtistInfo() {
  const data = {};

  try {
    const querySnapshot = await getDocs(collection(db, 'artists'));
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
  } catch (error) {
    console.error("Error fetching artist data:", error);
  }

  return data;
}

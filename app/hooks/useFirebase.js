import {useState, useEffect} from "react"
import {collection, getDocs} from "firebase/firestore"
import {db} from "../../config/firebase"

export const useFirebaseData = (collectionName) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from Firebase...") // Debug log
        const querySnapshot = await getDocs(collection(db, collectionName))
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log("Data received:", documents) // Debug log
        setData(documents)
        setLoading(false)
      } catch (error) {
        console.error("Firebase Error:", error) // Changed to console.error
        setError(error.message || "Error fetching data") // Store the message only
        setLoading(false)
      }
    }

    fetchData()
  }, [collectionName])

  return {data, loading, error}
}

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
        const querySnapshot = await getDocs(collection(db, collectionName))
        if (!querySnapshot) {
          throw new Error("No data returned from Firebase")
        }

        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(documents)
        setLoading(false)
      } catch (error) {
        setError(`Error fetching ${collectionName}: ${error.message}`)
        setLoading(false)
      }
    }

    fetchData()
  }, [collectionName])

  return {data, loading, error}
}

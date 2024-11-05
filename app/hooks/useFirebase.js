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
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(documents)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data", error)
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [collectionName])

  return {data, loading, error}
}

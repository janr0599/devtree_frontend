import { Navigate, useParams} from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getUserByHandle } from "../api/DevTreeApi"
import type { User } from "../types"

function HandleView() {
  const params = useParams()
  const handle = params.handle!

  // Query user by handle
  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["user", handle],
    queryFn: () => getUserByHandle(handle),
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <Navigate to="/" />
  }

  if(data) {

    return (
      <div>
        <img src={data.image} alt="" />
        <h1>{data.name}</h1>
      </div>
    )
  }
}

export default HandleView
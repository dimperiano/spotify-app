import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const HomePage = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")

  if (!accessToken) {
    redirect("/")
  }

  return <div className="w-full h-full">Hello World</div>
}

export default HomePage

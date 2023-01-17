import { getPosts } from "@/lib/queries"

export default async function handler(req, res) {
  let response = await getPosts();

  if (!response) {
    return res.status(500).json({ message: "An error occurred"})
  }

  return res.status(200).json(response)

}
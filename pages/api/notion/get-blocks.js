import { getBlocks } from "@/lib/queries";

export default async function handler(req, res) {
    const { id } = req.query
    const { results } = await getBlocks(id)

    if (!results) {
    return res.status(500).json({ message: "An error occurred"})
  }

  return res.status(200).json(results)
}
// import supabase from "@/utils/supabaseClient";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // const id = req.query.id;
//   const { id, title, content, category, image } = req.body;
//   const { data, error } = await supabase.from("posts").insert([
//     {
//       id,
//       title,
//       content,
//       category,
//       image,
//       createdAt: new Date().toISOString(),
//     },
//   ]);
//   if (error) {
//     res.status(500).json({ error: error.message });
//   }
//   res.status(200).json(data);
// }

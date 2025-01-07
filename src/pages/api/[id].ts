import supabase from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { notFound } from "next/navigation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  switch (req.method) {
    case "GET":
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        res.status(500).json({ error: error.message });
      }
      if (!data) {
        // res.status(404).json({ error: "Article not found" });
        notFound();
      }
      res.status(200).json(data);
      break;
    case "PUT":
      const { title, content, category } = req.body;
      const { error: updateError } = await supabase
        .from("posts")
        .update({ title, content, category })
        .eq("id", id);

      if (updateError) {
        res.status(500).json({ error: updateError.message });
      }
      res.status(200).json({ message: "更新に成功しました" });
      break;
    case "DELETE":
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);
      if (deleteError) {
        res.status(500).json({ error: deleteError.message });
      }
      res.status(200).json({ message: "削除に成功しました" });
      break;
  }
}

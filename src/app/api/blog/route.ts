import supabase from "@/utils/supabaseClient";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: Request, res: NextApiResponse) {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  } else {
    return NextResponse.json(data, { status: 200 });
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  const { id, title, content, category, image } = await req.json();

  const { data, error } = await supabase.from("posts").insert([
    {
      id,
      title,
      content,
      category,
      image,
      createdAt: new Date().toISOString(),
    },
  ]);

  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  } else {
    return NextResponse.json(data, { status: 201 });
  }
}

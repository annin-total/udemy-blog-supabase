import supabase from "@/utils/supabaseClient";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: Request, res: NextApiResponse) {
  const id = req.url.split("/blog/")[1];

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }
  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  } else {
    return NextResponse.json(data, { status: 200 });
  }
}

export async function PUT(req: Request, res: NextApiResponse) {
  const id = req.url.split("/blog/")[1];
  const { title, content, category } = await req.json();
  const { error: updateError } = await supabase
    .from("posts")
    .update({ title, content, category })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json(updateError.message, { status: 500 });
  } else {
    return NextResponse.json(
      { message: "更新に成功しました" },
      { status: 200 }
    );
  }
}

export async function DELETE(req: Request, res: NextApiResponse) {
  const id = req.url.split("/blog/")[1];

  const { error: deleteError } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json(deleteError.message, { status: 500 });
  } else {
    return NextResponse.json(
      { message: "削除に成功しました" },
      { status: 200 }
    );
  }
}

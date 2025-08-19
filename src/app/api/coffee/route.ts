import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePatch = path.join(process.cwd(),"src", "data", "coffee.json")

export async function GET() {
  const data = fs.readFileSync(filePatch, "utf-8");
  const coffees = JSON.parse(data);
  return NextResponse.json(coffees);
}

export async function POST(req: Request){
  const newCoffee = await req.json();
  const data = fs.readFileSync(filePatch, "utf-8");
  const coffees = JSON.parse(data);

  const newId = coffees.length > 0 ? coffees[coffees.length - 1].id + 1 : 1;
  const coffeeWithId = { id: newId, ...newCoffee };

  coffees.push(coffeeWithId);
  fs.writeFileSync(filePatch, JSON.stringify(coffees, null, 2));

  return NextResponse.json(coffeeWithId, {status: 201});
}
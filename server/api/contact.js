import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async (event) => {

  const dataPath = resolve("mocdata.json");
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));


  const body = await readBody(event);


  const newContact = {
    id: data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1, 
    fullname: body.fullName,
    age: body.age,
  };


  data.unshift(newContact);


  writeFileSync(dataPath, JSON.stringify(data, null, 2));

  return { success: true };
});

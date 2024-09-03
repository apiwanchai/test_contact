import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id; 


  const dataPath = resolve("mocdata.json");
  let data = JSON.parse(readFileSync(dataPath, "utf-8"));


  const itemExists = data.some(item => item.id === parseInt(id));
  if (!itemExists) {
    throw createError({
      statusCode: 404,
      statusMessage: `Item with id ${id} not found`,
    });
  }


  data = data.filter(item => item.id !== parseInt(id));


  writeFileSync(dataPath, JSON.stringify(data, null, 2));

  return { success: true };
});

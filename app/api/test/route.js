import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";

const nlp = winkNLP(model);

export async function POST(request) {
  const body = await request.json();
  const text = body.text || "";

  const doc = nlp.readDoc(text);
  const entities = doc.entities().out("json");

  return Response.json({ entities });
}

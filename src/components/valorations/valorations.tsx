import { sql } from "@vercel/postgres";

export default async function Valorations({
  params
} : {
  params: { approve: boolean }
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from valorations where approve =${params.approve}`;
  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.name} - {row.quantity}
        </div>
      ))}
    </div>
  );
}

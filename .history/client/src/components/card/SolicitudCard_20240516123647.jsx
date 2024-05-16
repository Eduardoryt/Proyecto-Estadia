import React from "react";
import { useSoli } from "../../context/SolicitudContext";
import { Button, ButtonLink, Card } from "../ui";

export function SolicitudCard({ soli }) {
  const { deleteSoli } = useSoli();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{soli.folio}</h1>
        <h4 className="text-2xl font-bold">{soli.estado}</h4>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteSoli(soli._id)}>Delete</Button>
          <ButtonLink to={`/soliPager/${soli._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{soli.description}</p>
    
      <p>
        {soli.date &&
          new Date(soli.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}

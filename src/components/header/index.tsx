import { useEffect, useState } from "react";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import style from "./style.module.scss";

export default function Header() {
  const currentDate = format(new Date(), "EEEEEE, d MMMM", { locale: ptBR });

  const [salutation, setSalutation] = useState("");

  const hora = Number(format(new Date(), "HH", { locale: ptBR }));

  useEffect(() => {
    if (hora >= 0 && hora < 12) {
      setSalutation("Bom dia");
    } else if (hora >= 12 && hora < 18) {
      setSalutation("Bom tarde");
    } else if (hora >= 18 && hora < 24) {
      setSalutation("Bom noite");
    }
  }, [hora]);

  return (
    <header className={style.container}>
      <img src="/logo.svg" alt="Podcastr" />

      <p>{salutation}, o melhor para você sempre ouvir!</p>

      <span>{currentDate}</span>
    </header>
  );
}

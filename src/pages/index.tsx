import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import ptBR, { format, parseISO } from "date-fns";
import { PlayerContext } from "../contexts/playerContext";
import { api } from "../services/api";
import ConvertDuration from "../utils/convertDuration";
import style from "./home.module.scss";

type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  members: string,
  publishedAt: string,
  durationSeconds: number,
  durationHours: string,
  url: string,
}

type HomeProps = { // possui a mesma funcionalidade do interface
  recentEpisode: Episode[];
  oldEpisode: Episode[];
}

export default function Home({ recentEpisode, oldEpisode }: HomeProps) {
  const { Play } = useContext(PlayerContext);

  return (
    <div className={style.container}>
      <section className={style.recentEpisode}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {recentEpisode.map((episode) => (
            <li key={episode.id}>
              {/* <Image
                width={192}
                height={192}
                objectFit="cover"
                src={episode.thumbnail}
                alt={episode.title}
              /> */}

              <div className={style.episodeDetail}>
                <Link href={`/episode/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationHours}</span>
              </div>

              <button type="button" onClick={() => Play(episode)}>
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={style.oldEpisode}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <th />
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th />
          </thead>

          <tbody>
            {oldEpisode.map((episode) => (
              <tr key={episode.id}>
                <td style={{ width: 72 }}>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                </td>
                <td>
                  <Link href={`/episode/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100 }}>{episode.publishedAt}</td>
                <td>{episode.durationHours}</td>
                <td>
                  <button type="button">
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const response = await fetch("http://localhost:3333/episodes?_limit=12&_sort=published_at&_orden=desc");

  const { data } = await api.get("episodes", {
    params: {
      _limit: 12, // vai carregar esta quantidade de itens por requisição
      _sort: "published_at", // vai classificar por esta coluna
      _order: "desc", // no formato decrescente
    },
  });

  // eslint-disable-next-line arrow-body-style
  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", { locale: ptBR }),
      durationSeconds: Number(episode.file.duration),
      durationHours: ConvertDuration(Number(episode.file.duration)),
      url: episode.file.url,
    };
  });

  // vai extrair os dois primeiros itens
  const recentEpisode = episodes.slice(0, 2);

  // vai pegar o terceiro item ate o último
  const oldEpisode = episodes.slice(2, episodes.length);

  return {
    props: { recentEpisode, oldEpisode }, // envia as informações para nossa aplicação
    revalidate: 60 * 60 * 8, // vai executar novamente depois de 8 horas
  };
};

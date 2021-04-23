import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import ptBR, { format, parseISO } from "date-fns";
import { api } from "../../services/api";
import ConvertDuration from "../../utils/convertDuration";
import style from "./episode.module.scss";

type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  members: string,
  publishedAt: string,
  durationSeconds: number,
  durationHours: string,
  description: string
  url: string,
}

type HomeProps = { // possui a mesma funcionalidade do interface
  episode: Episode;
}

export default function Episode({ episode }: HomeProps) {
  return (
    <div className={style.episode}>
      <div className={style.thumbnailContainer}>
        <button type="button">
          <img src="/arrow-left.svg" alt="Voltar" />
        </button>

        <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" />

        <button type="button">
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationHours}</span>
      </header>

      <div
        className={style.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), "d MMM yy", { locale: ptBR }),
    durationSeconds: Number(data.file.duration),
    durationHours: ConvertDuration(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: { episode },
    revalidate: 60 * 60 * 24,
  };
};

import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { BiChevronLeft, BiPlay } from "react-icons/bi";
import ptBR, { format, parseISO } from "date-fns";
import { UsePlayer } from "../../contexts/playerContext";
import { UseTheme } from "../../contexts/themeContext";
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
  const { isThemeDark } = UseTheme();

  const { Play } = UsePlayer();

  return (
    <div id={isThemeDark && style.dark} className={style.episode}>
      <Head><title>{episode.title}</title></Head>
      <div className={style.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <BiChevronLeft className={style.iconReact} />
          </button>
        </Link>

        <Image width={1000} height={300} src={episode.thumbnail} objectFit="cover" />

        <button type="button" onClick={() => Play(episode)}>
          <BiPlay className={style.iconReact} />
        </button>
      </div>

      <header>
        <h1 id={isThemeDark && style.dark}>{episode.title}</h1>
        <span id={isThemeDark && style.dark}>{episode.members}</span>
        <span id={isThemeDark && style.dark}>{episode.publishedAt}</span>
        <span id={isThemeDark && style.dark}>{episode.durationHours}</span>
      </header>

      <div
        id={isThemeDark && style.dark}
        className={style.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 2,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const paths = data.map((episode) => ({ params: { slug: episode.id } }));

  return {
    paths, // paginas din??micas a gerar no momento da build
    fallback: "blocking", // gerar as p??ginas faltante na requisi????o no lado do next
  };
};

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

import { RecommendationInfo } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Shuffle,
  ExternalLink as ExternalLinkIcon,
  Tv,
  Music,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";
import Heading from "@/app/UI/global-components/heading";
import CharacterCarousel from "./character-carousel";

const RecommendationContent = ({
  recommendationInfo,
}: {
  recommendationInfo: RecommendationInfo;
}) => {
  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[250px_1fr] lg:gap-5">
      {/* Sticky Sidebar */}
      <aside className="lg:sticky lg:top-4 lg:self-start space-y-3">
        <div className="rounded-xl overflow-hidden shadow-lg w-1/2 sm:w-full max-w-[400px] mx-auto lg:mx-0">
          {recommendationInfo.images?.jpg?.large_image_url && (
            <Image
              src={recommendationInfo.images.jpg.large_image_url}
              alt={recommendationInfo.title}
              width={400}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-2 text-sm w-full max-w-[400px] mx-auto lg:mx-0">
          {recommendationInfo.genres &&
            recommendationInfo.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 w-full sm:justify-start justify-center">
                {recommendationInfo.genres.map((genre) => (
                  <Badge
                    key={genre.mal_id}
                    variant="outline"
                    className="text-xs px-2 py-1"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}
          {recommendationInfo.type && (
            <div className="flex justify-between">
              <span className="font-semibold">Type</span>
              <span>{recommendationInfo.type}</span>
            </div>
          )}
          {recommendationInfo.status && (
            <div className="flex justify-between">
              <span className="font-semibold">Status</span>
              <span>{recommendationInfo.status}</span>
            </div>
          )}
          {recommendationInfo.episodes !== undefined &&
            recommendationInfo.episodes !== null && (
              <div className="flex justify-between">
                <span className="font-semibold">Episodes</span>
                <span>{recommendationInfo.episodes}</span>
              </div>
            )}
          {recommendationInfo.duration && (
            <div className="flex justify-between">
              <span className="font-semibold">Duration</span>
              <span>{recommendationInfo.duration}</span>
            </div>
          )}
          {recommendationInfo.rating && (
            <div className="flex justify-between">
              <span className="font-semibold">Rating</span>
              <span>{recommendationInfo.rating}</span>
            </div>
          )}
          {recommendationInfo.score && (
            <div className="flex justify-between">
              <span className="font-semibold">Score</span>
              <span>{recommendationInfo.score}</span>
            </div>
          )}
          {recommendationInfo.rank && (
            <div className="flex justify-between">
              <span className="font-semibold">Rank</span>
              <span>#{recommendationInfo.rank}</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <section className="space-y-8">
        {/* Title Section */}
        <div className="space-y-1">
          <Heading as="h1" className="text-center lg:text-left">
            {recommendationInfo.title}
          </Heading>
          {recommendationInfo.titles &&
            recommendationInfo.titles.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-2">
                {recommendationInfo.titles.map((titleObj, index) => {
                  if (
                    titleObj?.type?.toLowerCase() === "default" ||
                    recommendationInfo?.title === titleObj?.title
                  )
                    return null;
                  return (
                    <p
                      key={`${titleObj.title}-${index}`}
                      className="opacity-70 hover:opacity-90 border-b border-dashed border-transparent hover:border-black text-sm"
                    >
                      {titleObj.title}
                    </p>
                  );
                })}
              </div>
            )}
        </div>

        {/* Synopsis */}
        {recommendationInfo.synopsis && (
          <div className="prose dark:prose-invert max-w-none text-justify">
            <Heading as="h2" className="text-xl mb-2">
              Synopsis
            </Heading>
            <p>{recommendationInfo.synopsis}</p>
          </div>
        )}

        {recommendationInfo?.characters &&
          recommendationInfo.characters.length > 0 && (
            <CharacterCarousel characters={recommendationInfo?.characters} />
          )}

        {/* Trailer */}
        {recommendationInfo.trailer?.youtube_id && (
          <div className="space-y-3">
            <Heading className="text-xl">Trailer</Heading>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${recommendationInfo.trailer.youtube_id}`}
                title="Trailer"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Theme Music */}
        {recommendationInfo.theme &&
          (recommendationInfo.theme.openings?.length > 0 ||
            recommendationInfo.theme.endings?.length > 0) && (
            <div className="space-y-3">
              <Heading as="h2" className="text-xl flex items-center gap-2">
                <Music className="w-5 h-5" /> Theme Music
              </Heading>
              <div className="space-y-3">
                {recommendationInfo.theme.openings?.length > 0 && (
                  <div>
                    <Heading as="h3" className="text-base">
                      Openings:
                    </Heading>
                    <ul className="list-disc list-inside text-sm sm:text-base">
                      {recommendationInfo.theme.openings.map((opening, idx) => (
                        <li key={idx}>{opening}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {recommendationInfo.theme.endings?.length > 0 && (
                  <div>
                    <Heading as="h3" className="text-base">
                      Endings:
                    </Heading>
                    <ul className="list-disc list-inside text-sm sm:text-base">
                      {recommendationInfo.theme.endings.map((ending, idx) => (
                        <li key={idx}>{ending}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Relations */}
        {recommendationInfo.relations &&
          recommendationInfo.relations.length > 0 && (
            <div className="space-y-2">
              <Heading as="h2" className="text-xl flex items-center gap-2">
                <Shuffle className="w-5 h-5" /> Related
              </Heading>
              <ul className="space-y-1">
                {recommendationInfo.relations.map((relation, idx) => (
                  <li key={idx} className="text-sm">
                    <span className="font-semibold">{relation.relation}:</span>{" "}
                    {relation.entry.map((entry, eIdx) => (
                      <a
                        key={eIdx}
                        href={entry.url}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.name}
                        {eIdx < relation.entry.length - 1 && ", "}
                      </a>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* External Links */}
        {recommendationInfo.external &&
          recommendationInfo.external.length > 0 && (
            <div className="space-y-2">
              <Heading as="h2" className="text-xl flex items-center gap-2">
                <LinkIcon className="w-5 h-5" /> External Links
              </Heading>
              <ul className="space-y-1">
                {recommendationInfo.external.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Streaming Platforms */}
        {recommendationInfo.streaming &&
          recommendationInfo.streaming.length > 0 && (
            <div className="space-y-2">
              <Heading as="h2" className="text-xl flex items-center gap-2">
                <Tv className="w-5 h-5" /> Streaming Platforms
              </Heading>
              <ul className="space-y-1">
                {recommendationInfo.streaming.map((platform, idx) => (
                  <li key={idx}>
                    <a
                      href={platform.url}
                      className="text-primary hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {platform.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </section>
    </div>
  );
};

export default RecommendationContent;

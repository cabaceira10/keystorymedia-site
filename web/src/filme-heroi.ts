export interface Filme {
  src720: string;
  src1080?: string;
  poster: string;
  vtt?: string;
  label: string;
  seconds: number;
  /** Seconds to skip at the start of the file (a black or unrelated lead-in). Every restart goes here, not to 0. */
  inicio?: number;
  /** The captions are burned into the picture: no caption bar over the frame, only the one under it on phones. */
  legendasQueimadas?: boolean;
}

// The hero film: a real Keystory property film, encoded from the 4K original.
export const HERO_FILM: Filme = {
  src720: "campaign/film/filme-foz-do-arelho-720.mp4",
  src1080: "campaign/film/filme-foz-do-arelho-1080.mp4",
  poster: "campaign/film/filme-foz-do-arelho.webp",
  label: "Casa T3 na Foz do Arelho, filmada pela Keystory para a Dream Maker Imobiliária",
  seconds: 91.5,
  legendasQueimadas: true,
};

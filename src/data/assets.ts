export type ImageAsset = {
  id: string;
  src: string;
  width: number;
  height: number;
  ratio: number;
  altKey: string;
};

export const imageAssets = {
  hero: {
    id: 'hero',
    src: '/1.png',
    width: 573,
    height: 768,
    ratio: 0.746,
    altKey: 'visuals.hero',
  },
  banner: {
    id: 'banner',
    src: '/2.png',
    width: 1024,
    height: 405,
    ratio: 2.528,
    altKey: 'visuals.banner',
  },
  gallery: [
    {
      id: 'g3',
      src: '/3.png',
      width: 576,
      height: 768,
      ratio: 0.75,
      altKey: 'visuals.gallery3',
    },
    {
      id: 'g4',
      src: '/4.png',
      width: 576,
      height: 768,
      ratio: 0.75,
      altKey: 'visuals.gallery4',
    },
    {
      id: 'g5',
      src: '/5.png',
      width: 576,
      height: 768,
      ratio: 0.75,
      altKey: 'visuals.gallery5',
    },
    {
      id: 'g6',
      src: '/6.png',
      width: 576,
      height: 768,
      ratio: 0.75,
      altKey: 'visuals.gallery6',
    },
  ],
  avatar: {
    id: 'avatar',
    src: '/avata.webp',
    width: 400,
    height: 400,
    ratio: 1,
    altKey: 'visuals.avatar',
  },
} satisfies {
  hero: ImageAsset;
  banner: ImageAsset;
  gallery: ImageAsset[];
  avatar: ImageAsset;
};

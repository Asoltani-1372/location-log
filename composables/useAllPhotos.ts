export interface PoolPhoto {
  filename: string
  url: string
}

// Resolved by Vite at build time, not read from disk at request time — every
// photo you drag into assets/images/ shows up here after a rebuild/dev-reload.
const imageModules = import.meta.glob('/assets/images/*.{png,jpg,jpeg,gif,webp,PNG,JPG,JPEG,GIF,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const allPhotos: PoolPhoto[] = Object.entries(imageModules)
  .map(([path, url]) => ({ filename: path.split('/').pop()!, url }))
  .sort((a, b) => a.filename.localeCompare(b.filename))

export default function useAllPhotos() {
  return allPhotos
}

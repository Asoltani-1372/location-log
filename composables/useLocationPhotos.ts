import { locationPhotos } from '~/lib/location-photos'

export default function useLocationPhotos(slug: MaybeRefOrGetter<string | undefined>) {
  const allPhotos = useAllPhotos()
  return computed(() => {
    const filenames = locationPhotos[toValue(slug) || ''] ?? []
    const byFilename = new Map(allPhotos.map(photo => [photo.filename, photo.url]))
    return filenames.map(filename => byFilename.get(filename)).filter((url): url is string => !!url)
  })
}

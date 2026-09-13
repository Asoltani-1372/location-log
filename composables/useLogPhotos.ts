import { logPhotos } from '~/lib/log-photos'

export default function useLogPhotos(logId: MaybeRefOrGetter<number | undefined>) {
  const allPhotos = useAllPhotos()
  return computed(() => {
    const id = toValue(logId)
    const filenames = (id !== undefined && logPhotos[id]) || []
    const byFilename = new Map(allPhotos.map(photo => [photo.filename, photo.url]))
    return filenames.map(filename => byFilename.get(filename)).filter((url): url is string => !!url)
  })
}

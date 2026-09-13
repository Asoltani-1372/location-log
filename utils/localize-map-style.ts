import type { StyleSpecification } from 'maplibre-gl'

// OpenFreeMap's "liberty" style renders every label as "Latin name\nlocal-script name"
// whenever a name:nonlatin tag exists. We only want the Latin/English half.
//
// Populated places (source-layer "place": country/city/town/village) get no
// fallback to the local-script name — OpenMapTiles always ships a Latin name
// for these, so this guarantees cities are never shown in the local script.
// Roads/POIs/water features fall back to the local name when no Latin one
// exists, since those are missing a Latin tag far more often in OSM data and
// a local-script label beats no label at all.
const PLACE_TEXT_FIELD = ['coalesce', ['get', 'name:latin'], ['get', 'name_en'], ['get', 'name:en']]
const FALLBACK_TEXT_FIELD = [...PLACE_TEXT_FIELD, ['get', 'name']]

export default function localizeMapStyle(style: StyleSpecification): StyleSpecification {
  const cloned = JSON.parse(JSON.stringify(style)) as StyleSpecification
  for (const layer of cloned.layers) {
    const layout = (layer as { layout?: Record<string, unknown> }).layout
    const textField = layout?.['text-field']
    if (textField && JSON.stringify(textField).includes('name:nonlatin')) {
      layout['text-field'] = (layer as { 'source-layer'?: string })['source-layer'] === 'place'
        ? PLACE_TEXT_FIELD
        : FALLBACK_TEXT_FIELD
    }
  }
  return cloned
}

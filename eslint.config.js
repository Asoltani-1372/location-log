import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'assets/images/**',
    'lib/db/migrations/*.sql',
  ],
})

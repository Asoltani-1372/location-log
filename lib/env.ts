import z from 'zod'
import tryParseEnv from './try-parse-env'

const envSchema = z.object({
  NODE_ENV: z.string(),
})
tryParseEnv(envSchema)
export type EnvSchema = z.infer<typeof envSchema>
//  eslint-disable-next-line node/prefer-global/process
export default envSchema.parse(process.env)

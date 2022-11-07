import { components, paths } from '@blockfrost/openapi';

// Health responses don't have standalone components in openapi package.
// We pick the types manually and add it to the exported OpenApiResponseTypes
export type Health = paths['/health']['get']['responses']['200']['content']['application/json'];
export type HealthClock =
  paths['/health/clock']['get']['responses']['200']['content']['application/json'];

export type OpenApiResponseTypes = components['schemas'] & {
  health_content: Health;
  health_clock_content: HealthClock;
};

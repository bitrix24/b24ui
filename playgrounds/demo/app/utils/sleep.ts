/**
 * Pause on xxx milliseconds
 *
 * @return {Promise<void>}
 * @constructor
 */
export async function sleepAction(timeout: number = 1000): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, timeout))
}

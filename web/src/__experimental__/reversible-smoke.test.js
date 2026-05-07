/**
 * EXPERIMENTAL / easy revert — optional harness only.
 *
 * Full rollback:
 * 1. npm uninstall vitest
 * 2. rm -rf src/__experimental__
 * 3. Drop `test` and `test:watch` scripts from package.json
 * 4. Remove `test:` from vite.config.js
 */

import { describe, expect, it } from 'vitest'

describe('reversible smoke (experimental)', () => {
  it('placeholder — swap for a real assertion when you trial something', () => {
    expect(true).toBe(true)
  })
})

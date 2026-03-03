import { defineComponent } from 'vue'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import AvatarGroup from '../../src/runtime/components/AvatarGroup.vue'
import Avatar from '../../src/runtime/components/Avatar.vue'
import theme from '#build/b24ui/avatar-group'

const AvatarGroupWrapper = defineComponent({
  components: {
    B24Avatar: Avatar,
    B24AvatarGroup: AvatarGroup
  },
  template: `<B24AvatarGroup>
  <B24Avatar src="https://github.com/bitrix24.png" alt="Some user" />
  <B24Avatar src="https://github.com/bitrix24.png" alt="Some user" />
  <B24Avatar src="https://github.com/bitrix24.png" alt="Some user" />
</B24AvatarGroup>`
})

describe('AvatarGroup', () => {
  const sizes = Object.keys(theme.variants.size) as any

  renderEach(AvatarGroupWrapper, [
    // Props
    ['with max', { props: { max: 2 } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with as', { props: { as: 'span' } }],
    ['with class', { props: { class: 'justify-start' } }],
    ['with b24ui', { props: { b24ui: { base: 'rounded-lg' } } }],
    // Slots
    ['with default slot', {}]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(AvatarGroupWrapper, {
      props: {
        max: 2
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})

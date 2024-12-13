import { defineComponent } from 'vue'
import { describe, it, expect } from 'vitest'
import Avatar from '../../src/runtime/components/Avatar.vue'
import AvatarGroup, { type AvatarGroupProps, type AvatarGroupSlots } from '../../src/runtime/components/AvatarGroup.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/avatar-group'

const AvatarGroupWrapper = defineComponent({
  components: {
    B24Avatar: Avatar,
    B24AvatarGroup: AvatarGroup
  },
  template: `<B24AvatarGroup>
  <B24Avatar src="https://github.com/IgorShevchik.png" alt="Igor Shevchik" />
  <B24Avatar src="https://github.com/romhml.png" alt="Romain Hamel" />
  <B24Avatar src="https://github.com/noook.png" alt="Neil Richter" />
</B24AvatarGroup>`
})

describe('AvatarGroup', () => {
  const sizes = Object.keys(theme.variants.size) as any

  it.each([
    // Props
    ['with max', { props: { max: 2 } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with as', { props: { as: 'span' } }],
    ['with class', { props: { class: 'justify-start' } }],
    ['with b24ui', { props: { b24ui: { base: 'rounded-lg' } } }],
    // Slots
    ['with default slot', {}]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: AvatarGroupProps, slots?: Partial<AvatarGroupSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, AvatarGroupWrapper)
    expect(html).toMatchSnapshot()
  })
})

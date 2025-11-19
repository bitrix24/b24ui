/**
 * CheckboxGroup
 * ---
 */
export default {
  slots: {
    root: 'relative',
    fieldset: 'flex gap-x-2',
    legend: [
      'mb-1.5',
      'block',
      'text-(--b24ui-typography-label-color)'
    ].join(' '),
    item: ''
  },
  variants: {
    orientation: {
      horizontal: {
        fieldset: 'flex-row'
      },
      vertical: {
        fieldset: 'flex-col'
      }
    },
    color: {
      'air-primary': { item: 'style-filled' },
      'air-primary-success': { item: 'style-filled-success' },
      'air-primary-alert': { item: 'style-filled-alert' },
      'air-primary-copilot': { item: 'style-filled-copilot' },
      'air-primary-warning': { item: 'style-filled-warning' },
      // @deprecate ////
      'default': { item: 'style-old-default' },
      'danger': { item: 'style-old-danger' },
      'success': { item: 'style-old-success' },
      'warning': { item: 'style-old-warning' },
      'primary': { item: 'style-old-primary' },
      'secondary': { item: 'style-old-secondary' },
      'collab': { item: 'style-old-collab' },
      'ai': { item: 'style-old-ai' }
    },
    variant: {
      list: {},
      card: {
        // @memo style-outline-no-accent
        item: [
          'cursor-pointer',
          'items-start',
          'border border-(--ui-color-design-outline-na-stroke)',
          'bg-(--ui-color-design-outline-na-bg)',
          'has-data-[state=checked]:border-(--b24ui-border-color)'
        ].join(' ')
      },
      table: {
        item: [
          'cursor-pointer',
          'border border-(--ui-color-design-outline-na-stroke)',
          'bg-(--ui-color-design-outline-na-bg)',
          'has-data-[state=checked]:bg-(--b24ui-background)/24',
          'has-data-[state=checked]:border-(--b24ui-border-color)',
          'has-data-[state=checked]:text-(--b24ui-color)',
          'has-data-[state=checked]:z-[1]'
        ].join(' ')
      }
    },
    size: {
      xs: {
        fieldset: 'gap-x-[12px] gap-y-[4px]',
        legend: 'text-(length:--ui-font-size-xs)'
      },
      sm: {
        fieldset: 'gap-x-[14px] gap-y-[6px]',
        legend: 'text-(length:--ui-font-size-xs)'
      },
      md: {
        fieldset: 'gap-x-[16px] gap-y-[8px]',
        legend: 'text-(length:--ui-font-size-sm)'
      },
      lg: {
        fieldset: 'gap-x-[16px] gap-y-[8px]',
        legend: 'text-(length:--ui-font-size-sm)'
      }
    },
    disabled: {
      true: {}
    },
    required: {
      true: {
        label: 'after:content-[\'*\'] after:ms-0.5 after:text-(--ui-color-accent-main-alert)'
      }
    }
  },
  compoundVariants: [
    // region card.size ////
    { size: 'xs', variant: 'card', class: { item: 'px-[13px] py-[7px] rounded-(--ui-border-radius-xs)' } }, // (28 - (1 + 1) - 12) / 2 = 7
    { size: 'sm', variant: 'card', class: { item: 'px-[13px] py-[9px] rounded-(--ui-border-radius-sm)' } }, // (34 - (1 + 1) - 14) / 2 = 9
    { size: 'md', variant: 'card', class: { item: 'px-[17px] py-[10px] rounded-(--ui-border-radius-md)' } }, // (38 - (1 + 1) - 16) / 2 = 10
    { size: 'lg', variant: 'card', class: { item: 'px-[23px] py-[12px] rounded-(--ui-border-radius-md)' } }, // (46 - (1 + 1) - 20) / 2 = 12
    // endregion ////
    // region table.size ////
    { size: 'xs', variant: 'table', class: { item: 'px-[13px] py-[7px]' } },
    { size: 'sm', variant: 'table', class: { item: 'px-[13px] py-[9px]' } },
    { size: 'md', variant: 'table', class: { item: 'px-[17px] py-[10px]' } },
    { size: 'lg', variant: 'table', class: { item: 'px-[23px] py-[12px]' } },
    // endregion ////
    // region orientation/table ////
    {
      size: 'xs',
      variant: 'table',
      orientation: 'horizontal',
      class: {
        item: 'first-of-type:rounded-s-(--ui-border-radius-xs) last-of-type:rounded-e-(--ui-border-radius-xs)',
        fieldset: 'gap-0 -space-x-px'
      }
    },
    {
      size: 'xs',
      variant: 'table',
      orientation: 'vertical',
      class: {
        item: 'first-of-type:rounded-t-(--ui-border-radius-xs) last-of-type:rounded-b-(--ui-border-radius-xs)',
        fieldset: 'gap-0 -space-y-px'
      }
    },
    {
      size: 'sm',
      variant: 'table',
      orientation: 'horizontal',
      class: {
        item: 'first-of-type:rounded-s-(--ui-border-radius-sm) last-of-type:rounded-e-(--ui-border-radius-sm)',
        fieldset: 'gap-0 -space-x-px'
      }
    },
    {
      size: 'sm',
      variant: 'table',
      orientation: 'vertical',
      class: {
        item: 'first-of-type:rounded-t-(--ui-border-radius-sm) last-of-type:rounded-b-(--ui-border-radius-sm)',
        fieldset: 'gap-0 -space-y-px'
      }
    },
    {
      size: ['lg', 'md'],
      variant: 'table',
      orientation: 'horizontal',
      class: {
        item: 'first-of-type:rounded-s-(--ui-border-radius-md) last-of-type:rounded-e-(--ui-border-radius-md)',
        fieldset: 'gap-0 -space-x-px'
      }
    },
    {
      size: ['lg', 'md'],
      variant: 'table',
      orientation: 'vertical',
      class: {
        item: 'first-of-type:rounded-t-(--ui-border-radius-md) last-of-type:rounded-b-(--ui-border-radius-md)',
        fieldset: 'gap-0 -space-y-px'
      }
    },
    // endregion ////
    {
      variant: 'table',
      disabled: true,
      class: {
        item: 'cursor-not-allowed'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    variant: 'list',
    color: 'air-primary'
  }
}

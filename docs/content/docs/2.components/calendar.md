---
title: Calendar
description: A calendar tool for choosing individual dates, multiple dates, or date spans.
category: element
---
<script setup>
import CalendarExample from '/examples/calendar/Calendar.vue';
import CalendarDefaultExample from '/examples/calendar/CalendarDefault.vue';
import LocaleExample from '/examples/calendar/Locale.vue';
import MultipleExample from '/examples/calendar/Multiple.vue';
import RangeExample from '/examples/calendar/Range.vue';
import ColorExample from '/examples/calendar/Color.vue';
import SizeExample from '/examples/calendar/Size.vue';
import DisabledExample from '/examples/calendar/Disabled.vue';
import NumberOfMonthsExample from '/examples/calendar/NumberOfMonths.vue';
import MonthControlsExample from '/examples/calendar/MonthControls.vue';
import YearControlsExample from '/examples/calendar/YearControls.vue';
import FixedWeeksExample from '/examples/calendar/FixedWeeks.vue';
import WithChipEventsExample from '/examples/calendar/WithChipEvents.vue';
import WithDisabledDatesExample from '/examples/calendar/WithDisabledDates.vue';
import WithUnavailableDatesExample from '/examples/calendar/WithUnavailableDates.vue';
import WithMinMaxDatesExample from '/examples/calendar/WithMinMaxDates.vue';
import WithOtherCalendarSystemsExample from '/examples/calendar/WithOtherCalendarSystems.vue';
import WithExternalControlsExample from '/examples/calendar/WithExternalControls.vue';
import AsDatePickerExample from '/examples/calendar/AsDatePicker.vue';
import AsDateRangePickerExample from '/examples/calendar/AsDateRangePicker.vue';
</script>
# Calendar

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui.nuxt.com/components/calendar"
  reka-ui="https://reka-ui.com/docs/components/calendar"
  reka-ui-title="Calendar"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Calendar.vue"
  demo="/components/calendar"
>
  A calendar tool for choosing individual dates, multiple dates, or date spans.
</Description>

::: info
This component relies on the [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html) package which provides objects and functions for representing and manipulating dates and times in a locale-aware manner.
:::

## Usage

Use the `v-model` directive to control the selected date.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CalendarExample />
  </ClientOnly>
</div>

<<< @/examples/calendar/demo/Calendar.vue{3,5,10 vue:line-numbers}

Use the `default-value` prop to set the initial value when you do not need to control its state.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CalendarDefaultExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/Calendar.vue{3,5,10 vue:line-numbers}
:::

### Multiple

Use the `multiple` prop to allow multiple selections.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <MultipleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/Multiple.vue{3,5-9,15,16 vue:line-numbers}
:::

### Locale

Use the `locale` prop to change the locale of the calendar.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LocaleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/Locale.vue{14 vue:line-numbers}
:::

### Range

Use the `range` prop to select a range of dates.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <RangeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/Range.vue{5-8,13 vue:line-numbers}
:::

### Color

Use the `color` prop to change the color of the calendar.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/Color.vue{15 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the calendar.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/Size.vue{15 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the calendar.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/Disabled.vue{13 vue:line-numbers}
:::

### Number Of Months

Use the `numberOfMonths` prop to change the number of months in the calendar.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <NumberOfMonthsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/NumberOfMonths.vue{13 vue:line-numbers}
:::

### Month Controls

Use the `month-controls` prop to show the month controls. Defaults to `true`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <MonthControlsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/MonthControls.vue{13 vue:line-numbers}
:::

### Year Controls

Use the `year-controls` prop to show the year controls. Defaults to `true`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <YearControlsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/YearControls.vue{13 vue:line-numbers}
:::

### Fixed Weeks

Use the `fixed-weeks` prop to display the calendar with fixed weeks.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <FixedWeeksExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/FixedWeeks.vue{13 vue:line-numbers}
:::

## Examples

### With chip events

Use the [Chip](/components/chip) component to add events to specific days.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithChipEventsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/WithChipEvents.vue{vue:line-numbers}
:::

### With disabled dates

Use the `is-date-disabled` prop with a function to mark specific dates as disabled.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithDisabledDatesExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/WithDisabledDates.vue{vue:line-numbers}
:::

### With unavailable dates

Use the `is-date-unavailable` prop with a function to mark specific dates as unavailable.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithUnavailableDatesExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/WithUnavailableDates.vue{vue:line-numbers}
:::

### With min/max dates

Use the `min-value` and `max-value` props to limit the dates.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithMinMaxDatesExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/WithMinMaxDates.vue{vue:line-numbers}
:::

### With other calendar systems

You can use other calenders from `@internationalized/date` to implement a different calendar system. 

::: tip
You can check all the available calendars on [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/Calendar.html#implementations) docs.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithOtherCalendarSystemsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/WithOtherCalendarSystems.vue{30 vue:line-numbers}
:::

### With external controls

You can control the calendar with external controls by manipulating the date passed in the `v-model`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithExternalControlsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/WithExternalControls.vue{5,10,13,17 vue:line-numbers}
:::

### As a DatePicker

Use a [Button](/components/button) and a [Popover](/components/popover) component to create a date picker.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AsDatePickerExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/AsDatePicker.vue{30 vue:line-numbers}
:::

### As a DateRangePicker

Use a [Button](/components/button) and a [Popover](/components/popover) component to create a date range picker.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AsDateRangePickerExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/calendar/demo/AsDateRangePicker.vue{30 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Calendar" />

### Slots

<ComponentSlots component="Calendar" />

### Emits

```ts
/**
 * Emitted events for the Calendar component
 */
interface CalendarEmits {
  update:modelValue: (payload: [date: DateValue | DateRange | DateValue[] | null | undefined]) => void;
  update:placeholder: (payload: [date: DateValue] & [date: DateValue]) => void;
  update:startValue: (payload: [date: DateValue | undefined]) => void;
}
```

export const HotelType = Object.freeze({
  Unvisible: {
    value: 0,
    key: 'Unvisible',
    label: {
      ar: 'ضاهر',
      en: 'Unvisible',
      kr: ''
    },
    classes: 'danger'
  },
  Visible: {
    value: 1,
    key: 'Visible',
    label: {
      ar: 'مخفي',
      en: 'Visible',
      kr: ''
    },
    classes: 'success'
  },
  getByValue (value) {
    return Object.values(this).find((v) => v.value === value) ?? null
  },
  asList () {
    return Object.values(this).filter((v) => typeof v === 'object' && v !== null && Object.hasOwnProperty.call(v, 'value'))
  }
})

export const ServicesType = Object.freeze({
  Hotel: {
    value: 0,
    key: 'Hotel',
    label: {
      ar: 'فندق',
      en: 'Hotel',
      kr: ''
    },
    classes: 'primary'
  },
  Room: {
    value: 1,
    key: 'Room',
    label: {
      ar: 'غرفة',
      en: 'Room',
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

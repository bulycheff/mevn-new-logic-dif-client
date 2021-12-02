function dateFilter(value, format = 'date') {
  // console.log(value)
  const options = {}

  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = '2-digit'
    options.year = '2-digit'
  }

  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    // options.second = '2-digit'
  }

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}

function dateTimeFilter(value) {
  const options = {}
  options.day = '2-digit'
  options.month = '2-digit'
  options.year = '2-digit'
  options.hour = '2-digit'
  options.minute = '2-digit'

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))

}

function WithoutTime(dateTime) {
  let date = new Date(dateTime.getTime())
  date.setHours(0, 0, 0, 0)
  return date
}

function formatPeriod([dateStart, dateEnd]) {
  function formatted(date) {
    let day, month, year, formattedDate
    if (date) {
      day = date.getDate()
      day = parseInt(day) < 10 ? '0' + day : day
      month = date.getMonth() + 1
      month = parseInt(month) < 10 ? '0' + month : month
      year = date.getFullYear()
      formattedDate = `${day}/${month}/${year}`
    } else {
      formattedDate = ``
    }
    return formattedDate
  }

  return `${formatted(dateStart)} — ${formatted(dateEnd)}`
}

export {
  dateTimeFilter,
  dateFilter,
  WithoutTime,
  formatPeriod
}
import { useState } from 'react'

export default function (initialValue) {
  const [value, setValue] = useState(initialValue)

  const onChangeHandler = (e) => setValue(e.target.value)

  return [value, onChangeHandler]
}

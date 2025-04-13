import { useEffect, useState } from "react"

const InputSelect = ({ label, id, grow, option, defvalue, onchange }) => {
  const [value, setValue] = useState(undefined)
  const [opsi, setOpsi] = useState(undefined)

  function checkVariable() {
    function check() {
      if (defvalue != undefined) {
        const op = option?.map((opsi, index) => {
          return (
            <option className="text-black" value={opsi.value} key={index}>
              {opsi.label}
            </option>
          )
        })
        setValue(defvalue)
        setOpsi(op)
      }
    }
    const a = setTimeout(check, 0)
    if (value) clearTimeout(a)
  }

  checkVariable()

  return (
    <div className={"relative flex " + grow}>
      <select
        id={id}
        name={id}
        className="w-full rounded-lg font-baloo p-2 pb-1 border border-secondary focus:outline-none appearance-none peer"
        placeholder=" "
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {opsi}
      </select>
      <label
        htmlFor={id}
        className="absolute text-white -top-2.5 left-1 bg-secondary rounded-lg px-2 text-sm scale-75 duration-200 transform origin-[0] translate-x-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-2 peer-focus:scale-75 peer-focus:-top-2.5 peer-focus:text-white peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:bg-secondary peer-focus:px-2"
      >
        {label}
      </label>
    </div>
  )
}

export default InputSelect

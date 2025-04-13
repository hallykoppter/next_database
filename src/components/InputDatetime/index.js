import { useState } from "react"

const InputDatetime = ({ label, id, grow, defvalue }) => {
  const [date, setDate] = useState()

  function checkVariable() {
    if (defvalue != undefined) {
      console.log(defvalue)
      const newDate = new Date(defvalue).toISOString().slice(0, 16)
      setDate(newDate)
    }
  }

  setTimeout(checkVariable, 0)

  return (
    <div className={"relative flex " + grow}>
      <input
        type={"datetime-local"}
        id={id}
        name={id}
        className="w-full rounded-lg font-baloo p-2 pb-1 border border-secondary focus:outline-none appearance-none peer"
        placeholder=" "
        onChange={(e) => setDate(e.target.value)}
        defaultValue={date}
      />
      <label
        htmlFor={id}
        className="absolute text-white -top-2.5 left-1 bg-secondary rounded-lg px-2 text-sm scale-75 duration-200 transform origin-[0] translate-x-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-2 peer-focus:scale-75 peer-focus:-top-2.5 peer-focus:text-white peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:bg-secondary peer-focus:px-2"
      >
        {label}
      </label>
    </div>
  )
}

export default InputDatetime

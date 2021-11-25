import { useState } from "react";

export const useFormInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  function onChange({ target }) {
    setValue(target.value);
  }

  function clear() {
    setValue("");
  }

  return { value, onChange, clear };
};

import Select from 'react-select'

const SelectCustom = ({
  options,
  placeholder = '',
  value,
  onChange = (selected: any) => { },
}: any) => {
  return (
    <Select
      // isClearable
      isSearchable={false}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
      styles={{
        control: (styles) => ({
          ...styles,
          borderRadius: 10,
          borderColor: '#DFE6F1',
          borderWidth: 1.5,
          outline: 'none',
          width: "180px",
          color: 'blue.neutral',
          fontWeight: '600',
        }),
      }}
    />
  )
}

export default SelectCustom

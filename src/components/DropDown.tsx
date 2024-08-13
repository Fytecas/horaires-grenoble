import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const DropdownComponent = (props: {onChange: (item) => any, data: any[]}) => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(props.data[0].value)
    props.onChange(props.data[0].value)
  }, [])
  return (
    <DropDownPicker
    open={open}
    value={value}
    items={props.data}
    setValue={(v) => {setValue(v()); props.onChange(v())}}
    setOpen={setOpen}

    style={styles.dropdown}
    dropDownContainerStyle={{...styles.dropdown, borderTopWidth: 1}}
    textStyle={{fontSize: 22}}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 2,
    borderRadius: 3, 
    padding: 8,
    paddingTop: 4,
    paddingBottom: 4,
  }
});
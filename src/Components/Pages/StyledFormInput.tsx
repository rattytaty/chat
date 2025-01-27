import React from 'react';
import {Input} from "@chakra-ui/react";
import {InputProps} from "@chakra-ui/input/dist/input";
import {toCapitalLetter} from "../../lib/helpers/toCapitalLetter";


interface FormInputProps extends InputProps {
    generalinfo?: string
}

export const StyledFormInput = (props: FormInputProps) => {
    const placeholder = props.generalinfo && toCapitalLetter(props.generalinfo) + "..."
    return <Input type={props.generalinfo}
                  placeholder={placeholder}
                  id={props.generalinfo}
                  name={props.generalinfo}
                  mb={4}
                  border="none"
                  _focusVisible={{
                      outline: "none",
                  }}
                  _placeholder={{color: "#5A6670"}}
                  color="text"
                  bg="inputBg"
                  {...props}
    />
};

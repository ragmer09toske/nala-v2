import React, { Component } from "react";
import {
    FormControl,
    InputGroup
} from 'react-bootstrap';
import { injectIntl } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from './CommonFormComponent.css';

class CommonFormComponent extends React.Component {

    render() {
        const { input, label, inputClass, meta: { touched, error }, type, componentClass, isAddon, suffixLabel, prefixLabel, children, maxLength } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            isAddon ? <div>
                <InputGroup>
                    {suffixLabel && <InputGroup.Addon className={s.suffix}>{suffixLabel}</InputGroup.Addon>}
                    <FormControl {...input} placeholder={label} type={type} className={inputClass} maxLength={maxLength} />
                    {prefixLabel && <InputGroup.Addon className={s.prefix}>{prefixLabel}</InputGroup.Addon>}
                </InputGroup>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div> :
                children ? <div>
                    <FormControl {...input} placeholder={label} componentClass="select" type={type} className={inputClass} maxLength={maxLength} >
                        {children}
                    </FormControl>
                    {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                </div> :
                    <div>
                        <FormControl  {...input} placeholder={label} componentClass={componentClass} type={type} className={inputClass} maxLength={maxLength} />
                        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                    </div>
        )
    }
}

export default injectIntl(withStyles(s)(CommonFormComponent));
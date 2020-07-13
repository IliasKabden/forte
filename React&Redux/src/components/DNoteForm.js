import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dNote";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    fullName: '',
    mobile: '',
    importance: '',
    organization: ''
}

const DNoteForm = ({ classes, ...props }) => {

        //toast msg.
        const { addToast } = useToasts()

        //validate()
        //validate({fullName:'jenny'})
        const validate = (fieldValues = values) => {
            let temp = {...errors }
            if ('fullName' in fieldValues)
                temp.fullName = fieldValues.fullName ? "" : "This field is required."
            if ('mobile' in fieldValues)
                temp.mobile = fieldValues.mobile ? "" : "This field is required."
            if ('importance' in fieldValues)
                temp.importance = fieldValues.importance ? "" : "This field is required."
            setErrors({
                ...temp
            })

            if (fieldValues == values)
                return Object.values(temp).every(x => x == "")
        }

        const {
            values,
            setValues,
            errors,
            setErrors,
            handleInputChange,
            resetForm
        } = useForm(initialFieldValues, validate, props.setCurrentId)

        //material-ui select
        const inputLabel = React.useRef(null);
        const [labelWidth, setLabelWidth] = React.useState(0);
        React.useEffect(() => {
            setLabelWidth(inputLabel.current.offsetWidth);
        }, []);

        const handleSubmit = e => {
            e.preventDefault()
            if (validate()) {
                const onSuccess = () => {
                    resetForm()
                    addToast("Submitted successfully", { appearance: 'success' })
                }
                if (props.currentId == 0)
                    props.createDNote(values, onSuccess)
                else
                    props.updateDNote(props.currentId, values, onSuccess)
            }
        }

        useEffect(() => {
            if (props.currentId != 0) {
                setValues({
                    ...props.dNoteList.find(x => x.uid == props.currentId)
                })
                setErrors({})
            }
        }, [props.currentId])

        return ( <
            form autoComplete = "off"
            noValidate className = { classes.root }
            onSubmit = { handleSubmit } >
            <
            Grid container >
            <
            Grid item xs = { 6 } >
            <
            TextField name = "fullName"
            variant = "outlined"
            label = "ФИО"
            value = { values.fullName }
            onChange = { handleInputChange } {...(errors.fullName && { error: true, helperText: errors.fullName }) }
            />  <
            FormControl variant = "outlined"
            className = { classes.formControl } {...(errors.importance && { error: true }) } >
            <
            InputLabel ref = { inputLabel } > Важность записей < /InputLabel> <
            Select name = "importance"
            value = { values.importance }
            onChange = { handleInputChange }
            labelWidth = { labelWidth } >
            <
            MenuItem value = "" > Выберите группу < /MenuItem> <
            MenuItem value = "C" > Низкий < /MenuItem> <
            MenuItem value = "B" > Средний < /MenuItem> <
            MenuItem value = "A" > Высокий < /MenuItem>  < /
            Select > {
                errors.importance && < FormHelperText > { errors.importance } < /FormHelperText>} < /
                FormControl > <
                /Grid> <
                Grid item xs = { 6 } >

                <
                TextField
                name = "mobile"
                variant = "outlined"
                label = "Мобильный"
                value = { values.mobile }
                onChange = { handleInputChange } {...(errors.mobile && { error: true, helperText: errors.mobile }) }
                /> <
                TextField
                name = "organization"
                variant = "outlined"
                label = "Организация"
                value = { values.organization }
                onChange = { handleInputChange }
                /> <
                div >
                <
                Button
                variant = "contained"
                color = "primary"
                type = "submit"
                className = { classes.smMargin } >
                Отправить <
                /Button> <
                Button
                variant = "contained"
                className = { classes.smMargin }
                onClick = { resetForm } >
                Сброс <
                /Button> < /
                div > <
                /Grid> < /
                Grid > <
                /form>
            );
        }


        const mapStateToProps = state => ({
            dNoteList: state.dNote.list
        })

        const mapActionToProps = {
            createDNote: actions.create,
            updateDNote: actions.update
        }

        export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DNoteForm));
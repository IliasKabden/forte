import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dNote";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DNoteForm from "./DNoteForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const DNotes = ({ classes, ...props }) => {
        const [currentId, setCurrentId] = useState(0)

        useEffect(() => {
                props.fetchAllDNotes()
            }, []) //componentDidMount

        //toast msg.
        const { addToast } = useToasts()

        const onDelete = uid => {
            if (window.confirm('Are you sure to delete this record?'))
                props.deleteDNote(uid, () => addToast("Deleted successfully", { appearance: 'info' }))
        }
        return ( <
            Paper className = { classes.paper }
            elevation = { 3 } >
            <
            Grid container >
            <
            Grid item xs = { 6 } >
            <
            DNoteForm {...({ currentId, setCurrentId }) }
            /> < /
            Grid > <
            Grid item xs = { 6 } >
            <
            TableContainer >
            <
            Table >
            <
            TableHead className = { classes.root } >
            <
            TableRow >
            <
            TableCell > ФИО < /TableCell> <
            TableCell > Мобильный < /TableCell> <
            TableCell > Важность < /TableCell> <
            TableCell > < /TableCell> < /
            TableRow > <
            /TableHead> <
            TableBody > {
                props.dNoteList.map((record, index) => {
                        return ( < TableRow key = { index }
                            hover >
                            <
                            TableCell > { record.fullName } < /TableCell> <
                            TableCell > { record.mobile } < /TableCell> <
                            TableCell > { record.importance } < /TableCell> <
                            TableCell >
                            <
                            ButtonGroup variant = "text" >
                            <
                            Button > < EditIcon color = "primary"
                            onClick = {
                                () => { setCurrentId(record.uid) }
                            }
                            /></Button >
                            <
                            Button > < DeleteIcon color = "secondary"
                            onClick = {
                                () => onDelete(record.uid)
                            }
                            /></Button >
                            <
                            /ButtonGroup> < /
                            TableCell > <
                            /TableRow>)
                        })
                } <
                /TableBody> < /
                Table > <
                /TableContainer> < /
                Grid > <
                /Grid> < /
                Paper >
            );
        }

        const mapStateToProps = state => ({
            dNoteList: state.dNote.list
        })

        const mapActionToProps = {
            fetchAllDNotes: actions.fetchAll,
            deleteDNote: actions.Delete
        }

        export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DNotes));
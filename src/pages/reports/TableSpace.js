import React, { useState } from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import {
    Card,
    CardContent,
    Typography,
    colors,
    makeStyles,
    CardActions,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Dialog,
    DialogContent,
    TableContainer,
    Paper,
    IconButton,
} from "@material-ui/core"
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { X } from "react-feather"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        margin: 0,
        paddingBottom: 0
    },
    headDark: {
        backgroundColor: colors.blueGrey[900],
        color: "white",
        padding: "10px"
    },
    headTable: {
        backgroundColor: colors.blueGrey[900],
        color: "white",
        textAlign: 'center',
        fontSize: "12px"
    },
    row: {
        textAlign: "center",
        wordWrap: "break-word",
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const TableSpace = ({ db, name, className, ...rest }) => {

    const classes = useStyles();

    const [modal, setModal] = useState(false);

    const abrirCerrarModal = () => {
        setModal(!modal);
    };

    const body = (
        <Dialog open={modal} onClose={abrirCerrarModal}>

            <MuiDialogTitle disableTypography className={classes.root}>
                <Typography variant="h5">TOP TABLESPACE</Typography>
                {modal ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={abrirCerrarModal}>
                        <X />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
            <br />
            <DialogContent>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.headTable}>TABLESPACE</TableCell>
                            <TableCell className={classes.headTable}>USED GB</TableCell>
                            <TableCell className={classes.headTable}>FREE GB</TableCell>
                            <TableCell className={classes.headTable}>TOTAL GB</TableCell>
                            <TableCell className={classes.headTable}>PCT FREE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {typeof db !== "undefined" && typeof db.lstTablespace !== "undefined" ? (
                            db.lstTablespace.map((key) => (
                                <TableRow hover key={key.TABLESPACE}>
                                    <TableCell >{key.TABLESPACE}</TableCell>
                                    <TableCell >{key["USED GB"]}</TableCell>
                                    <TableCell >{key.FREE_GB}</TableCell>
                                    <TableCell >{key.TOTAL_GB}</TableCell>
                                    <TableCell >{key.PCT_FREE}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className={classes.row}>No hay data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </DialogContent>
            <br/>
        </Dialog>
    );

    return (
        <Card className={clsx(classes.root, className)} {...rest}>
            <CardContent>
                <div>
                    <Typography variant="h5" component="h2">
                        TOP TABLESPACE
                    </Typography>
                    <br />
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.headTable}>TABLE SPACE</TableCell>
                                    <TableCell className={classes.headTable}>USED GB</TableCell>
                                    <TableCell className={classes.headTable}>FREE GB</TableCell>
                                    <TableCell className={classes.headTable}>TOTAL GB</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {typeof db !== "undefined" && typeof db.lstTablespace !== "undefined" ? (
                                    db.lstTablespace.slice(0, 8).map((key) => (
                                        <TableRow hover key={key.TABLESPACE}>
                                            <TableCell className={classes.row}>{key.TABLESPACE}</TableCell>
                                            <TableCell className={classes.row}>{key["USED GB"]}</TableCell>
                                            <TableCell className={classes.row}>{key.FREE_GB}</TableCell>
                                            <TableCell className={classes.row}>{key.TOTAL_GB}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className={classes.row}>No hay data</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </CardContent>
            <CardActions>
                <div>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => abrirCerrarModal()}
                    >
                        TABLESPACE
                    </Button>
                    <Dialog open={modal} onClose={abrirCerrarModal}>
                        {body}
                    </Dialog>
                </div>
            </CardActions>
        </Card>
    )
}

TableSpace.propTypes = {
    className: PropTypes.string,
}

export default TableSpace


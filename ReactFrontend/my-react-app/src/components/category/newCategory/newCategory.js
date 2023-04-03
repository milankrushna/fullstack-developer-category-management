import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewCategory(props) {
    //   console.log(props);
    // const title = props.newCategoryState.data.value;
    // let updateOn = "root"
    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };

    //   const handleClose = () => {
    //     setOpen(false);
    //   };
    const inputHandeler = (el)=>{
        console.log(el);
        props.newCategoryState.data.value =  el.target.value
        props.onOpenCatDialog(props.newCategoryState.data.type,{value : el.target.value})
    }
    const whereUpdateApply = (el)=>{
        props.newCategoryState.data.updateOn =  el.target.value
        props.onOpenCatDialog(props.newCategoryState.data.type,props.newCategoryState.data)
    }

    return (
        <div>
            <Dialog open={props.newCategoryState.state} onClose={props.handleClose} >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    {props.newCategoryState.data.type === 'rootCat' &&
                        <div>
                            <div>
                                <input type={'radio'} name={'type'} onChange={whereUpdateApply} value={'root'} id="root1" />
                                <label htmlFor="root1"> Root Category</label>
                                <div />
                                <div>
                                    <input type={'radio'} name={'type'} onChange={whereUpdateApply} value={'child'} id="parent1" />
                                    <label htmlFor="parent1">Child Category</label>
                                </div>
                            </div>
                        </div>
                    }
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="text"
                        fullWidth
                        onChange={inputHandeler}
                        variant="standard"
                        value={props.newCategoryState?.data?.value}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={props.handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
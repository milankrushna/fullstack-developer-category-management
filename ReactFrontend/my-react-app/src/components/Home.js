import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import CategoryList from "./category/categoryView/categoryList";
import NewCategory from "./category/newCategory/newCategory";

export default function Home() {
    const [catOpen, setnewCatOpen] = React.useState({state : false,data:{}});

    const catCloseHandeler = ()=>{
        setnewCatOpen( (ost)=> ({...ost,state:false,data: {}}) )
        }
    const openCatDialog = (type,value='')=>{
        console.log(value);
        let data = {type,...value}
        setnewCatOpen((ost)=> ({...ost,state:true,data }) )
    }
    // const updateCatDialog = (type,catValue)=>{
 
    //     catOpen.data.value = catValue
    //     catOpen.data.type = type
    //     console.log(catOpen);
    //     setnewCatOpen(catOpen)
    // }
    const buttons = [
        <Button key="one">One</Button>,
        <Button key="two">Two</Button>,
        <Button key="three">Three</Button>,
    ];


    return (
        <>
            <div className="col-md-12 row">
                <div className="col-md-6">
                   <CategoryList  onOpenCatDialog={openCatDialog} />
                </div>
                <div className="col-md-6">
                <Button variant="outlined" onClick={()=>{openCatDialog("")}}>
                    Open form dialog
                </Button>
                    <NewCategory 
                        newCategoryState={catOpen} 
                        handleClose={catCloseHandeler}
                        onOpenCatDialog={openCatDialog} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                                m: 1,
                            },
                        }}
                    >
                        <ButtonGroup size="small" color="success" aria-label="small button group">
                            {buttons}
                        </ButtonGroup>
                    </Box>
                </div>
            </div>
        </>
    )

}
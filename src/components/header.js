import React,{useState} from 'react';
import {AppBar, Typography,makeStyles,Toolbar,InputBase,Button,IconButton,Menu,MenuItem, Tooltip,Zoom} from '@material-ui/core';
import {Search,Settings,Favorite} from '@material-ui/icons';
import {useHistory} from 'react-router-dom';
import '../App.css';

function Header(props){
    const styles=useStyles();
    const [openSetting,setOpenSetting]=useState()
    const closeSetting=()=>{
        setOpenSetting(null);
    }
    const history=useHistory();
    
    return(
           <AppBar elevation={1} position="fixed" className={styles.appBar}>
                <Toolbar className={styles.toolbar}>
                    <img src={require('../shared/images/notesLogo.png')} alt=" " width="45" height="45" />
                    <Typography variant="h5" className={styles.headerTitle}>
                        Notes
                    </Typography>
                    <div className={styles.search}>
                        <div className={styles.searchIcon}>
                            <Search style={{marginLeft:5}} />
                            <InputBase placeholder="Search..." 
                            style={{width:'100%',padding:1,marginLeft:2}}
                            autoFocus={true}
                            onChange={(e)=>{props.handleSearch(e.target.value);}}
                        />
                        </div>
                    </div>
                    <Tooltip TransitionComponent={Zoom} title="Your Favorites">
                    <Button className={styles.favoriteButton} startIcon={<Favorite/>} onClick={()=>{history.push('/favorites')}}> 
                        Favorites
                    </Button>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="Settings">
                    <IconButton className={styles.settingButton} onClick={(e)=>{setOpenSetting(e.currentTarget)}}> 
                        <Settings/>
                    </IconButton>
                    </Tooltip>
                    <Menu
                        id="settingMenu"
                        anchorEl={openSetting}
                        open={Boolean(openSetting)}
                        onClose={closeSetting}
                    >
                        <MenuItem onClick={closeSetting} >View Favorites</MenuItem>
                        <MenuItem onClick={closeSetting} >Create Backup</MenuItem>
                        <MenuItem onClick={closeSetting} >Delete All Notes</MenuItem>
                    </Menu>
                </Toolbar>
           </AppBar>
    );
}

const useStyles=makeStyles({
    appBar:{
        backgroundColor:'#f5f5f5c2',
        color:'#000000',
    },
    headerTitle:{
        fontFamily:'Roboto',
        fontWeight:'bold',
        marginLeft:20
    },
    toolbar:{
        margin:1
    },
    search:{
        borderRadius:8,
        backgroundColor:'#c2c2c2',
        justifySelf:'center',
        alignItems:'center',
        justifyContent:'center',
        margin:'auto',
        height:45,
        width:500
    },
    searchIcon:{
        padding:2,
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    settingButton:{
        marginLeft:1,
        color:'#000000'
    },
    favoriteButton:{
        marginLeft:'auto',
        color:'#000000'
    },
})

export default Header
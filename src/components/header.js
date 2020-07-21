import React from 'react';
import {AppBar, Typography,makeStyles,Toolbar,InputBase,IconButton} from '@material-ui/core';
import {Search,Settings} from '@material-ui/icons';
import '../App.css';

function Header(){
    const styles=useStyles();
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
                        />
                        </div>
                    </div>
                    <IconButton className={styles.settingButton}>
                        <Settings/>
                    </IconButton>
                    
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
        marginLeft:'auto',
        color:'#000000'
    }
})

export default Header
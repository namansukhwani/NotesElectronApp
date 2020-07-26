import React,{useState,useEffect} from 'react';
import {Container,Button,makeStyles,Grid, Card,CardContent,CardActions, Typography,IconButton,Slide,Snackbar,CircularProgress,Tooltip,Zoom} from '@material-ui/core';
import {Add,Edit,Favorite,Delete} from '@material-ui/icons';
import {Alert} from '@material-ui/lab';
import {NavLink} from 'react-router-dom';
import '../App.css';
import Header from './header';
import {DOCUMENT} from '../shared/doc';
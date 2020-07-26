import PouchDB from 'pouchdb';
//const PouchDB=require('pouchdb');
const db=new PouchDB('notes');

/*db.allDocs({include_docs:true,attachments:true})
    .then((notes)=>{
        console.log(notes.rows);
    })
    .catch((err)=>{
        console.log(err);
    });*/

//const notes=fetchAllNotes();
//console.log(err);
//console.log(notes);

export default db;
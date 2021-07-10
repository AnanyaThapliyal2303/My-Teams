import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAL29ATa4h3OJQQWbJLqntCVT3vLSdrvf8",
    authDomain: "my-teams-172e9.firebaseapp.com",
    projectId: "my-teams-172e9",
    storageBucket: "my-teams-172e9.appspot.com",
    messagingSenderId: "982796833686",
    appId: "1:982796833686:web:b30abf62088fc3cdbcc3b7",
    measurementId: "G-8EHDX4NXNY"
});

const db = firebaseApp.firestore(); 
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage= firebase.storage();

const collection = "tasks";

export const getTasksRequest = async () => {
    return await db.collection(collection).get().then(res => {
        let tasks = [];

        res.docs.map(task => {
            let data = task.data();

            tasks.push({
                isChecked: data.isChecked,
                description: data.description,
                created: data.created
            })
        })
        return  tasks;
    })
}

export const addTaskRequest = (task) => {
    db.collection("tasks")
        .add(task)
}

{/*export const checkTaskRequest = (isChecked) => {
    return db.collection(collection)
        .doc(id)
        .set({
            isChecked: isChecked
        })
}*/}

export const removeTaskRequest = async (taskId) => {
    return await db.collection(collection)
            .db.collection(collection)
            .doc(taskId)
            .delete()
}



export {auth,provider,storage};
export default db;
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { TodoList } from '../../home/types';

class FirebaseAuth {
    auth = auth();
    firestore = firestore();
    firebase = firebase;
    user: FirebaseAuthTypes.User | null = null;
    constructor() {
        auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
            }
        });
    }

    async signInWithEmailAndPassword(email: string, password: string) {
        try {
            return await auth().signInWithEmailAndPassword(email, password).then(() => {
                return { result: true, user: this.user };
            }).catch(error => {
                if (error.code === 'auth/user-not-found') {
                    return { result: false, user: this.user, error: error.code }
                }
                if (error.code === 'auth/wrong-password') {
                    return { result: false, user: this.user, error: error.code }
                }
                return { result: false, user: this.user, error: error.code }
            });
        } catch (error) {
            console.log({ error })
        }
    }

    async signOut() {
        try {
            await auth().signOut();

        } catch (error) {
            console.log({ error })
        }
    }

    async createCollection() {
        this.firestore.collection('users').doc(this.user?.uid).collection('list').add({});
    }

    getTodoList(callback: any) {
        const ref = this.firestore.collection('users').doc(this.user?.uid).collection('list');
        ref.onSnapshot(callback);
    }

    getList() {
    }

    async createTodoList(todoList: TodoList) {
        const ref = this.firestore.collection('users').doc(this.user?.uid).collection('list');
        await ref.add(todoList)
    }

    async createUserWithEmailAndPassword(email: string, password: string) {
        return await auth().createUserWithEmailAndPassword(email, password).then((result) => {
            this.createCollection();
            return { result: true, user: this.user };
        }).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                return { result: false, user: this.user, error: error.code };
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                return { result: false, user: this.user, error: error.code };
            }
            return { result: false, user: this.user, error: error.code }
        });
    }

    async updateTodoList(todoList: TodoList) {
        const ref = this.firestore.collection('users').doc(this.user?.uid).collection('list').doc(todoList.id);
        return await ref.update(todoList).then((result) => {
            console.log(result)
            return { result: true, user: this.user };
        }
        ).catch(error => {
            return { result: false, user: this.user, error: error.code }
        });
    }

    getUser() {
        return this.user;
    }

}

export default FirebaseAuth;
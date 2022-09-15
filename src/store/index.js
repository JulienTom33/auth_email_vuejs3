import { createStore } from 'vuex'
import router from '@/router'
import { auth } from '../firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'

export default createStore({
  state: {
    user: null
  },
  mutations: {

    SET_USER (state, user) {
      state.user = user
    },

    CLEAR_USER (state) {
      state.user = null
    }

  },
  actions: {

    //fonction pour se connecter
    async login ({ commit }, details) {
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/wrong-password':
            alert("Wrong password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }
      //on envoie les infos de l'utilisateurs dans firebase
      commit('SET_USER', auth.currentUser)
      //on renvoie vers la page d'accueil
      router.push('/')
    },

    //fonction pour s'enregistrer
    async register ({ commit}, details) {
       const { email, password } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            alert("Email already in use")
            break
          case 'auth/invalid-email':
            alert("Invalid email")
            break
          case 'auth/operation-not-allowed':
            alert("Operation not allowed")
            break
          case 'auth/weak-password':
            alert("Weak password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }
      //on envoie les infos de l'utilisateurs dans firebase
      commit('SET_USER', auth.currentUser)
      //on renvoie vers la page d'accueil
      router.push('/')
    },

    // fonction pour déconnecter l'utilisateur
    async logout ({ commit }) {
      await signOut(auth)
      //on efface l'utilisateur dans firebase
      commit('CLEAR_USER')
      //on renvoie vers la page de login
      router.push('/login')
    },

    //on va vérifier si notre utlisateur existe ou non
    fetchUser ({ commit }) {
      //à chaque fois que l'utilisateur change de state (connection déconnection etc)
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    }
    
  }
})
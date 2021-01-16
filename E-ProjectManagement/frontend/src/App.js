import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import Header from './components/layout/Header';
import About from './components/pages/About';
import AllPersonList from './components/AllPersonList';
import AllProjectList from './components/AllProjectList';
import ManagementAPI from './api/ManagementAPI';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import firebaseConfig from './Firebaseconfig';


/**
 * The main bank administration app. It uses Googles firebase to log into the bank end. For routing the
 * user to the respective pages, react-router-dom ist used.
 *
 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
 * @see [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */

class App extends React.Component {


    //Constrcutor welcher Firebase initialisiert
    constructor (props) {
        super(props)


    //Dann wird ein leeres state initalisiert
	    this.state = {
            person: null,
            appError: null,
            authError: null,
            authLoading: false
        };
    }



    static getDerivedStateFromError(error) {   //Status wird aktualisiert
                                               //so dass beim nächsten Rendern die Fallback UI angezeigt wird

		return { appError: error };
	}

    	// Firebase Nutzer logt sich ein und der state wechselt den Zustand
	handleAuthStateChange = person => {
		if (person) {
			this.setState({
				authLoading: true
			});
			//Person ist eingeloggt
			person.getIdToken().then(token => {
				// Add the token to the browser's cookies. The server will then be
				// able to verify the token against the API.
				// SECURITY NOTE: As cookies can easily be modified, only put the
				// token (which is verified server-side) in a cookie; do not add other
				// user information.
				document.cookie = `token=${token};path=/`;

				// setzt den Nutzer auf Not bevor der Token angekommt
				this.setState({
					person: person,
					authError: null,
					authLoading: false
				});



			}).catch(e => {
				this.setState({
					authError: e,
					authLoading: false
				});
			});
		} else {
			// Person hat sich ausgeloggt, also clear token
			document.cookie = 'token=;path=/';

			// setze die ausgeloggte Person auf null
			this.setState({
				person: null,
				authLoading: false
			});
		}
	}

  /**
   * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
	 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
	 */
	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider(); //Erstelle eine Instanz des Google-Provider-Objekts
		firebase.auth().signInWithRedirect(provider);
    }


    /**
	 * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	 * Initializes the firebase SDK.
	 *
	 * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
	 */
	componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	}



	/** Renders the whole app */
    render() {
		const { person, appError, authError, authLoading } = this.state;

		return (
			<ThemeProvider theme={Theme}>
				{/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						<Header user={person} />
						{
							// Is a user signed in?
							person ?
								<>
									<Redirect from='/' to='persons' />
									<Route exact path='/persons'>
										<AllPersonList />
									</Route>

									<Route path='/about' component={About} />
								</>
								:
								// else show the sign in page
								<>
									<Redirect to='/index.html' />
									<SignIn onSignIn={this.handleSignIn} />
								</>
						}
						<LoadingProgress show={authLoading} />
						<ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sighn in process.`} onReload={this.handleSignIn} />
						<ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
					</Container>
				</Router>
			</ThemeProvider>
		);
	}
}
export default App;

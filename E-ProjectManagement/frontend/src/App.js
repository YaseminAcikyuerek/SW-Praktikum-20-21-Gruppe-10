import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
//import ManagementAPI from './api/ManagementAPI';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './Firebaseconfig';
import Theme from './Theme';
import Header from './components/layout/Header';
import HeaderDozent from "./components/layout/HeaderDozent";
import HeaderAdmin from "./components/layout/HeaderAdmin";
import About from './components/pages/About';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import ModuleList from "./components/ModuleList";
import ProjectList from "./components/ProjectList";
import PersonList from "./components/PersonList";
import SemesterList from "./components/SemesterList";
import StudentList from "./components/StudentList";
import ProjectTypeList from './components/ProjectTypeList';
import RatingList from "./components/RatingList";
import ParticipationList from "./components/ParticipationList";
//import ProjectListStudent from "./components/ProjectListStudent";
import Start from "./components/pages/Start";
import HeaderStudent from "./components/layout/HeaderStudent";
import ProjectListStudent from "./components/ProjectListStudent";



/**
 * The main bank administration app. It uses Googles firebase to log into the bank end. For routing the
 * user to the respective pages, react-router-dom ist used.
 *
 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
 * @see [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
 */
class App extends React.Component {

	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			currentUser: null,
			currentUserRole: null,
			appError: null,
			authError: null,
			authLoading: false
		};
	}

	/**
	 * Create an error boundary for this app and recieve all errors from below the component tree.
	 *
	 * @See See Reacts [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
 	 */
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { appError: error };
	}

	/** Handles firebase users logged in state changes  */
	handleAuthStateChange = user => {
		if (user) {
			this.setState({
				authLoading: true
			});
			// The user is signed in
			user.getIdToken().then(token => {
				// Add the token to the browser's cookies. The server will then be
				// able to verify the token against the API.
				// SECURITY NOTE: As cookies can easily be modified, only put the
				// token (which is verified server-side) in a cookie; do not add other
				// user information.
				document.cookie = `token=${token};path=/`;

				// Set the user not before the token arrived
				this.setState({
					currentUser: user,
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
			// User has logged out, so clear the id token
			document.cookie = 'token=;path=/';

			// Set the logged out user to null
			this.setState({
				currentUser: null,
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
		const provider = new firebase.auth.GoogleAuthProvider();
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
		const { currentUser, appError, authError, authLoading } = this.state;

		return (
			<ThemeProvider theme={Theme}>
				{/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='lg'>
						{
							// Is a user signed in?
						        currentUser ?
								<>
									<Redirect from='/' to='start' />
									<Route exact path='/start'>
										<Start />
									</Route>
									<Route path='/admin'>
										<HeaderAdmin/>
									</Route>
									<Route path='/student'>
										<HeaderStudent/>
									</Route>
									<Route path='/dozent'>
										<HeaderDozent/>
									</Route>
									<Route path='/students'>
										<StudentList/>
									</Route>
									<Route path='/projectTypes'>
										<ProjectTypeList/>
									</Route>
									<Route path='/semester'>
										<SemesterList/>
									</Route>
									<Route path='/ratings'>
										<RatingList/>
									</Route>
									<Route path='/participations'>
										<ParticipationList/>
									</Route>
									<Route path='/project'>
										<ProjectListStudent currentUserMail={currentUser.email}/>
									</Route>
									<Route path='/about' component={About} />
									<Route path='/projects'>
										<ProjectList/>
									</Route>
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
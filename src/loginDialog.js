import Dialog from './control/Dialog/Dialog'
import Action from './actions/Action';
import content from './page/login/login.html?raw';
import api from 'mcutils/api/api';
import account from './charte/nav-user';

const loginDialog = new Dialog({
  id: 'login-modal'
})

function onOpen(e) {
  let dialogContent = loginAction.getDialog().getDialog();
  let form = dialogContent.querySelector('form');
  form.addEventListener('submit', login);
}

function login(e) {
  e.preventDefault();

  let form = e.target
  const formData = new FormData(form);
  
  const username = formData.get('username')?.trim();
  const password = formData.get('password')?.trim();
  const rememberMe = formData.get('remember');

  // Helper: update error messages
  function setError(fieldId, message) {
    const fieldGroup = form.querySelector(`#${fieldId}-messages`);
    const input = form.querySelector(`#${fieldId}`);
    fieldGroup.innerHTML = `<p class="fr-error-text">${message}</p>`;
    input?.setAttribute('aria-invalid', 'true');
  }

  function clearError(fieldId) {
    const fieldGroup = form.querySelector(`#${fieldId}-messages`);
    const input = form.querySelector(`#${fieldId}`);
    fieldGroup.innerHTML = '';
    input?.removeAttribute('aria-invalid');
  }

  let hasError = false;

  if (!username) {
    setError('username', 'Veuillez renseigner un identifiant.');
    hasError = true;
  } else {
    clearError('username');
  }

  if (!password) {
    setError('password-input', 'Veuillez renseigner un mot de passe.');
    hasError = true;
  } else {
    clearError('password-input');
  }

  if (hasError) return;

  api.login(username, password, (e) => {
  if (e) {
    account.setMenu('user', {
      label: e.username,
      info: e.email
    });
    api.rememberMe(!!rememberMe)
    loginDialog.close();
  } else {
    setError('login-fieldset', 'Le couple nom utilisateur / mot de passe est incorrect.');
  }
})
}

const loginAction = new Action({
  title: 'Connexion au service',
  content: content,
  footer: [
    {
      label: "Se connecter",
      primary: true,
      close: false,
      form: 'login',
    },
    {
      label: "Annuler",
      primary: false,
      close: true
    }
  ],
  onOpen:onOpen,
});

loginAction.setAction(loginDialog)

export default loginDialog;

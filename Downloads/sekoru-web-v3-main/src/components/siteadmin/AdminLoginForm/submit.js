
// Redux Form
import { SubmissionError } from 'redux-form';

// Language
import messages from '../../../locale/messages';

// Redirection
import history from '../../../core/history';

// Fetch request
import fetch from '../../../core/fetch';

// Redux
import { setRuntimeVariable } from '../../../actions/runtime';
import { loadAccount } from '../../../actions/account';
import { getAdminUser } from '../../../actions/siteadmin/AdminUser/manageAdminUser';
import { getPrivileges } from '../../../actions/siteadmin/AdminRoles/manageAdminRoles';

async function submit(values, dispatch) {

  const query = `query (
    $email: String!,
    $password: String!,
  ) {
      adminUserLogin (
        email: $email,
        password: $password,
      ) {
        status
        isSuperAdmin
        id
      }
    }`;

  const params = {
    email: values.email,
    password: values.password,
  };

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: params
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.adminUserLogin.status == "success") {
    dispatch(setRuntimeVariable({
      name: 'isAdminAuthenticated',
      value: true,
    }));
    dispatch(setRuntimeVariable({
      name: 'isSuperAdmin',
      value: data && data.adminUserLogin && data.adminUserLogin.isSuperAdmin
    }));

    dispatch(getPrivileges());
    dispatch(getAdminUser());
    history.push('/siteadmin');
  } else if (data.adminUserLogin.status == "email") {
    throw new SubmissionError({ _error: messages.emailNotExists });
  } else if (data.adminUserLogin.status == "password") {
    throw new SubmissionError({ _error: messages.passwordWrong });
  } else if (data.adminUserLogin.status == "loggedIn") {
    dispatch(setRuntimeVariable({
      name: 'isAdminAuthenticated',
      value: true,
    }));
    dispatch(setRuntimeVariable({
      name: 'isSuperAdmin',
      value: data && data.adminUserLogin && data.adminUserLogin.isSuperAdmin
    }));
    dispatch(getPrivileges());
    dispatch(getAdminUser());
    throw new SubmissionError({ _error: messages.loggedIn });
  } else if (data.adminUserLogin.status == "userLoggedIn") {
    throw new SubmissionError({ _error: messages.userLoggedIn });
  } else {
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default submit;

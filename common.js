function isUnauthorized(e) {
    return e.status === 403 || e.status === 401;
}

function showUnauthorizedError() {
    alert("Musisz być zalogowany aby mieć dostęp do tej strony.");
    window.location.pathname = "/signIn.html";
}

function handleError(e) {
    if (isUnauthorized(e)) {
        showUnauthorizedError();
    } else {
        console.log(e);
    }
}

function handleErrorWithAlert(e, alertId) {
    if (isUnauthorized(e)) {
        showUnauthorizedError();
    } else {
        $(alertId).show();
        console.log(e);
    }
}

// const ROOT = `${process.env.REACT_APP_APOLLO_URL}`;

// export const handleResponse = (response) => {
//     return response.json()
//         .then(json => {
//             if (!response.ok) return handleError(response, json);
//             return json
//         })
// };

// const handleError = (response, json) => {
//     let error = {
//         status: response.status,
//         statusText: response.statusText,
//         json
//     };
//     return Promise.reject(error)
// };

// export const validateUser = (email, token) => {
//     return fetch(`${ ROOT }/verification/${ email }/${ token }`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response => handleResponse(response))
// };

// export const createUser = (data) => {
//     return fetch(`${ ROOT }/users`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             email: data.email,
//             password: data.password,
//             firstName: data.firstName,
//             lastName: data.lastName,
//             birthday: data.birthday,
//             universityId: data.universityId,
//             majorId: data.majorId,
//             role: data.role
//         })
//     }).then(response => handleResponse(response))
// };

// export const subscribeUser = (email) => {
//     return fetch(`${ ROOT }/subscriptions`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             email: email,
//         })
//     }).then(response => handleResponse(response))
// };

// export const fetchUserData = (id) => {
//     return fetch(`${ ROOT }/users/${ id }`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response => handleResponse(response))
// };

// export const fetchCourses = () => {
//     return fetch(`${ ROOT }/courses`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response => handleResponse(response))
// };

// export const fetchUniversityCourses = (universityId, majorId) => {
//     return fetch(`${ ROOT }/universities/${universityId}/majors/${majorId}/courses`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response => handleResponse(response))
// };

// export const fetchUserCourses = (id) => {
//     return fetch(`${ ROOT }/users/${ id }/courses`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response => handleResponse(response))
// };

// export const postUserCourse = (userId, courseId) => {
//     return fetch(`${ ROOT }/users/${ userId }/courses/${ courseId }`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response => handleResponse(response))
// };

// export const deleteUserCourse = (userId, courseId) => {
//     return fetch(`${ ROOT }/users/${ userId }/courses/${ courseId }`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response => handleResponse(response))
// };

// export const authenticateCredentials = (email, password) => {
//     return fetch(ROOT + '/authenticate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             email: email,
//             password: password
//         })
//     }).then(response => handleResponse(response))
// };

// export const fetchUniversities = () => {
//     return fetch(ROOT + '/universities', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response => handleResponse(response))
// };

// export const fetchUniversityMajors = (universityId) => {
//     return fetch(ROOT + '/universities/' + universityId + '/majors', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response => handleResponse(response))
// };
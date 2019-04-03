import instance from "../axios";



export const register = (data) => {
    return instance.post('/signup', data)
        .then(response => {
            return response;
        });
}

export const verifyOtp = (data) => {
    return instance.post('/verify-otp', data)
        .then(response => {
            return response;
        });
}

export const login = (data) =>{
    return instance.post('/login', data)
        .then(response => {
            return response;
        });
}

export const getLabs = (no_of_labs, offset) =>{
    return instance.get('/get-lab-tests',{params : {limit : no_of_labs, offset : offset}})
        .then(response => {
            return response;
    });
}

export const getLabsDetails = (id) =>{
    return instance.get('/get-lab-tests',{params : {id: id}})
        .then(response => {
            return response;
        });
}

export const insertBookTest = (data) =>{
    return instance.post('/book-test',data)
        .then(response => {
            return response;
        })
}

export const insertRecord = (data)=>{
    return instance.post('/insert-record',data)
        .then(response => {
            return response;
        })
}

export const getMasterRecords = (user_id) =>{
    return instance.get('/get-master-record-for-user',{params : {user_id: user_id}})
        .then(response => {
            return response;
        });
}

export const getMasterRecordById = (id) =>{
    return instance.get('/get-master-record-by-id',{params : {id: id}})
        .then(response => {
            return response;
        });
}

export const insertSubRecord = (data)=>{
    return instance.post('/sub-record',data)
        .then(response => {
            return response;
        })
}

export const getSubRecord = (master_record_id)=>{
    return instance.get('/sub-record',{params : {master_record_id: master_record_id}})
        .then(response => {
            return response;
        })
}

export const getLabTestsForUser = (user_id, id) =>{
    return instance.get('/getLabTestsForUser',{params : {user_id: user_id, id: id}})
        .then(response => {
            return response;
        });
}

export const getAutoComplete = (search_term, city) =>{
    return instance.get('/getAutoComplete',{params : {search_term: search_term, city: city}})
        .then(response => {
            return response;
        });
}

export const searchResults = (search_term, city) => {
    return instance.get('/search', {params: {search_term: search_term, city: city}})
        .then(response => {
            return response;
        });
}


export const getDoctorProfile = (id) =>{
    return instance.get('/doctors',{params : {id: id}})
        .then(response => {
            return response;
        });
}

export const insertFeedback = (data)=>{
    return instance.post('/feedback',data)
        .then(response => {
            return response;
        })
}

export const getDoctorFeedback = (doctor_id) =>{
    return instance.get('/feedback',{params : {doctor_id: doctor_id}})
        .then(response => {
            return response;
        });
}

export const updateProfile =(data) =>{
    return instance.post('/userProfile',data)
        .then(response => {
            return response;
        })
}

export const getUserProfile = (user_id) =>{
    return instance.get('/userProfile',{params : {user_id: user_id}})
        .then(response => {
            return response;
        });
}

export const uploadProfilePicture = (data)=>{
    return instance.post('/upload-picture',data)
        .then(response => {
            return response;
        })
}

export const insertAppointment = (data) =>{
    return instance.post('/insert-appointment',data)
        .then(response => {
            return response;
        })
}

export const getAppointmentForUser = (user_id, id) =>{
    return instance.get('/insert-appointment',{params : {user_id: user_id, id: id}})
        .then(response => {
            return response;
        });
}

export const getUserFeedback = (user_id) =>{
    return instance.get('/user-feedback',{params : {user_id: user_id}})
        .then(response => {
            return response;
        });
}


